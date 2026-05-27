import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { deleteAgent, updateAgent } from "@/app/actions";
import { AgentFields } from "@/app/agents/AgentFields";

export const dynamic = "force-dynamic";

export default async function EditAgentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const agent = await prisma.agent.findUnique({ where: { id } });
  if (!agent) notFound();

  return (
    <div>
      <h1>Edit agent</h1>
      <p className="muted">
        <Link href="/agents">← Back to agents</Link>
      </p>

      <form action={updateAgent} className="panel" style={{ marginTop: 16 }}>
        <input type="hidden" name="agentId" value={agent.id} />
        <AgentFields agent={agent} />
        <button type="submit">Save changes</button>
      </form>

      <form action={deleteAgent} className="panel">
        <input type="hidden" name="agentId" value={agent.id} />
        <strong>Delete agent</strong>
        <p className="muted" style={{ margin: "6px 0 0", fontSize: 13 }}>
          Removes this agent. Their tasks stay but become unassigned.
        </p>
        <button type="submit" className="secondary">
          Delete agent
        </button>
      </form>
    </div>
  );
}
