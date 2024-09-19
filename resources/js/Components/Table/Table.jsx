import React from "react";
import get from "lodash/get";
import { ChevronRight } from "lucide-react";

export default function Table({ columns = [], rows = [], getRowDetailsUrl }) {
    return (
        <div className="overflow-x-auto bg-white rounded shadow">
            <table className="w-full whitespace-nowrap">
                <thead>
                    <tr className="font-bold text-left">
                        {columns.map((column) => (
                            <th
                                key={column.label}
                                colSpan={column.colSpan ?? 1}
                                className="px-6 pt-5 pb-4"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* Empty state */}
                    {rows.length === 0 && (
                        <tr>
                            <td
                                className="px-6 py-24 border-t text-center"
                                colSpan={columns.length}
                            >
                                No data found.
                            </td>
                        </tr>
                    )}
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100 focus-within:bg-gray-100"
                        >
                            {columns.map((column) => (
                                <td key={column.name} className="border-t">
                                    <div className="flex items-center px-6 py-4">
                                        {column.renderCell?.(row) ||
                                            get(row, column.name) ||
                                            "N/A"}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
