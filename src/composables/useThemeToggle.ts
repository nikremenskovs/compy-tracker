import { useTheme } from "vuetify";

export const useThemeToggle = () => {
  const { global } = useTheme();

  const isDark = ref(localStorage.getItem("theme") === "dark");

  global.name.value = isDark.value ? "dark" : "light";

  watch(
    isDark,
    (newValue) => {
      const themeName = newValue ? "dark" : "light";
      global.name.value = themeName;
      localStorage.setItem("theme", themeName);
    },
    { immediate: false },
  );

  const toggleTheme = () => (isDark.value = !isDark.value);

  const themeIcon = computed(() =>
    isDark.value ? "mdi-weather-night" : "mdi-weather-sunny",
  );

  return {
    isDark,
    toggleTheme,
    themeIcon,
  };
};
