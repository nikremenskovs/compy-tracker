<script setup lang="ts">
const { getTargetLearner } = useLearnersStore();
const router = useRouter();
const route = useRoute();

const learnerData = computed(() => getTargetLearner(+route.params.learnerId));
</script>

<template>
  <VCard flat tile>
    <VCardTitle class="text-h5 mb-3 d-flex align-center">
      <VBtn
        class="mr-2"
        density="comfortable"
        icon="mdi-arrow-left"
        variant="tonal"
        rounded-full
        @click="router.back()"
      />
      <span>
        {{
          `${learnerData?.name.endsWith("s") ? `${learnerData.name}'` : `${learnerData?.name}'s`} Progress`
        }}
      </span>
    </VCardTitle>
    <VRow>
      <VCol :cols="$vuetify.display.smAndUp ? 6 : 12">
        <DashboardDetailAverages :learnerData />
      </VCol>
      <VCol :cols="$vuetify.display.smAndUp ? 6 : 12">
        <DashboardDetailHighest :learnerData />
      </VCol>
    </VRow>
  </VCard>
</template>
