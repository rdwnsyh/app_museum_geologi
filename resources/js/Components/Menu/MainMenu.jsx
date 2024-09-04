import MainMenuItem from "@/Components/Menu/MainMenuItem";
import { Building, CircleGauge, Printer, Users, HandHelping, ArchiveRestore, Warehouse, ArrowBigLeftDash, ArrowBigRightDash, Package } from "lucide-react";

export default function MainMenu({ className }) {
    return (
        <div className={className}>
            <MainMenuItem
                text="Dashboard"
                link="dashboard"
                icon={<CircleGauge size={16} />}
            />
            <MainMenuItem
                text="Storage"
                link="storage"
                icon={<Warehouse size={16} />}
            />
            <MainMenuItem
                text="Peminjaman"
                link="peminjaman"
                icon={<HandHelping size={16} />}
            />
            <MainMenuItem
                text="Pengembalian"
                link="pengembalian"
                icon={<ArchiveRestore size={16} />}
            />
            <MainMenuItem
                text="Inbound"
                link="inbound"
                icon={<ArrowBigRightDash size={16} />}
            />
            <MainMenuItem
                text="Outbound"
                link="outbound"
                icon={<ArrowBigLeftDash size={16} />}
            />
            <MainMenuItem
                text="Kelola Koleksi"
                link="kelolakoleksibatuan"
                icon={<Package size={16} />}
                submenu={[
                    { text: "Batu", link: "kelolakoleksibatuan/Batuan" },
                    { text: "Fosil", link: "kelolakoleksi/fosil" },
                    { text: "Mineral", link: "kelolakoleksi/mineral" },
                ]}
            />
            <MainMenuItem
                text="Manajemen Admin"
                link="manajemenadmin"
                icon={<Printer size={16} />}
            />
            <MainMenuItem
                text="Persetujuan"
                link="persetujuan"
                icon={<Printer size={16} />}
            />
        </div>
    );
}
