<script setup lang="ts">
import logo from "../assets/images/logo.png";
import { navigationMap } from "@/router/routeMaps.ts";

const { navigateHome, logoutUser } = useAuthStore();
const { toggleTheme, themeIcon } = useThemeToggle();

const showDrawer = ref(false);

const navigationActions = ref([
  {
    name: "Toggle Mode",
    icon: themeIcon,
    action: toggleTheme,
  },
  {
    name: "Logout",
    icon: "mdi-logout",
    action: logoutUser,
  },
]);
</script>

<template>
  <VAppBar
    class="pl-4"
    color="compyPrimary"
    scroll-behavior="elevate hide"
    scroll-threshold="500"
  >
    <VToolbarTitle class="ma-0">
      <div class="app-logo" @click="navigateHome">
        <VImg
          class="mr-2"
          :src="logo"
          alt="App logo picturing a competency cycle"
          aspect-ratio="1"
          width="42"
        />
        <span> {{ appTitle }} </span>
      </div>
    </VToolbarTitle>

    <VTabs
      bg-color="compyPrimary"
      v-if="$vuetify.display.smAndUp"
      :mandatory="false"
    >
      <VTab
        v-for="item in navigationMap"
        :key="item"
        :to="{ name: item }"
        class="px-3"
      >
        {{ item }}
      </VTab>
      <VBtn
        v-for="item in navigationActions"
        :key="item.name"
        icon
        @click="item.action"
      >
        <VIcon :icon="item.icon" v-tooltip:bottom="{ text: item.name }" />
      </VBtn>
    </VTabs>
    <VAppBarNavIcon
      v-else
      class="mr-2"
      @click.stop="showDrawer = !showDrawer"
    />
  </VAppBar>

  <VNavigationDrawer
    v-model="showDrawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <VList color="compyPrimary" class="d-flex flex-column">
      <VListItem v-for="item in navigationMap" :key="item" :to="{ name: item }">
        {{ item }}
      </VListItem>

      <VDivider class="my-2" />

      <VListItem
        v-for="item in navigationActions"
        :key="item.name"
        @click="item.action"
        :append-icon="item.icon"
      >
        {{ item.name }}
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<style scoped>
.app-logo {
  display: contents;
  cursor: pointer;
}

:deep(.v-toolbar__content) {
  justify-content: space-between;
}

:deep(.v-toolbar-title__placeholder) {
  display: flex;
  align-items: center;
}

:deep(.v-responsive) {
  flex: none;
}

:deep(.v-slide-group__content) {
  align-items: center;
}
</style>
