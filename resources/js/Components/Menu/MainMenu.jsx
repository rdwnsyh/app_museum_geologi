import MainMenuItem from "@/Components/Menu/MainMenuItem";
import { Building, CircleGauge, Printer, Users } from "lucide-react";

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
                icon={<Building size={16} />}
            />
            <MainMenuItem
                text="Peminjaman"
                link="peminjaman"
                icon={<Users size={16} />}
            />
            <MainMenuItem
                text="Pengembalian"
                link="pengembalian"
                icon={<Printer size={16} />}
            />
            <MainMenuItem
                text="Inbound"
                link="inbound"
                icon={<Printer size={16} />}
            />
            <MainMenuItem
                text="Outbound"
                link="outbound"
                icon={<Printer size={16} />}
            />
            <MainMenuItem
                text="Kelola Koleksi"
                link="kelolakoleksi"
                icon={<Printer size={16} />}
                submenu={[
                    { text: "Batu", link: "kelolakoleksi/Batuan" },
                    { text: "Fosil", link: "kelolakoleksi/fosil" },
                    { text: "Mineral", link: "kelolakoleksi/mineral" }
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
