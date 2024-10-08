import { Link } from "@inertiajs/react";
import SearchBar from "../Components/SearchBar"; // Pastikan path ini sesuai dengan lokasi file SearchBar.js

export default function Welcome({ auth, results, searchQuery }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <div className="bg-[url('../../full_bg.png')] p-60 bg-cover bg-left h-screen relative">
                <header>
                    <div className="absolute inset-0 flex flex-col items-center justify-center ">
                        <img
                            src="/LOGOKAGEOFIKS.svg" // Logo harus berada di folder public
                            alt="Logo"
                            className="lg:w-60 lg:h-45 mb-6" // Mengatur jarak bawah antara logo dan search bar
                        />
                        <SearchBar placeholder="Cari Koleksi..." />
                        {/* <div className="mt-6">
                            {searchQuery && (
                                <p>Menampilkan hasil untuk "{searchQuery}":</p>
                            )}
                            {results.length > 0 ? (
                                <ul>
                                    {results.map((item) => (
                                        <li
                                            key={item.id}
                                            className="border p-4 mb-2"
                                        >
                                            {item.name ||
                                                item.nama_koleksi ||
                                                item.nama_fosil ||
                                                item.nama_sdg}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Tidak ada hasil yang ditemukan.</p>
                            )}
                        </div> */}
                    </div>

                    <div className="absolute top-0 right-0 p-6">
                        <nav className="-mx-3 flex flex-1 justify-end">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("login")}
                                        className=" rounded-md px-3 py-2 text-white bg-blue-700 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:bg-blue-800 dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route("register")}
                                        className="ms-4 rounded-md px-3 py-2 text-white bg-blue-700 ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:bg-blue-800 dark:hover:text-white/80 dark:focus-visible:ring-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>
            </div>
        </>
    );
}
