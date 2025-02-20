<script setup lang="ts">
import notFound from "@/assets/images/notFound.png";
import type { UsersResponse } from "@/types/api.ts";

const { allLearners, error, isFinished } = storeToRefs(useLearnersStore());
const { execute } = useLearnersStore();

const search = ref("");

const itemsPerPage = 6;
</script>

<template>
  <VDataIterator
    v-if="isFinished && !error"
    :items="allLearners as UsersResponse"
    item-value="id"
    :itemsPerPage
    :search
    class="flex-grow-1 d-flex flex-column"
  >
    <template #header>
      <VToolbar class="px-2" color="transparent">
        <VTextField
          v-model="search"
          density="comfortable"
          placeholder="Search"
          prepend-inner-icon="mdi-magnify"
          style="max-width: 300px"
          variant="solo"
          clearable
          hide-details
        />
      </VToolbar>
    </template>
    <template #default="{ items, isExpanded, toggleExpand }">
      <VCard
        v-for="item in items"
        :key="item.raw.id"
        cols="12"
        class="mb-1"
        color="compyBackground"
        flat
      >
        <DashboardTableTitle :item :isExpanded :toggleExpand />
        <DashboardTableContent :item :isExpanded />
      </VCard>
    </template>
    <template #no-data>
      <VEmptyState
        icon="mdi-magnify"
        text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for"
        title="We couldn't find a match"
      />
    </template>
    <template #footer="{ page, pageCount, prevPage, nextPage }">
      <div class="d-flex align-center justify-center pa-4 align-self-end">
        <VBtn
          :disabled="page === 1"
          density="comfortable"
          icon="mdi-arrow-left"
          variant="tonal"
          rounded-full
          @click="prevPage"
        />

        <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>

        <VBtn
          :disabled="page >= pageCount"
          density="comfortable"
          icon="mdi-arrow-right"
          variant="tonal"
          rounded-full
          @click="nextPage"
        />
      </div>
    </template>
  </VDataIterator>
  <VEmptyState
    v-else-if="error"
    :image="notFound"
    title="Something went wrong"
    text="We could retrieve your learners information - please try again"
    class="justify-start"
  >
    <template #actions>
      <AppCtaButton
        text="Try again"
        @click="execute"
        append-icon="mdi-refresh"
      />
    </template>
  </VEmptyState>
  <div v-else class="d-flex flex-column">
    <VSkeletonLoader width="300" height="50" />
    <VSkeletonLoader
      v-for="n in itemsPerPage"
      :key="n"
      class="mb-2"
      type="list-item-avatar"
      height="50"
    />
    <VSkeletonLoader width="180" height="50" class="align-self-end" />
  </div>
</template>
