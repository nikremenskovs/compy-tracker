<script setup lang="ts">
import loginBackground from "../assets/images/loginBackground.png";
import { useTheme } from "vuetify";
const theme = useTheme();
const gradient = computed(() => {
  return theme.global.current.value.dark
    ? "to top right, rgba(0,0,0,0.8), rgba(0,0,0,0.7), rgba(25,32,72,0.2)"
    : "to top right, rgba(255,255,255,1), rgba(255,255,255,0.875), rgba(25,32,72,0)";
});

onMounted(() => {
  theme.global.name.value = localStorage.getItem("theme") || "light"; // 🔥 Force apply theme
});
</script>
<template>
  <VCard
    class="d-flex flex-column align-center justify-center"
    flat
    tile
    height="100%"
  >
    <template #image>
      <VImg
        cover
        :src="loginBackground"
        :gradient
        alt="Background art resembles patterned wallpaper"
      />
    </template>
    <LoginForm />
  </VCard>
</template>
