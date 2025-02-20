<script setup lang="ts">
import notFound from "../assets/images/notFound.png";

const { navigateHome } = useAuthStore();
</script>

<template>
  <VEmptyState
    :image="notFound"
    title="Not Found"
    text="It looks like the page you're looking for doesn't exist. Please go back to the home page"
  >
    <template #actions>
      <AppCtaButton
        text="To Home"
        @click="navigateHome"
        append-icon="mdi-home-import-outline"
      />
    </template>
  </VEmptyState>
</template>
