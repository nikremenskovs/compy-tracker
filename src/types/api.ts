/** Possible user roles */
export type UserRole = "learner" | "trainer";

/** User type */
export interface User {
  id: number;
  name: string;
  email: string;
  role?: UserRole;
}

/** Competency type */
export interface Competency {
  id: number;
  name: string;
  description?: string;
}

/** Assessment type */
export interface Assessment {
  competencyId: number;
  competencyName?: string;
  assessorId: number;
  assessorType: UserRole;
  score: number;
  submittedAt: string;
}

/** API Response Types */
export type LoginResponse = Pick<User, "name" | "role">;
export type CompetenciesResponse = Competency[];
export type AssessmentsResponse = Assessment[];
export type UsersResponse = Array<User & { assessments: AssessmentsResponse }>;
