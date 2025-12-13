export const dynamic = "force-dynamic";

import { Accordion, AccordionTab } from "primereact/accordion";
import DeleteLog from "./_components/DeleteLog";
import { headers } from "next/headers";

async function fetchLogs() {
	const h = await headers();
	const host = h.get("host");
	const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
	const res = await fetch(`${protocol}://${host}/api/logs`, {
		method: "GET",
	});
	if (res.ok) {
		return {
			data: await res.json(),
			error: "",
		};
	}
	return {
		data: null,
		error: res || "Error in fetching logs",
	};
}

export default async function LogsPage() {
	const { data, error } = await fetchLogs();

	if (error) {
		console.error("Error fetching logs:", error);
	}

	const logs = data ?? [];

	return (
		<div className="flex w-full sm:justify-center items-center p-8">
			<div className="w-300">
				<div className="min-h-screen w-full text-xl font-semibold">
					<h1 className="text-3xl font-bold mb-4">API Logs</h1>

					<p className="mb-3">Showing the most recent {logs.length} log entries.</p>

					<div className="flex flex-col gap-4">
						{logs.length === 0 && <div className="p-4 rounded-xl bg-background-contrast">No logs found.</div>}

						{logs.map((log: { id: string; timestamp: string; logItem: string }) => (
							<div key={log.id} className="w-full">
								<Accordion multiple className="bg-black">
									<AccordionTab
										header={
											<div className="w-full flex justify-between items-center">
												<div>
													Log ID {log.id} - {new Date(log.timestamp).toString()}
												</div>
												<DeleteLog logId={log.id} />
											</div>
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
