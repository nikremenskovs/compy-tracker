import type { UsersResponse } from "@/types/api.ts";

export const useLearnersStore = defineStore("LearnersStore", () => {
  const {
    data: allLearners,
    error,
    isFinished,
    execute,
  } = useCompyFetch("/all-learners").json<UsersResponse>();

  const getTargetLearner = (targetLearnerId: number) =>
    allLearners.value?.find((learner) => learner.id === targetLearnerId);

  const getTargetLearnerLatest = (targetLearnerId: number) => {
    const learner = getTargetLearner(targetLearnerId);
    if (!learner) return;

    const { latestByCompetency } = useLatestAssessments(learner.assessments);

    return latestByCompetency.value;
  };

  return {
    allLearners,
    error,
    isFinished,
    execute,
    getTargetLearner,
    getTargetLearnerLatest,
  };
});
