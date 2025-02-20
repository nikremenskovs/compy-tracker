<template>
  <VFooter
    min-height="80"
    color="compyPrimary"
    class="text-center d-flex flex-column justify-center text-body-2"
  >
    <p class="mb-1" :class="{ 'text-body-1': $vuetify.display.smAndUp }">
      In educational settings tracking competencies like communication or
      problem-solving is crucial to understanding learner development and
      progression.
    </p>

    <small>
      {{ new Date().getFullYear() }} — <strong>{{ appTitle }}</strong>
    </small>
  </VFooter>
</template>

<style scoped>
.v-footer {
  flex: none;
}
</style>
