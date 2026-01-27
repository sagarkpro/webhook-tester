"use client";
import { Spinner } from "@/components/ui/spinner";
import { useDeleteWebhookLogsMutation } from "@/lib/queries/webhookLogQueries";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrash } from "react-icons/fa6";
import { toast } from "sonner";

export default function DeleteLog({ logId }: { logId: string }) {
	const router = useRouter();
	const deleteMutation = useDeleteWebhookLogsMutation({
		onSuccess: ()=>{
			router.refresh()
		},
		onError: ()=>{
			toast("Err deleting");
		}
	});

	async function deleteLog() {
		deleteMutation.mutate(logId);
	}

	return (
		<button
			disabled={deleteMutation.isPending}
			onClick={(e) => {
				deleteLog();
				e.stopPropagation();
			}}
			
			className="bg-white disabled:opacity-60 hover:cursor-pointer text-black p-2.5 font-bold rounded-full text-base w-max m-2"
		>
			{
				deleteMutation.isPending ? <Spinner/> : <FaTrash />
			}
		</button>
	);
}
