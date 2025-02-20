<script setup lang="ts">
import type { AssessmentsResponse, User } from "@/types/api.ts";

const props = defineProps<{
  item: { raw: User & { assessments: AssessmentsResponse } };
  isExpanded: (item: object) => boolean;
}>();

const { getTargetLearnerLatest } = useLearnersStore();
const { iconMap } = storeToRefs(useCompetenciesStore());

const targetLearner = computed(() => getTargetLearnerLatest(props.item.raw.id));
</script>

<template>
  <VExpandTransition>
    <div v-if="isExpanded(item)">
      <VDivider class="mb-2" />
      <VRow
        v-for="competency in targetLearner"
        :key="competency.competencyId"
        class="pa-2 border-b"
        no-gutters
      >
        <VCol
          :cols="$vuetify.display.smAndUp ? 3 : 12"
          :class="{
            'd-flex justify-center align-center': $vuetify.display.smAndUp,
          }"
        >
          <span class="text-h6">
            {{ competency.name }}
          </span>
          <VIcon end>{{
            iconMap[competency.competencyId] || "mdi-school"
          }}</VIcon>
        </VCol>
        <VCol :cols="$vuetify.display.smAndUp ? 4 : 12">
          <AppLatestScores
            :ratings="[competency.learner, competency.trainer]"
          />
        </VCol>
        <VCol :cols="$vuetify.display.smAndUp ? 5 : 12">
          <AppSubmitScore
            :competencyId="competency.competencyId"
            :competencyName="competency.name"
            :targetLearnerId="item.raw.id"
          />
        </VCol>
      </VRow>
    </div>
  </VExpandTransition>
</template>
