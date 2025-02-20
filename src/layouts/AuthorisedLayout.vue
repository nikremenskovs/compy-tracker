<script setup lang="ts">
const { userFirstName } = storeToRefs(useAuthStore());

const route = useRoute();
</script>

<template>
  <TheNavbar />
  <VCard
    class="d-flex flex-column mx-auto pa-2"
    tile
    flat
    height="100%"
    max-width="1000"
  >
    <div v-if="route.meta.description">
      <VCardTitle class="text-h5 text-wrap">
        {{ `Welcome back ${userFirstName}!` }}
      </VCardTitle>
      <VCardSubtitle class="text-subtitle-2 text-wrap mb-4">
        {{ route.meta.description }}
      </VCardSubtitle>
    </div>
    <slot />
  </VCard>
</template>

<style scoped>
:deep(.v-footer) {
  flex: none;
}
</style>
