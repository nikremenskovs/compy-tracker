import type { AssessmentsResponse } from "@/types/api.ts";

export const useUserAssessmentsStore = defineStore(
  "UserAssessmentsStore",
  () => {
    const {
      data: userAssessments,
      error,
      isFetching,
      execute,
    } = useCompyFetch("/user-assessments").json<AssessmentsResponse>();

    const { latestByCompetency } = useLatestAssessments(userAssessments);

    return {
      userAssessments,
      latestByCompetency,
      error,
      isFetching,
      execute,
    };
  },
);
