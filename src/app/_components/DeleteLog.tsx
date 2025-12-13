"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { FaTrash } from "react-icons/fa6";

export default function DeleteLog({ logId }: { logId: string }) {
	const router = useRouter();
	async function deleteLog() {
		const res = await fetch(`/api/logs`, {
			method: "DELETE",
			body: JSON.stringify({ id: logId }),
		});
		if (!res.ok) {
			console.error("Failed to delete log:", res);
		} else {
			router.refresh();
		}
	}
	return (
		<button
			onClick={(e) => {
				deleteLog();
				e.stopPropagation();
			}}
			className="bg-white hover:cursor-pointer text-black p-0 px-4 h-10 font-bold rounded-full text-base w-max m-2"
		>
			<FaTrash />
		</button>
	);
}
