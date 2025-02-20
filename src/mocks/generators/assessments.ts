import { faker } from "@faker-js/faker";
import { generateUserId } from "@/mocks/generators/userId.ts";
import type {
  Assessment,
  AssessmentsResponse,
  Competency,
  UserRole,
} from "@/types/api.ts";
import { competencies } from "@/mocks/generators/competencies.ts";

export const generateAssessmentsByRoleAndCompetency = (
  role: UserRole,
  competency: Competency,
  count: number,
): Assessment[] => {
  return Array.from({ length: count }, () => ({
    competencyId: competency.id,
    competencyName: competency.name,
    assessorId: generateUserId(role),
    assessorType: role,
    score: faker.number.int({ min: 1, max: 5 }),
    submittedAt: faker.date
      .between({ from: "2024-10-01", to: "2025-02-17" })
      .toISOString(),
  }));
};

export const generateUserAssessments = (count = 10): AssessmentsResponse => {
  return competencies.flatMap((competency) => [
    ...generateAssessmentsByRoleAndCompetency("learner", competency, count),
    ...generateAssessmentsByRoleAndCompetency("trainer", competency, count),
  ]);
};
