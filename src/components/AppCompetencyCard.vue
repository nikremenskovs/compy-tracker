<script setup lang="ts">
import type { Assessment } from "@/types/api.ts";

const props = withDefaults(
  defineProps<{
    competencyId: number;
    name: string;
    description?: string;
    actions?: boolean;
    learner?: Assessment;
    trainer?: Assessment;
  }>(),
  {
    actions: false,
  },
);

const emit = defineEmits<{
  (e: "click:button"): void;
}>();

const { iconMap } = storeToRefs(useCompetenciesStore());

const ratings = computed(() => [props.learner, props.trainer]);
</script>

<template>
  <VCard
    class="pa-2"
    :color="`compy${competencyId}`"
    width="310"
    rounded="shaped"
  >
    <VCardTitle class="text-h5 d-flex ga-2 align-center">
      <span>{{ name }}</span>
      <VIcon>{{ iconMap[competencyId] || "mdi-school" }}</VIcon>
    </VCardTitle>

    <VCardText v-if="description">{{ description }}</VCardText>

    <AppSubmitScore v-if="actions" :competencyId :competencyName="name" />

    <AppLatestScores v-if="learner || trainer" :ratings />

    <VCardActions v-if="actions">
      <AppCtaButton
        text="Learn More.."
        append-icon="mdi-page-next"
        width="100%"
        color="compyTextWhite"
        class="bg-compyPrimary"
        @click="emit('click:button')"
      />
    </VCardActions>
  </VCard>
</template>
