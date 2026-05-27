import { describe, expect, it } from "vitest";
import { taskFilterWhere } from "./tasks";

describe("taskFilterWhere", () => {
  it("returns an empty filter with no args", () => {
    expect(taskFilterWhere()).toEqual({});
    expect(taskFilterWhere("", "")).toEqual({});
  });

  it("filters by a specific assignee", () => {
    expect(taskFilterWhere("agent_123")).toEqual({ assignedAgentId: "agent_123" });
  });

  it("maps 'unassigned' to a null assignee", () => {
    expect(taskFilterWhere("unassigned")).toEqual({ assignedAgentId: null });
  });

  it("filters by a title query", () => {
    expect(taskFilterWhere(undefined, "model")).toEqual({
      title: { contains: "model" },
    });
  });

  it("combines assignee and query", () => {
    expect(taskFilterWhere("agent_123", "model")).toEqual({
      assignedAgentId: "agent_123",
      title: { contains: "model" },
    });
  });
});
