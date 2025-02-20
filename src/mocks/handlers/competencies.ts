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
