export const dynamic = "force-dynamic";

import { Accordion, AccordionTab } from "primereact/accordion";
import DeleteLog from "./_components/DeleteLog";
import { listWebhookLogsApi } from "../lib/api/webhookApis";
import { toast } from "sonner";
import { Clipboard } from "lucide-react";
import WebhookLogAccordionHeader from "./_components/WebhookLogAccordionHeader";

async function fetchLogs() {
	let body;
	try {
		const res = await listWebhookLogsApi();
		body = await res.json();
		if (res.ok) {
			return {
				data: body.data,
				error: "",
			};
		}
		return {
			data: null,
			error: body || "Error in fetching logs",
		};
	} catch (err) {
		console.log("Error fetching db logs: ", err);
		return {
			data: null,
			error: body || err,
		};
	}
}

export default async function LogsPage() {
	const { data, error } = await fetchLogs();

	const logs = data ?? [];

	return (
		<div className="flex w-full sm:justify-center items-center p-8">
			<div className="w-300">
				<div className="min-h-screen w-full text-xl font-semibold">
					<h1 className="text-3xl font-bold mb-4">API Logs</h1>

					<p className="mb-3">Showing the most recent {logs.length} log entries.</p>

					<div className="flex flex-col gap-4">
						{logs?.length === 0 && <div className="p-4 rounded-xl bg-background-contrast">{error?.message ? "Error: " + error?.message : "No logs found."}</div>}

						{logs?.map((log: { id: string; createdAt: string; logItem: string }) => (
							<div key={log.id} className="w-full">
								<Accordion multiple className="bg-black">
									<AccordionTab
										header={
											<WebhookLogAccordionHeader log={log}/>
										}
									>
										<pre className="m-0 p-3 rounded-md bg-background-contrast overflow-x-auto whitespace-pre text-white font-semibold">
											<code>{JSON.stringify(log.logItem, null, 2)}</code>
										</pre>
									</AccordionTab>
								</Accordion>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
