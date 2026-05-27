"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isStatus, isVerdict, type Verdict } from "@/lib/status";

// A QA verdict maps directly onto a task lifecycle status.
const VERDICT_STATUS: Record<Verdict, string> = {
  APPROVED: "APPROVED",
  CHANGES_REQUESTED: "CHANGES_REQUESTED",
};

export async function createTask(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const description = String(formData.get("description") ?? "").trim();
  const assignedAgentId = String(formData.get("assignedAgentId") ?? "");
  const githubIssueUrl = String(formData.get("githubIssueUrl") ?? "").trim();

  const task = await prisma.task.create({
    data: {
      title,
      description: description || null,
      assignedAgentId: assignedAgentId || null,
      githubIssueUrl: githubIssueUrl || null,
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/");
  redirect(`/tasks/${task.id}`);
}

export async function updateTask(formData: FormData) {
  const id = String(formData.get("taskId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  if (!id || !title) return;

  const description = String(formData.get("description") ?? "").trim();
  const assignedAgentId = String(formData.get("assignedAgentId") ?? "");
  const githubIssueUrl = String(formData.get("githubIssueUrl") ?? "").trim();

  await prisma.task.update({
    where: { id },
    data: {
      title,
      description: description || null,
      assignedAgentId: assignedAgentId || null,
      githubIssueUrl: githubIssueUrl || null,
    },
  });

  revalidatePath(`/tasks/${id}`);
  revalidatePath("/tasks");
  revalidatePath("/");
  redirect(`/tasks/${id}`);
}

export async function deleteTask(formData: FormData) {
  const id = String(formData.get("taskId") ?? "");
  if (!id) return;

  // WorkLog and Review cascade on delete (see prisma migration).
  await prisma.task.delete({ where: { id } });

  revalidatePath("/tasks");
  revalidatePath("/");
  redirect("/tasks");
}

export async function updateTaskStatus(formData: FormData) {
  const taskId = String(formData.get("taskId") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!taskId || !isStatus(status)) return;

  await prisma.task.update({ where: { id: taskId }, data: { status } });
  await prisma.workLog.create({
    data: {
      taskId,
      authorType: "SYSTEM",
      authorName: "ForgeTeam",
      message: `Status changed to ${status}.`,
    },
  });

  revalidatePath(`/tasks/${taskId}`);
  revalidatePath("/");
}

export async function addWorkLog(formData: FormData) {
  const taskId = String(formData.get("taskId") ?? "");
  const message = String(formData.get("message") ?? "").trim();
  if (!taskId || !message) return;

  const authorName = String(formData.get("authorName") ?? "").trim() || "Unknown";
  const authorType = String(formData.get("authorType") ?? "HUMAN");

  await prisma.workLog.create({
    data: { taskId, authorName, authorType, message },
  });

  revalidatePath(`/tasks/${taskId}`);
}

export async function addReview(formData: FormData) {
  const taskId = String(formData.get("taskId") ?? "");
  const verdict = String(formData.get("verdict") ?? "");
  if (!taskId || !isVerdict(verdict)) return;

  const reviewerName = String(formData.get("reviewerName") ?? "").trim() || "Jordan";
  const comments = String(formData.get("comments") ?? "").trim();

  await prisma.review.create({
    data: { taskId, reviewerName, verdict, comments: comments || null },
  });

  // A review both updates the task status and lands on the work log.
  await prisma.task.update({
    where: { id: taskId },
    data: { status: VERDICT_STATUS[verdict] },
  });
  await prisma.workLog.create({
    data: {
      taskId,
      authorType: "AI",
      authorName: reviewerName,
      message: `Review: ${verdict}${comments ? ` — ${comments}` : ""}`,
    },
  });

  revalidatePath(`/tasks/${taskId}`);
  revalidatePath("/");
}

// --- Agents ---

function agentDataFrom(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const specialty = String(formData.get("specialty") ?? "").trim();
  const communicationStyle = String(formData.get("communicationStyle") ?? "").trim();
  const permissions = String(formData.get("permissions") ?? "").trim();
  return {
    name,
    role,
    specialty: specialty || null,
    communicationStyle: communicationStyle || null,
    permissions: permissions || null,
  };
}

export async function createAgent(formData: FormData) {
  const data = agentDataFrom(formData);
  if (!data.name || !data.role) return;

  await prisma.agent.create({ data });

  revalidatePath("/agents");
  revalidatePath("/");
  redirect("/agents");
}

export async function updateAgent(formData: FormData) {
  const id = String(formData.get("agentId") ?? "");
  const data = agentDataFrom(formData);
  if (!id || !data.name || !data.role) return;

  await prisma.agent.update({ where: { id }, data });

  revalidatePath("/agents");
  revalidatePath("/");
  redirect("/agents");
}

export async function deleteAgent(formData: FormData) {
  const id = String(formData.get("agentId") ?? "");
  if (!id) return;

  // Assigned tasks are unassigned via FK ON DELETE SET NULL.
  await prisma.agent.delete({ where: { id } });

  revalidatePath("/agents");
  revalidatePath("/tasks");
  revalidatePath("/");
  redirect("/agents");
}

export async function updatePrLink(formData: FormData) {
  const taskId = String(formData.get("taskId") ?? "");
  if (!taskId) return;

  const githubPrUrl = String(formData.get("githubPrUrl") ?? "").trim();
  await prisma.task.update({
    where: { id: taskId },
    data: { githubPrUrl: githubPrUrl || null },
  });

  revalidatePath(`/tasks/${taskId}`);
}
