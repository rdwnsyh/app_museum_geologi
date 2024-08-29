import MainLayout from "@/Layouts/MainLayout";

function ReportsPage() {
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Storage</h1>
            <p className="mb-12 leading-normal">Not implemented</p>
        </div>
    );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
ReportsPage.layout = (page) => <MainLayout title="Reports">{page}</MainLayout>;

export default ReportsPage;
