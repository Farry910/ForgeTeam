import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AgentsPage() {
  const agents = await prisma.agent.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <h1>Agents</h1>
      <p className="muted">The AI teammates and the humans who orchestrate them.</p>

      {agents.length === 0 ? (
        <p className="muted">No agents yet. Run `npm run db:seed`.</p>
      ) : (
        agents.map((a) => (
          <div className="panel" key={a.id}>
            <strong>{a.name}</strong> <span className="badge">{a.role}</span>
            {a.specialty && (
              <p style={{ margin: "8px 0 0" }}>{a.specialty}</p>
            )}
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
