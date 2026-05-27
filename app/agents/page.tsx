import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AgentsPage() {
  const agents = await prisma.agent.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <h1>Agents</h1>
        <Link href="/agents/new">
          <button>New agent</button>
        </Link>
      </div>
      <p className="muted">The AI teammates and the humans who orchestrate them.</p>

      {agents.length === 0 ? (
        <p className="muted">
          No agents yet. <Link href="/agents/new">Add the first one.</Link>
        </p>
      ) : (
        agents.map((a) => (
          <div className="panel" key={a.id}>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div>
                <strong>{a.name}</strong> <span className="badge">{a.role}</span>
              </div>
              <Link href={`/agents/${a.id}/edit`}>Edit</Link>
            </div>
            {a.specialty && <p style={{ margin: "8px 0 0" }}>{a.specialty}</p>}
            {a.communicationStyle && (
              <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>
                Style: {a.communicationStyle}
              </p>
            )}
            {a.permissions && (
              <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>
                Permissions: {a.permissions}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
