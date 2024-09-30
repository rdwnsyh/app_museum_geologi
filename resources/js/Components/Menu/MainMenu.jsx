import React, { useState } from "react";
import MainMenuItem from "@/Components/Menu/MainMenuItem";
import {
    CircleGauge,
    Warehouse,
    HandHelping,
    ArchiveRestore,
    ArrowBigLeftDash,
    ArrowBigRightDash,
    Package,
    UserCog,
    CircleCheck,
} from "lucide-react";

export default function MainMenu({ className }) {
    const [isKelolaKoleksiOpen, setKelolaKoleksiOpen] = useState(false);

    return (
        <div className={className}>
            <MainMenuItem
                text={<span className="text-sm">Dashboard</span>}
                link="dashboard"
                icon={<CircleGauge size={12} />}
            />
            <MainMenuItem
                text={<span className="text-sm">Storage</span>}
                link="storage"
                icon={<Warehouse size={12} />}
            />
            <MainMenuItem
                text={<span className="text-sm">Peminjaman</span>}
                link="peminjaman"
                icon={<HandHelping size={12} />}
            />
            <MainMenuItem
                text={<span className="text-sm">Pengembalian</span>}
                link="pengembalian"
                icon={<ArchiveRestore size={12} />}
            />
            <MainMenuItem
                text={<span className="text-sm">Inbound</span>}
                link="inbound"
                icon={<ArrowBigRightDash size={12} />}
            />
            <MainMenuItem
                text={<span className="text-sm">Outbound</span>}
                link="outbound"
                icon={<ArrowBigLeftDash size={12} />}
            />
           
           <MainMenuItem
                text={<span className="text-sm">Kelola Koleksi</span>}
                link="kelolakoleksi"
                icon={<Package size={12} />}
            />
                
            <MainMenuItem
                text={<span className="text-sm">Manajemen Admin</span>}
                link="manajemenadmin"
                icon={<UserCog size={12} />}
            />
            <MainMenuItem
                text={<span className="text-sm">Persetujuan</span>}
                link="persetujuan"
                icon={<CircleCheck size={12} />}
            />
        </div>
    );
}
