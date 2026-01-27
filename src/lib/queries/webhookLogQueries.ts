import { MutationOptions, useMutation } from "@tanstack/react-query";
import { deleteWebhookLogsApi } from "../api/webhookApis";

export function useDeleteWebhookLogsMutation(options?: MutationOptions<unknown, unknown, string>) {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteWebhookLogsApi(id);
      if (!res.ok) throw new Error('Failed');
      return res.json();
    },
    ...options
  });
}