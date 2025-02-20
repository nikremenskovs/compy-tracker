<script setup lang="ts">
import notFound from "@/assets/images/notFound.png";

const { latestByCompetency, error, isFetching } = storeToRefs(
  useUserAssessmentsStore(),
);
const { execute } = useUserAssessmentsStore();

const router = useRouter();
</script>

<template>
  <VEmptyState
    v-if="error"
    :image="notFound"
    title="Something went wrong"
    text="We could retrieve your competency details - please try again"
    class="justify-start"
  >
    <template #actions>
      <AppCtaButton
        text="Try again"
        @click="execute"
        append-icon="mdi-refresh"
      />
    </template>
  </VEmptyState>
  <div v-else class="d-flex flex-wrap ga-4 justify-center">
    <VCard
      v-show="isFetching"
      v-for="n in 5"
      :key="n"
      width="310"
      rounded="shaped"
    >
      <VSkeletonLoader type="heading" width="70%" />
      <VSkeletonLoader type="subtitle" />
      <VSkeletonLoader type="paragraph" height="80" />
      <VSkeletonLoader type="subtitle" />
      <VSkeletonLoader type="paragraph" height="80" />
      <VSkeletonLoader type="button" width="280" />
    </VCard>
    <AppCompetencyCard
      v-for="item in latestByCompetency"
      :key="item.competencyId"
      actions
      :competencyId="item.competencyId"
      :name="item.name"
      :learner="item.learner"
      :trainer="item.trainer"
      @click:button="
        router.push({
          name: 'Competency Detail',
          params: { competencyId: item.competencyId },
        })
      "
    />
  </div>
</template>
