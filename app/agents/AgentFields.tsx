import type { Agent } from "@prisma/client";

// Shared labeled inputs for the agent create/edit forms.
export function AgentFields({ agent }: { agent?: Agent }) {
  return (
    <>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        required
        defaultValue={agent?.name ?? ""}
        placeholder="Sam Rivera"
      />

      <label htmlFor="role">Role</label>
      <input
        id="role"
        name="role"
        required
        defaultValue={agent?.role ?? ""}
        placeholder="AI Backend Developer"
      />

      <label htmlFor="specialty">Specialty</label>
      <input
        id="specialty"
        name="specialty"
        defaultValue={agent?.specialty ?? ""}
        placeholder="Next.js, TypeScript, Prisma"
      />

      <label htmlFor="communicationStyle">Communication style</label>
      <input
        id="communicationStyle"
        name="communicationStyle"
        defaultValue={agent?.communicationStyle ?? ""}
        placeholder="Practical, concise, transparent"
      />

      <label htmlFor="permissions">Permissions</label>
      <input
        id="permissions"
        name="permissions"
        defaultValue={agent?.permissions ?? ""}
        placeholder="create_branch, write_code, open_pr"
      />
    </>
  );
}
