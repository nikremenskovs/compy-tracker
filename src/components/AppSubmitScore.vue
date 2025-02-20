<script setup lang="ts">
import type { Assessment, UsersResponse } from "@/types/api.ts";
import type { UseFetchOptions } from "@vueuse/core";

const props = defineProps<{
  competencyId: number;
  competencyName?: string;
  targetLearnerId?: number;
}>();

const { user } = storeToRefs(useAuthStore());
const { userAssessments } = storeToRefs(useUserAssessmentsStore());
const { allLearners } = storeToRefs(useLearnersStore());
const { enableToast } = useToastStore();

const newScore = ref(0);

const showSubmitButton = ref(false);

const newAssessment = computed(() => {
  return {
    competencyId: props.competencyId,
    competencyName: props.competencyName,
    assessorId: user.value.id,
    assessorType: user.value.role,
    score: newScore.value,
    submittedAt: new Date().toISOString(),
  };
});

const { isFetching, execute } = useCompyFetch("/submit-score", {
  immediate: false,
  onFetchError: (ctx) => {
    enableToast("error", "Failed to submit score. Please try again");
  },
  afterFetch: (ctx) => {
    if (!ctx.data) return;
    if (user.value.role === "learner")
      userAssessments.value = [
        ...(userAssessments.value as Assessment[]),
        ctx.data,
      ];

    if (user.value.role === "trainer") {
      const index = allLearners.value?.findIndex(
        (learner) => learner.id === props.targetLearnerId,
      );

      if (index === -1 || index === undefined) return;

      const updatedLearner = {
        ...(allLearners.value as UsersResponse)[index],
        assessments: [
          ...(allLearners.value as UsersResponse)[index].assessments,
          ctx.data,
        ],
      };

      const newAllLearners = [...(allLearners.value as UsersResponse)];
      newAllLearners[index] = updatedLearner;

      allLearners.value = newAllLearners;
    }

    enableToast("success", "Score submitted successfully");

    newScore.value = 0;
    showSubmitButton.value = false;
  },
} as UseFetchOptions)
  .post(newAssessment)
  .json<Assessment>();
</script>

<template>
  <VCardSubtitle class="text-h6">Submit a new score</VCardSubtitle>
  <div class="d-flex w-full align-center">
    <VRating
      v-model="newScore"
      :hover="!isFetching"
      ripple
      @update:modelValue="showSubmitButton = true"
      :disabled="isFetching"
    />
    <VSlideXTransition>
      <VBtn
        v-show="showSubmitButton"
        icon="mdi-floppy"
        size="small"
        @click="execute"
        :loading="isFetching"
      />
    </VSlideXTransition>
  </div>
</template>
