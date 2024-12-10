import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowDownToLine } from "lucide-react";

const ExportButtons = () => {
    return (
        <div className="flex space-x-2">
            <a
                href={route("kelolakoleksi.export.excel")}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition flex items-center"
                target="_blank"
                rel="noopener noreferrer"
            >
                <ArrowDownToLine className="w-4 h-4 mr-2" />
                Excel
            </a>
            <a
                href={route("kelolakoleksi.export.pdf")}
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition flex items-center"
                target="_blank"
                rel="noopener noreferrer"
            >
                <ArrowDownToLine className="w-4 h-4 mr-2" />
                PDF
            </a>
        </div>
    );
};

export default ExportButtons;
