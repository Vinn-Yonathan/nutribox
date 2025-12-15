import { useInfiniteQuery } from "@tanstack/react-query";
import { menuList } from "../lib/api/MenuApi";

export const useMenuInfinite = (filter = {}) => {
  return useInfiniteQuery({
    queryKey: ["menus", filter],
    queryFn: async ({ pageParam }) => {
      const response = await menuList(filter, { page: pageParam, size: 9 });
      const responseBody = await response.json();

      if (response.status !== 200) {
        throw new Error(Object.values(responseBody.errors).flat().join("\n"));
      }

      return responseBody;
    },
    getNextPageParam: (lastPage) => {
      const current = lastPage.meta.current_page;
      const last = lastPage.meta.last_page;
      return current < last ? current + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
