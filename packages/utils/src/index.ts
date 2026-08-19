import type { User } from "@repo/types";

export function formatUserName(user: User): string {
  return `${user.name} (${user.email})`;
}

export function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export * from "./calculator";
