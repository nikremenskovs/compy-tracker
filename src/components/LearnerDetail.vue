<script setup lang="ts">
import { Line } from "vue-chartjs";
import type { Assessment, UserRole } from "@/types/api.ts";
import { useTheme } from "vuetify";
import notFound from "@/assets/images/notFound.png";

const { userAssessments, isFetching } = storeToRefs(useUserAssessmentsStore());
const { iconMap } = storeToRefs(useCompetenciesStore());
const { navigateHome } = useAuthStore();
const router = useRouter();
const route = useRoute();
const { current } = useTheme();

const filteredAssessments = computed(() => {
  return userAssessments.value?.reduce(
    (acc: { learner: Assessment[]; trainer: Assessment[] }, assessment) => {
      if (assessment.competencyId === +route.params.competencyId) {
        acc[assessment.assessorType].push(assessment);
      }
      return acc;
    },
    { learner: [], trainer: [] },
  );
});

const isDataEmpty = computed(() => {
  return (
    !filteredAssessments.value?.learner.length &&
    !filteredAssessments.value?.trainer.length
  );
});

const data = computed(() => {
  const getScoresByAssessorType = (assessorType: UserRole) => {
    const scoresByDate: { [key: string]: number } = {};

    filteredAssessments.value?.[assessorType].forEach((assessment) => {
      const date = assessment.submittedAt;
      scoresByDate[date] = Math.max(scoresByDate[date] || 0, assessment.score);
    });

    return scoresByDate;
  };

  const learnerScores = getScoresByAssessorType("learner");
  const trainerScores = getScoresByAssessorType("trainer");

  const allDates = Array.from(
    new Set([...Object.keys(learnerScores), ...Object.keys(trainerScores)]),
  );

  allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const learnerData = allDates.map((date) => learnerScores[date] || 0);
  const trainerData = allDates.map((date) => trainerScores[date] || 0);

  const formattedLabels = allDates.map(
    (date) => useDateFormat(new Date(date), "MMM D, YYYY").value,
  );

  return {
    labels: formattedLabels,
    datasets: [
      {
        label: "Learner Scores",
        data: learnerData,
        backgroundColor: `${current.value.colors.compyLearner}50`,
        borderColor: current.value.colors.compyLearner,
        fill: true,
        tension: 0.2,
      },
      {
        label: "Trainer Scores",
        data: trainerData,
        backgroundColor: `${current.value.colors.compyTrainer}50`,
        borderColor: current.value.colors.compyTrainer,
        fill: true,
        tension: 0.2,
      },
    ],
  };
});

const options = {
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
      },
      title: {
        display: true,
        text: "Score",
      },
    },
  },
};
</script>

<template>
  <VSkeletonLoader v-if="isFetching" type="table" />

  <VEmptyState
    v-else-if="isDataEmpty"
    :image="notFound"
    title="Something went wrong"
    text="We could retrieve these details - please select a different competency"
  >
    <template #actions>
      <AppCtaButton
        text="To Home"
        @click="navigateHome"
        append-icon="mdi-home-import-outline"
      />
    </template>
  </VEmptyState>

  <VCard v-else flat tile>
    <VCardTitle class="d-flex ga-2 align-center text-wrap mb-2">
      <VBtn
        class="mr-2"
        density="comfortable"
        icon="mdi-arrow-left"
        variant="tonal"
        rounded-full
        @click="router.back()"
      />
      <span>
        Your progress for
        {{ filteredAssessments?.learner[0].competencyName }}
      </span>
      <VIcon>
        {{
          iconMap[filteredAssessments?.learner[0].competencyId as number] ||
          "mdi-school"
        }}
      </VIcon>
    </VCardTitle>

    <Line :data :options />
  </VCard>
</template>
