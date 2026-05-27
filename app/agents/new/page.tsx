import Link from "next/link";
import { createAgent } from "@/app/actions";
import { AgentFields } from "@/app/agents/AgentFields";

export const dynamic = "force-dynamic";

export default function NewAgentPage() {
  return (
    <div>
      <h1>New agent</h1>
      <p className="muted">
        <Link href="/agents">← Back to agents</Link>
      </p>

      <form action={createAgent} className="panel" style={{ marginTop: 16 }}>
        <AgentFields />
        <button type="submit">Create agent</button>
      </form>
    </div>
  );
}
