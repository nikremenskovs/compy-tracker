/**
 * GET /api/compy-gateway/competencies
 * Retrieves all available competencies
 *
 * @route GET /api/compy-gateway/competencies
 *
 * Request parameters:
 * None required - returns all competencies
 *
 * Responses:
 * @returns {CompetenciesResponse} 200 - Object containing an array of all competencies
 *
 * Notes:
 * - Simulates network delay with withDelay wrapper
 * - Returns static competencies data from competenciesData import
 */

import { http, HttpResponse } from "msw";
import { withDelay } from "@/mocks/resolvers/withDelay.ts";
import type { CompetenciesResponse } from "@/types/api.ts";
import { competencies as competenciesData } from "@/mocks/generators/competencies.ts";

export const competencies = http.get(
  "/api/compy-gateway/competencies",
  withDelay(() => {
    const responseBody: CompetenciesResponse = competenciesData;
    return HttpResponse.json<CompetenciesResponse>(responseBody);
  }),
);
