"use client";

import React from "react";
import DeleteLog from "./DeleteLog";
import IWebhookLog from "@/models/IWebhookLog";
import { copyToClipboard } from "@/utils/common";
import { ClipboardListIcon } from "lucide-react";

export default function WebhookLogAccordionHeader({ log }: { log: IWebhookLog }) {
	return (
		<div className="w-full flex items-center justify-between gap-4">
			{/* Left: Log ID */}
			<button
				onClick={(e) => {e.stopPropagation(); copyToClipboard(log.id)}}
				className="flex items-center gap-2 text-sm font-medium hover:text-primary transition hover:cursor-pointer"
			>
				<span className="truncate max-w-[220px]">
					Log ID: {log.id}
				</span>
				<ClipboardListIcon className="h-4 w-4 opacity-70" />
			</button>

			{/* Right: Meta + Actions */}
			<div className="flex items-center gap-4 text-sm text-muted-foreground">
				<span className="whitespace-nowrap">
					{new Date(log.createdAt).toLocaleString("en-IN", {
						timeZone: "Asia/Kolkata",
						dateStyle: "medium",
						timeStyle: "short",
					})}
				</span>

				<DeleteLog logId={log.id} />
			</div>
		</div>
	);
}
