<script setup lang="ts">
const { user } = storeToRefs(useAuthStore());

const { openEmail: contactUs } = useEmail("help", () => ({
  fullName: user.value.name,
}));
</script>

<template>
  <VCardTitle class="text-h5 text-wrap"> Support </VCardTitle>
  <VCardText class="text-subtitle-1">
    If you have any questions or need help when using Compy Tracker, please
    contact us at
  </VCardText>
  <VCardActions>
    <AppCtaButton
      @click="contactUs"
      text="Contact us"
      append-icon="mdi-chat-question-outline"
      color="compyTextWhite"
      class="bg-compyPrimary"
    />
  </VCardActions>
</template>
