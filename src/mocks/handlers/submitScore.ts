/**
 * POST /api/compy-gateway/submit-score
 * Submits a new competency assessment score
 *
 * @route POST /api/compy-gateway/submit-score
 *
 * Request body:
 * @param {Assessment} newScore - The assessment object containing score details
 *
 * Responses:
 * @returns {Assessment} 201 - The created assessment with the same data that was submitted
 *
 * Notes:
 * - Simulates network delay with withDelay wrapper
 * - Simply echoes back the submitted assessment without validation
 * - This endpoint mocks the successful creation of a new assessment score
 */

import { withDelay } from "@/mocks/resolvers/withDelay.ts";
import { http, HttpResponse } from "msw";
import type { Assessment } from "@/types/api.ts";

export const submitScore = http.post(
  "/api/compy-gateway/submit-score",
  withDelay(async ({ request }) => {
    const newScore = (await request.json()) as Assessment;

    return HttpResponse.json(newScore, { status: 201 });
  }),
);
