import { http, HttpResponse } from "msw";
import { withDelay } from "@/mocks/resolvers/withDelay.ts";
import { generateUserAssessments } from "@/mocks/generators/assessments.ts";
import { faker } from "@faker-js/faker";
import type { UsersResponse } from "@/types/api.ts";

export const allLearners = http.get(
  "api/compy-gateway/all-learners",
  withDelay(() => {
    const responseBody = Array.from({ length: 30 }, () => ({
      id: faker.number.int({ min: 2, max: 10000 }),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email({
        firstName: faker.word.words(),
        provider: "edukate.ai",
      }),
      assessments: generateUserAssessments(7),
    }));

    return HttpResponse.json<UsersResponse>(responseBody);
  }),
);
