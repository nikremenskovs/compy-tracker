import AppLatestScores from "@/components/AppLatestScores.vue";
import type { Assessment } from "@/types/api.ts";
import { describe, it, expect, beforeEach } from "vitest";
import { customRender } from "@/components/__tests__/customRender.ts";
import { useTimeAgo, useDateFormat } from "@vueuse/core";
import { unref } from "vue";
import { fireEvent, waitFor } from "@testing-library/vue";

describe("AppLatestScores", async () => {
  const ratings: Assessment[] = [
    {
      competencyId: 42,
      assessorId: 1,
      assessorType: "learner",
      score: 4,
      submittedAt: "2024-01-26T00:00:00Z",
    },
    {
      competencyId: 42,
      assessorId: 2,
      assessorType: "trainer",
      score: 2,
      submittedAt: "2025-01-26T00:00:00Z",
    },
  ];
  let wrapper: ReturnType<typeof customRender>;
  beforeEach(() => {
    wrapper = customRender(AppLatestScores, {
      props: { ratings },
    });
  });

  it("renders component", async () => {
    expect(wrapper.getByText("Latest scores")).toBeTruthy();
  });

  it("renders rating list items correctly and with expected values", async () => {
    const listItems = wrapper
      .getByRole("listbox")
      .querySelectorAll(".v-list-item");

    expect(listItems.length).toBe(ratings.length);

    for (const [index, listItem] of listItems.entries()) {
      const titleText = listItem.querySelector(
        ".v-list-item-title span",
      )?.innerHTML;
      expect(titleText).toBe(
        `${ratings[index].assessorType} (${unref(useTimeAgo(ratings[index].submittedAt))})`,
      );

      const icon = listItem.querySelector(".v-icon");
      expect(icon).toBeTruthy();

      await fireEvent.mouseOver(icon as Element);

      await waitFor(() => {
        expect(
          wrapper.getByText(
            unref(
              useDateFormat(ratings[index].submittedAt, "dddd Do of MMM, YYYY"),
            ),
          ),
        ).toBeTruthy();
      });

      const ratingComponent = listItem.querySelector(".v-rating");
      expect(ratingComponent).toBeTruthy();
    }
  });

  it("snapshot matches", async () => {
    expect(wrapper).toMatchSnapshot();
  });
});
