import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTranslationsForPage } from "@/lib/services/supbase";
import { QUERY_KEYS } from "@/constants";

interface UpdateTranslationsData {
  pageName: string;
  translations: Record<string, any>;
}

export const useUpdateTranslationsForPage = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, UpdateTranslationsData>({
    onMutate: async (data: UpdateTranslationsData) => {
      console.log(data);
      // Perform any actions before mutation here, such as:
      // - Displaying a loading indicator
      // - Invalidating related queries
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.translations],
      });
    },
    onError: (error: Error) => {
      // Handle errors here, such as:
      // - Displaying an error message
      console.error("Error updating translations:", error);
    },
    mutationFn: async (data: UpdateTranslationsData) => {
      return updateTranslationsForPage(data.pageName, data.translations);
    },
  });
};
