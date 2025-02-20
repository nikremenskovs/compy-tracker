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
