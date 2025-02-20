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
