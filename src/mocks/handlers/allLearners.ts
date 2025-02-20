/**
 * GET api/compy-gateway/all-learners
 * Retrieves a list of all learner users with their assessment data
 *
 * @route GET api/compy-gateway/all-learners
 *
 * Request parameters:
 * None required - returns all learners
 *
 * Responses:
 * @returns {UsersResponse} 200 - Array of user objects with assessment data
 *
 * Notes:
 * - Simulates network delay with withDelay wrapper
 * - Generates random learner profiles using faker library
 * - Each learner includes:
 *   - Random ID between 2-10000
 *   - Generated name (first and last)
 *   - Email with edukate.ai domain
 * - No pagination, filtering or sorting implemented
 */

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
