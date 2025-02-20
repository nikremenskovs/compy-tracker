import type { UserRole } from "@/types/api.ts";
import { faker } from "@faker-js/faker";

export const generateUserId = (role: UserRole): number =>
  role === "learner" ? 1 : faker.number.int({ min: 2, max: 10000 });
