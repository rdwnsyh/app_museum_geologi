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
    CircleCheck 
} from "lucide-react";

export default function MainMenu({ className }) {
    return (
        <div className={className}>
            <MainMenuItem
                text="Dashboard"
                link="dashboard"
                icon={<CircleGauge size={14} />}
            />
            <MainMenuItem
                text="Storage"
                link="storage"
                icon={<Warehouse size={14} />}
            />
            <MainMenuItem
                text="Peminjaman"
                link="peminjaman"
                icon={<HandHelping size={14} />}
            />
            <MainMenuItem
                text="Pengembalian"
                link="pengembalian"
                icon={<ArchiveRestore size={14} />}
            />
            <MainMenuItem
                text="Inbound"
                link="inbound"
                icon={<ArrowBigRightDash size={14} />}
            />
            <MainMenuItem
                text="Outbound"
                link="outbound"
                icon={<ArrowBigLeftDash size={14} />}
            />
            <MainMenuItem
                text="Kelola Koleksi"
                link="kelolakoleksibatuan" 
                icon={<Package size={14} />}
                submenu={[
                    { text: "Batu dan Mineral", link: "kelolakoleksibatuan/batuan" }, 
                    { text: "Fosil", link: "kelolakoleksibatuan/fosil" },
                    { text: "Sumber Daya Geologi", link: "kelolakoleksibatuan/sumberdayageologi" },
                ]}
            />
            <MainMenuItem
                text="Manajemen Admin"
                link="manajemenadmin"
                icon={<UserCog size={14} />}
            />
            <MainMenuItem
                text="Persetujuan"
                link="persetujuan"
                icon={<CircleCheck size={14} />}
            />
        </div>
    );
}
