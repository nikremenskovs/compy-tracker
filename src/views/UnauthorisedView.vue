<script setup lang="ts">
import logo from "../assets/images/logo.png";

const { user } = storeToRefs(useAuthStore());

const { openEmail: requestAccess } = useEmail("requestAccess", () => ({
  fullName: user.value.name,
}));
</script>

<template>
  <VEmptyState
    :image="logo"
    title="Unauthorised"
    text="You don't sufficient permissions to view this page. Please request access"
  >
    <template #actions>
      <AppCtaButton
        text="Request Access"
        @click="requestAccess"
        append-icon="mdi-key-outline"
      />
    </template>
  </VEmptyState>
</template>
