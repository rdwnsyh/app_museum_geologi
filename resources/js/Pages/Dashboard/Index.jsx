import { Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";

function DashboardPage() {
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
            <p className="mb-12 leading-normal">
                Hey there! Welcome to Ping CRM, a demo app designed to help
                illustrate how
            </p>
            <div>
                <Link className="mr-1 btn-indigo" href="/500">
                    500 error
                </Link>
                <Link className="btn-indigo" href="/404">
                    404 error
                </Link>
            </div>
        </div>
    );
}

// Tambahkan properti `layout` untuk menggunakan MainLayout
DashboardPage.layout = (page) => (
    <MainLayout title="Dashboard">{page}</MainLayout>
);

export default DashboardPage;
