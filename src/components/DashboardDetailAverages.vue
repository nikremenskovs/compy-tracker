<script setup lang="ts">
import { Bar } from "vue-chartjs";
import type { User, AssessmentsResponse } from "@/types/api.ts";
import { useTheme } from "vuetify";

const props = defineProps<{
  learnerData: User & { assessments: AssessmentsResponse };
}>();

const { current } = useTheme();

const data = computed(() => {
  const competencyScores: {
    [key: number]: {
      competencyName: string;
      learnerScores: number[];
      trainerScores: number[];
    };
  } = {};

  props.learnerData.assessments.forEach(
    ({ competencyId, competencyName, assessorType, score }) => {
      const competency = (competencyScores[competencyId] ||= {
        competencyName: competencyName as string,
        learnerScores: [],
        trainerScores: [],
      });

      (assessorType === "learner"
        ? competency.learnerScores
        : competency.trainerScores
      ).push(score);
    },
  );

  const labels = Object.values(competencyScores).map(
    (item) => item.competencyName,
  );
  const learnerScores = Object.values(competencyScores).map((item) =>
    unref(useAverage(item.learnerScores)),
  );
  const trainerScores = Object.values(competencyScores).map((item) =>
    unref(useAverage(item.trainerScores)),
  );

  return {
    labels,
    datasets: [
      {
        label: "Learner Score",
        data: learnerScores,
        backgroundColor: current.value.colors.compyLearner,
      },
      {
        label: "Trainer Score",
        data: trainerScores,
        backgroundColor: current.value.colors.compyTrainer,
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
    },
  },
};
</script>

<template>
  <VCardSubtitle class="text-h6">Average per competency</VCardSubtitle>
  <Bar :data :options :height="'280px'" />
</template>
