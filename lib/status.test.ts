import { describe, expect, it } from "vitest";
import {
  STATUSES,
  VERDICTS,
  isStatus,
  isVerdict,
  orderStatusCounts,
} from "./status";

describe("status lifecycle", () => {
  it("starts at BACKLOG and ends at DEPLOYED", () => {
    expect(STATUSES[0]).toBe("BACKLOG");
    expect(STATUSES[STATUSES.length - 1]).toBe("DEPLOYED");
    expect(STATUSES).toHaveLength(11);
  });

  it("isStatus accepts known statuses and rejects others", () => {
    expect(isStatus("IN_REVIEW")).toBe(true);
    expect(isStatus("MERGED")).toBe(true);
    expect(isStatus("in_review")).toBe(false);
    expect(isStatus("NOPE")).toBe(false);
    expect(isStatus("")).toBe(false);
  });
});

describe("review verdicts", () => {
  it("has exactly the two verdicts", () => {
    expect(VERDICTS).toEqual(["APPROVED", "CHANGES_REQUESTED"]);
  });

  it("isVerdict accepts known verdicts and rejects others", () => {
    expect(isVerdict("APPROVED")).toBe(true);
    expect(isVerdict("CHANGES_REQUESTED")).toBe(true);
    expect(isVerdict("approved")).toBe(false);
    expect(isVerdict("REJECTED")).toBe(false);
  });
});

describe("orderStatusCounts", () => {
  it("returns all statuses in lifecycle order with zeros by default", () => {
    const result = orderStatusCounts({});
    expect(result).toHaveLength(STATUSES.length);
    expect(result.map((r) => r.status)).toEqual([...STATUSES]);
    expect(result.every((r) => r.count === 0)).toBe(true);
  });

  it("fills counts from the map and leaves others at zero", () => {
    const result = orderStatusCounts({ IN_REVIEW: 3, BACKLOG: 1 });
    const byStatus = Object.fromEntries(result.map((r) => [r.status, r.count]));
    expect(byStatus.BACKLOG).toBe(1);
    expect(byStatus.IN_REVIEW).toBe(3);
    expect(byStatus.MERGED).toBe(0);
  });
});
