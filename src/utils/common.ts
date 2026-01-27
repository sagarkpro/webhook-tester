import { toast } from "sonner";

export async function copyToClipboard(text: string, successMsg?: string, errorMsg?: string) {
  try {
    if (window?.navigator?.clipboard?.writeText) {
      await window.navigator.clipboard.writeText(text);
      toast(successMsg || "Copied to clipboard");
    } else {
      toast.error(errorMsg || "Cant access clipboard");
    }
  } catch (err) {
    toast.error(errorMsg || "Error copying to clipboard");
    console.error(err);
  }
}