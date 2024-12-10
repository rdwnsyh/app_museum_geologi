import React from "react";
import get from "lodash/get";
import PropTypes from "prop-types";

export default function Table({ columns = [], rows = [], getRowDetailsUrl }) {
    // Pastikan rows adalah array, jika tidak tampilkan peringatan
    if (!Array.isArray(rows)) {
        console.error("Error: 'rows' prop harus berupa array. Nilai:", rows);
        rows = [];
    }

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
                    {/* Empty State */}
                    {rows.length === 0 && (
                        <tr>
                            <td
                                className="px-6 py-24 border-t text-center"
                                colSpan={columns.length}
                            >
                                Tidak ada data ditemukan.
                            </td>
                        </tr>
                    )}

                    {/* Render Rows */}
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className="hover:bg-gray-100 focus-within:bg-gray-100"
                        >
                            {columns.map((column) => (
                                <td
                                    key={column.name || `col-${index}`}
                                    className="border-t"
                                >
                                    <div className="flex items-center px-6 py-4">
                                        {column.renderCell?.(row) ||
                                            get(row, column.name, "N/A")}
                                    </div>
                                </td>
                            ))}

                            {/* Render Detail Button Jika `getRowDetailsUrl` Tersedia */}
                            {getRowDetailsUrl && (
                                <td className="border-t">
                                    <a
                                        href={getRowDetailsUrl(row)}
                                        className="flex items-center text-blue-600 hover:underline"
                                    >
                                        Detail
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </a>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

Table.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            colSpan: PropTypes.number,
            renderCell: PropTypes.func, // Opsional: fungsi untuk custom cell rendering
        })
    ).isRequired,
    rows: PropTypes.array, // Default: []
    getRowDetailsUrl: PropTypes.func, // Opsional: fungsi untuk mendapatkan URL detail
};
