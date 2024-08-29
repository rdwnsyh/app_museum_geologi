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
                text="KelolaKoleksi"
                link="kelolakoleksi"
                icon={<Printer size={16} />}
            />
            <MainMenuItem
                text="Manajemen User"
                link="manajemenuser"
                icon={<Users size={16} />}
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
