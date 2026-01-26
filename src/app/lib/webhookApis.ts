import { apiFetch } from "./interceptedFetch";

export async function listWebhookLogsApi(){
  return await apiFetch("/webhook-tester", {
    method: "GET",
    skipAuth: true
  });
}

export async function deleteWebhookLogsApi(id: string){
  return await apiFetch(`/webhook-tester/${id}`, {
    method: "DELETE",
    skipAuth: true
  });
}

export async function createWebhookLogsApi(payload: string){
  return await apiFetch(`/webhook-tester`, {
    method: "POST",
    body: payload,
    skipAuth: true
  });
}