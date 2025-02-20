<script setup lang="ts">
import { Radar } from "vue-chartjs";
import type { User, UserRole, AssessmentsResponse } from "@/types/api.ts";
import { useTheme } from "vuetify";

const props = defineProps<{
  learnerData: User & { assessments: AssessmentsResponse };
}>();

const { current } = useTheme();

const data = computed(() => {
  const scoresByCompetency: {
    [key: number]: { learner: number; trainer: number };
  } = {};

  props.learnerData.assessments.forEach(
    ({ competencyId, assessorType, score }) => {
      const competency = (scoresByCompetency[competencyId] ||= {
        learner: 0,
        trainer: 0,
      });

      competency[assessorType] = unref(useMax(competency[assessorType], score));
    },
  );

  const uniqueCompetencies = Array.from(
    new Set(
      props.learnerData.assessments.map(
        (assessment) => assessment.competencyName,
      ),
    ),
  );

  const getScores = (role: UserRole) =>
    uniqueCompetencies.map((competencyName) => {
      const competencyId = props.learnerData.assessments.find(
        (assessment) => assessment.competencyName === competencyName,
      )?.competencyId;

      return competencyId ? scoresByCompetency[competencyId]?.[role] || 0 : 0;
    });

  return {
    labels: uniqueCompetencies,
    datasets: [
      {
        label: "Learner Highest",
        data: getScores("learner"),
        backgroundColor: `${current.value.colors.compyLearner}50`,
        borderColor: current.value.colors.compyLearner,
        borderWidth: 1,
      },
      {
        label: "Trainer Highest",
        data: getScores("trainer"),
        backgroundColor: `${current.value.colors.compyTrainer}50`,
        borderColor: current.value.colors.compyTrainer,
        borderWidth: 1,
      },
      {
        label: "Target",
        data: new Array(uniqueCompetencies.length).fill(5),
        backgroundColor: `${current.value.colors.compyGrey}50`,
        borderColor: current.value.colors.compyPrimary,
        borderWidth: 1,
        borderDash: [5, 10],
      },
    ],
  };
});

const options = {
  responsive: true,
  scales: {
    r: {
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
  <VCardSubtitle class="text-h6">Highest to date</VCardSubtitle>
  <Radar :data :options />
</template>
