/**
 * POST /api/compy-gateway/login
 * Authenticates a user and returns an access token
 *
 * @route POST /api/compy-gateway/login
 *
 * Request body:
 * @param {LoginResponse} loginInfo - User login information containing name and role
 *
 * Responses:
 * @returns {string} 201 - Base64 encoded access token containing user information
 * @returns {Object} 400 - Bad request when login information is missing or invalid
 *
 * Notes:
 * - Generates a consistent user ID based on the role
 * - Creates an email using the format: firstname.lastname@example.com
 * - Simulates network delay with withDelay wrapper
 * - Returns user information encoded as a JWT-like token
 */

import { http, HttpResponse } from "msw";
import type { LoginResponse, User, UserRole } from "@/types/api.ts";
import { generateUserId } from "@/mocks/generators/userId.ts";
import { withDelay } from "@/mocks/resolvers/withDelay.ts";

export const login = http.post(
  "/api/compy-gateway/login",
  withDelay(async ({ request }) => {
    const loginInfo = (await request.json()) as LoginResponse;

    if (!loginInfo) {
      return HttpResponse.json({ status: 400 });
    }

    const user: User = {
      id: generateUserId(loginInfo.role as UserRole),
      name: loginInfo.name,
      role: loginInfo.role,
      email: `${loginInfo.name.replace(/\s+/g, ".")}@example.com`,
    };

    const access_token = btoa(JSON.stringify(user));

    return HttpResponse.json(access_token, { status: 201 });
  }),
);
