import { Trash2 } from "lucide-react";
import Alert from "@/Components/Alert/Alert";

export default function TrashedMessage({ message, onRestore }) {
    return (
        <Alert
            variant="warning"
            message={message}
            icon={<Trash2 size={20} />}
            action={
                <button
                    onClick={onRestore}
                    className="text-yellow-800 focus:outline-none text-xs font-medium hover:underline"
                >
                    Restore
                </button>
            }
        />
    );
}
