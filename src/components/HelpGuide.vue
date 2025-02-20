<script setup lang="ts">
import notFound from "@/assets/images/notFound.png";

const { competencies, error, isFetching } = storeToRefs(useCompetenciesStore());
const { execute } = useCompetenciesStore();
</script>

<template>
  <VCardTitle class="text-h5 text-wrap"> Competency Guide </VCardTitle>
  <VEmptyState
    v-if="error"
    :image="notFound"
    title="Something went wrong"
    text="We could retrieve competency guide details - please try again"
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

  <div v-else class="d-flex flex-wrap ga-4 justify-center mb-4">
    <VCard
      v-show="isFetching"
      v-for="n in 5"
      :key="n"
      width="310"
      rounded="shaped"
    >
      <VSkeletonLoader type="heading" width="70%" />
      <VSkeletonLoader type="paragraph" height="200" />
    </VCard>
    <AppCompetencyCard
      v-for="competency in competencies"
      :key="competency.id"
      :competencyId="competency.id"
      :name="competency.name"
      :description="competency.description"
    />
  </div>
</template>
