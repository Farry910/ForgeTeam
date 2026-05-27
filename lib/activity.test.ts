import { describe, expect, it } from "vitest";
import { mergeActivity } from "./activity";

const log = (id: string, createdAt: Date, over = {}) => ({
  id,
  createdAt,
  taskId: "t1",
  authorName: "Sam Rivera",
  authorType: "AI",
  message: "did a thing",
  task: { title: "Task One" },
  ...over,
});

const review = (id: string, createdAt: Date, over = {}) => ({
  id,
  createdAt,
  taskId: "t2",
  reviewerName: "Jordan",
  verdict: "APPROVED",
  comments: "looks good" as string | null,
  task: { title: "Task Two" },
  ...over,
});

describe("mergeActivity", () => {
  it("returns an empty list for no input", () => {
    expect(mergeActivity([], [])).toEqual([]);
  });

  it("orders logs and reviews together, newest first", () => {
    const items = mergeActivity(
      [log("a", new Date("2026-01-01")), log("c", new Date("2026-01-03"))],
      [review("b", new Date("2026-01-02"))],
    );
    expect(items.map((i) => i.id)).toEqual(["c", "b", "a"]);
    expect(items.map((i) => i.kind)).toEqual(["log", "review", "log"]);
  });

  it("maps log and review fields onto the shared shape", () => {
    const [r] = mergeActivity([], [review("b", new Date("2026-01-02"))]);
    expect(r).toMatchObject({
      kind: "review",
      taskTitle: "Task Two",
      author: "Jordan",
      badge: "APPROVED",
      text: "looks good",
    });
  });

  it("falls back to a placeholder when a review has no comments", () => {
    const [r] = mergeActivity([], [review("b", new Date("2026-01-02"), { comments: null })]);
    expect(r.text).toBe("(no comments)");
  });

  it("respects the limit", () => {
    const logs = Array.from({ length: 5 }, (_, i) =>
      log(String(i), new Date(2026, 0, i + 1)),
    );
    expect(mergeActivity(logs, [], 3)).toHaveLength(3);
  });
});
