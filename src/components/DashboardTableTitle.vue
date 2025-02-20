<script setup lang="ts">
import type { AssessmentsResponse, User } from "@/types/api.ts";

const { user } = storeToRefs(useAuthStore());

const props = defineProps<{
  item: { raw: User & { assessments: AssessmentsResponse } };
  isExpanded: (item: object) => boolean;
  toggleExpand: (item: object) => void;
}>();

const router = useRouter();

const { openEmail: contactLearner } = useEmail("contactLearner", () => ({
  fullName: user.value.name,
  learnerName: props.item.raw.name,
  learnerEmail: props.item.raw.email,
}));
</script>

<template>
  <VHover>
    <template #default="{ isHovering, props }">
      <VCardTitle
        class="d-flex justify-space-between"
        v-bind="props"
        :class="{
          'bg-compyBackgroundHover':
            (isHovering && $vuetify.display.smAndUp) || isExpanded(item),
        }"
      >
        <div>
          <VAvatar start size="small" color="compyPrimary" variant="tonal">
            <span class="text-subtitle-2">
              {{
                item.raw.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
              }}
            </span>
          </VAvatar>
          <span>{{ item.raw.name }}</span>
        </div>
        <div>
          <VBtn
            @click="contactLearner"
            icon="mdi-email-arrow-right-outline"
            size="x-small"
            variant="text"
            v-tooltip="{ text: `Email ${item.raw.name}` }"
          />
          <VBtn
            @click="
              router.push({
                name: 'Learner Detail',
                params: { learnerId: item.raw.id },
              })
            "
            icon="mdi-chart-line"
            size="x-small"
            variant="text"
            v-tooltip="'Learner Detail'"
          />
          <VBtn
            @click="toggleExpand(item)"
            :icon="
              isExpanded(item) ? 'mdi-arrow-expand-up' : 'mdi-arrow-expand-down'
            "
            size="x-small"
            variant="text"
            v-tooltip="{ text: isExpanded(item) ? 'Collapse' : 'Expand' }"
          />
        </div>
      </VCardTitle>
    </template>
  </VHover>
</template>
