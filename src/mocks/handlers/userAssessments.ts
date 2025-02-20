import { http, HttpResponse } from "msw";
import { withDelay } from "@/mocks/resolvers/withDelay.ts";
import { generateUserAssessments } from "@/mocks/generators/assessments.ts";
import type { AssessmentsResponse } from "@/types/api.ts";

export const userAssessments = http.get(
  "/api/compy-gateway/user-assessments",
  withDelay(() => {
    const responseBody: AssessmentsResponse = generateUserAssessments(7);
    return HttpResponse.json<AssessmentsResponse>(responseBody);
  }),
);
