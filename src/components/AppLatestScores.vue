<script setup lang="ts">
import type { Assessment } from "@/types/api.ts";
import { unref } from "vue";
import { useTimeAgo, useDateFormat } from "@vueuse/core";

defineProps<{
  ratings: Assessment[];
}>();
</script>

<template>
  <VCardSubtitle class="text-h6">Latest scores</VCardSubtitle>
  <VList class="bg-transparent py-0">
    <VListItem v-for="rating in ratings" :key="rating?.assessorId">
      <VListItemTitle>
        <span class="text-capitalize">
          {{
            `${rating?.assessorType} (${unref(useTimeAgo(rating?.submittedAt as string))})`
          }}
        </span>
        <VIcon
          class="ml-1 mb-4"
          icon="mdi-information-outline"
          size="x-small"
          v-tooltip:top="{
            text: unref(
              useDateFormat(rating?.submittedAt, 'dddd Do of MMM, YYYY'),
            ),
          }"
        />
      </VListItemTitle>

      <VRating :model-value="rating?.score" readonly density="compact" />
    </VListItem>
  </VList>
</template>
