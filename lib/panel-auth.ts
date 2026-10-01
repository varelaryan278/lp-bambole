import { timingSafeEqual } from "node:crypto";

export const validPanelKey = (candidate: string | null | undefined) => {
  const expected = process.env.ANALYTICS_ACCESS_KEY || process.env.ANALYTICS_PASSWORD;
  if (!candidate || !expected) return false;
  const left = Buffer.from(candidate);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
};
