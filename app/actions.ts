"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isStatus } from "@/lib/status";

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
