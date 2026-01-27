"use client";

import { IPagination } from "@/models/IPagination";
import { useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";

export default function PaginationControls({ pagination }: { pagination: IPagination }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const pageSize = Number(searchParams.get("pageSize") ?? 10);
	const currentPage = pagination.currentPage + 1;
	const totalPages = pagination.totalPages;

	function goToPage(pageNum: number) {
		router.push(`?pageNum=${pageNum}&pageSize=${pageSize}`, {
			scroll: false,
		});
	}

	const pages = getVisiblePages(currentPage, totalPages);

	return (
		<div className="mt-4 flex justify-center">
			<div className="flex items-center gap-1 bg-background-contrast p-2 px-4 shadow-lg rounded-3xl">
				{/* First */}
				<PageButton disabled={!pagination.hasPrev} onClick={() => goToPage(1)}>
					⟪
				</PageButton>

				{/* Prev */}
				<PageButton disabled={!pagination.hasPrev} onClick={() => goToPage(currentPage - 1)}>
					←
				</PageButton>

				{/* Page numbers */}
				{pages.map((page) => (
					<PageButton key={page} active={page === currentPage} onClick={() => goToPage(page)}>
						{page}
					</PageButton>
				))}

				{/* Next */}
				<PageButton disabled={!pagination.hasNext} onClick={() => goToPage(currentPage + 1)}>
					→
				</PageButton>

				{/* Last */}
				<PageButton disabled={!pagination.hasNext} onClick={() => goToPage(totalPages)}>
					⟫
				</PageButton>
			</div>
		</div>
	);
}

/* ---------------------------------- */
/* Helpers                            */
/* ---------------------------------- */

function getVisiblePages(current: number, total: number) {
	const delta = 2;
	const start = Math.max(1, current - delta);
	const end = Math.min(total, current + delta);

	const pages: number[] = [];
	for (let i = start; i <= end; i++) {
		pages.push(i);
	}
	return pages;
}

function PageButton({ children, onClick, disabled, active }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean; active?: boolean }) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={clsx("min-w-9 rounded-lg px-3 py-2 text-sm font-medium transition", "hover:bg-primary hover:text-black", "disabled:opacity-40 disabled:hover:bg-transparent", active ? "bg-primary text-black" : "text-gray-300")}
		>
			{children}
		</button>
	);
}
