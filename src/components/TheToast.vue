<script setup lang="ts">
const { toastText, toastType } = storeToRefs(useToastStore());
</script>

<template>
  <VSnackbar
    :model-value="!!toastText"
    @update:modelValue="toastText = ''"
    timeout="1000"
    location="top"
    variant="text"
  >
    <VCard
      class="pa-3 border"
      :color="toastType === 'success' ? 'compyGreen' : 'compyRed'"
      rounded="xl"
      variant="elevated"
    >
      <VBtn
        @click="toastText = ''"
        icon="mdi-close"
        variant="outlined"
        size="x-small"
        position="absolute"
        class="top-0 right-0 ma-3"
      />
      <VCardTitle>
        {{ `${toastType === "success" ? "Success!" : "Ooops!"}` }}
      </VCardTitle>
      <VCardSubtitle class="text-subtitle-1">{{ toastText }}</VCardSubtitle>
    </VCard>
  </VSnackbar>
</template>
