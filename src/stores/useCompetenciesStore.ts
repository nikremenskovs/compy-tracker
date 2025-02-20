import type { CompetenciesResponse } from "@/types/api.ts";

export const useCompetenciesStore = defineStore("CompetencyStore", () => {
  const {
    data: competencies,
    error,
    isFetching,
    execute,
  } = useCompyFetch("/competencies").json<CompetenciesResponse>();

  const iconMap = ref<Record<number, string>>({
    42: "mdi-comment",
    43: "mdi-lightbulb",
    44: "mdi-account-group",
    45: "mdi-clock",
    46: "mdi-account-tie",
  });

  return { competencies, error, isFetching, iconMap, execute };
});
