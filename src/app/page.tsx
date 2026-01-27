export const dynamic = "force-dynamic";

import { Accordion, AccordionTab } from "primereact/accordion";
import { listWebhookLogsApi } from "../lib/api/webhookApis";
import WebhookLogAccordionHeader from "./_components/WebhookLogAccordionHeader";
import PaginationControls from "./_components/PaginationControls";
import IWebhookLog from "@/models/IWebhookLog";

async function fetchLogs(pageNum: number, pageSize: number) {
	let body;

	try {
		// 0 indexed pageNum
		const res = await listWebhookLogsApi(pageNum - 1, pageSize);
		body = await res.json();

		if (res.ok) {
			return {
				data: body.data,
				pagination: body.pagination,
				error: "",
			};
		}

		return {
			data: null,
			pagination: null,
			error: body || "Error in fetching logs",
		};
	} catch (err) {
		console.log("Error fetching db logs: ", err);
		return {
			data: null,
			pagination: null,
			error: body || err,
		};
	}
}

type PageProps = {
	searchParams: Promise<{
		pageNum?: string;
		pageSize?: string;
	}>;
};

export default async function LogsPage({ searchParams }: PageProps) {
	const params = await searchParams;

	const pageNum = Number(params.pageNum ?? 1);
	const pageSize = Number(params.pageSize ?? 10);

	const { data, pagination, error } = await fetchLogs(pageNum, pageSize);
	const logs = data ?? [];

	return (
		<div className="flex w-full sm:justify-center items-center p-8">
			<div className="w-300">
				<div className="min-h-screen w-full text-xl font-semibold">
					<h1 className="text-3xl font-bold mb-4">API Logs</h1>

					{pagination && (
						<div className="mb-2 max-w-max rounded-full bg-background-contrast px-4 py-1 text-sm text-gray-300">
							Page <span className="font-semibold text-white">{pagination.currentPage + 1}</span>
							<span className="mx-1 text-gray-500">/</span>
							{pagination.totalPages}
						</div>
					)}

					<div className="flex flex-col gap-4">
						{logs.length === 0 && <div className="p-4 rounded-xl bg-background-contrast">{error?.message ? "Error: " + error.message : "No logs found."}</div>}

						{logs.map((log: IWebhookLog) => (
							<div key={log.id} className="w-full">
								<Accordion multiple className="bg-black">
									<AccordionTab header={<WebhookLogAccordionHeader log={log} />}>
										<pre className="m-0 p-3 rounded-md bg-background-contrast overflow-x-auto whitespace-pre text-white font-semibold">
											<code>{JSON.stringify(log.logItem, null, 2)}</code>
										</pre>
									</AccordionTab>
								</Accordion>
							</div>
						))}
					</div>

					{/* Pagination controls */}
					{pagination && <PaginationControls pagination={pagination} />}
				</div>
			</div>
		</div>
	);
}
