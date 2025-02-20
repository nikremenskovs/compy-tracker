<script setup lang="ts">
const { user } = storeToRefs(useAuthStore());
const { loginUser } = useAuthStore();

const loginForm = ref();
const isLoginButtonLoading = ref(false);

const handleSubmit = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;
  isLoginButtonLoading.value = true;
  await loginUser();
  isLoginButtonLoading.value = false;
};
</script>

<template>
  <VForm
    ref="loginForm"
    class="d-flex flex-column ga-2"
    @submit.prevent="handleSubmit"
  >
    <VTextField
      v-model="user.name"
      label="Enter your full name"
      :rules="[
        ...validationRules.requiredRule,
        ...validationRules.minTwoRule,
        ...validationRules.maxTwentyRule,
        ...validationRules.noSpecialCharactersRule,
        ...validationRules.hasSpaceRule,
      ]"
      autofocus
    />

    <VSelect
      v-model="user.role"
      label="Select your role"
      :items="[
        { title: 'Learner', value: 'learner' },
        { title: 'Trainer', value: 'trainer' },
      ]"
      :rules="validationRules.requiredRule"
    />
    <AppCtaButton
      text="Login"
      append-icon="mdi-login"
      :loading="isLoginButtonLoading"
      type="submit"
    />
  </VForm>
</template>
