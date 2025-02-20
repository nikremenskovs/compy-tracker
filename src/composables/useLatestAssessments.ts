import type { Assessment, AssessmentsResponse, UserRole } from "@/types/api.ts";

export const useLatestAssessments = (
  userAssessments: MaybeRefOrGetter<AssessmentsResponse | null> = ref(null),
) => {
  const { competencies } = storeToRefs(useCompetenciesStore());

  const latestByRole = (assessments: Assessment[], assessorType: UserRole) => {
    return assessments
      .filter((assessment) => assessment.assessorType === assessorType)
      .sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
      )[0];
  };

  const latestByCompetency = computed(() =>
    competencies.value?.map(({ id, name }) => {
      const assessmentArray: Assessment[] =
        unref(userAssessments as Assessment[]) ?? [];

      const assessmentsByCompetency = assessmentArray.filter(
        (assessment: Assessment) => assessment.competencyId === id,
      );

      const latestTrainer = latestByRole(assessmentsByCompetency, "trainer");
      const latestLearner = latestByRole(assessmentsByCompetency, "learner");

      return {
        competencyId: id,
        name,
        trainer: latestTrainer
          ? (({ competencyId, ...rest }) => rest)(latestTrainer)
          : null,
        learner: latestLearner
          ? (({ competencyId, ...rest }) => rest)(latestLearner)
          : null,
      };
    }),
  );

  return { latestByCompetency };
};
