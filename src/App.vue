<script setup lang="ts">
import logo from "./assets/images/logo.png";

const route = useRoute();
const dynamicTitle = computed(() => {
  return `${String(route.name)} | ${appTitle}`;
});
useTitle(dynamicTitle);

useFavicon(logo);
</script>

<template>
  <VApp>
    <TheToast />
    <VMain>
      <component :is="route.meta.layout">
        <routerView />
      </component>
    </VMain>
    <TheFooter />
  </VApp>
</template>

<style scoped>
.v-application {
  font-family: Cabin, sans-serif;
}
</style>
