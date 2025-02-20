import { login } from "@/mocks/handlers/login";
import { competencies } from "@/mocks/handlers/competencies";
import { userAssessments } from "@/mocks/handlers/userAssessments";
import { submitScore } from "@/mocks/handlers/submitScore";
import { allLearners } from "@/mocks/handlers/allLearners";

export const handlers = [
  login,
  competencies,
  userAssessments,
  submitScore,
  allLearners,
];
