/**
 * GET /api/compy-gateway/user-assessments
 * Retrieves a list of assessments for the current user
 *
 * @route GET /api/compy-gateway/user-assessments
 *
 * Request parameters:
 * None required - authenticates based on current session/token
 *
 * Responses:
 * @returns {AssessmentsResponse} 200 - Object containing an array of user assessments
 *
 * Notes:
 * - Simulates network delay with withDelay wrapper
 * - Generates mock assessment data using generateUserAssessments utility
 */

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
