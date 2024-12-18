import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Table from "@/Components/Table/Table";
import Pagination from "@/Components/Pagination/Pagination";
import { Container, Grid, TextField, MenuItem, Typography } from '@mui/material';  

function Storage() {
    const { kelolakoleksi, filters, lokasi_penyimpanan_options, lantai_options, no_lajur_options } = usePage().props;

    const data = kelolakoleksi?.data || [];
    const links = kelolakoleksi?.links || [];

    // State management for filter inputs
    const [lokasi_penyimpanan, setLokasi_penyimpanan] = useState(filters?.lokasi_penyimpanan || '');
    const [lantai, setLantai] = useState(filters?.lantai || '');
    const [no_lajur, setNo_lajur] = useState(filters?.no_lajur || '');
    const [searchResults, setSearchResults] = useState(data);

    // Handle filter changes
    const handleLokasi_penyimpananChange = (event) => setLokasi_penyimpanan(event.target.value);
    const handleLantaiChange = (event) => setLantai(event.target.value);
    const handleNo_lajurChange = (event) => setNo_lajur(event.target.value);

    // // Function to navigate to the details page
    // // const handleViewDetails = (no_lajur) => {
    // //     router.get(route("lemari.destroy", no_lajur));  // Adjust the route as needed
    // // };

    // // Storage and floor options
    // const storageOptions = [
    //     { value: "", label: "" },
    //     { value: "S1", label: "Storage 1" },
    //     { value: "S2", label: "Storage 2" },
    //     { value: "S3", label: "Storage 3" },
    //     { value: "S4", label: "Storage 4" },
    //     { value: "S5", label: "Storage 5" },
    //     { value: "S6", label: "Storage 6" },
    //     { value: "S7", label: "Storage 7" },
    //     { value: "S8", label: "Storage 8" },
    //     { value: "S9", label: "Storage 9" },
    //     { value: "S10", label: "Storage 10" },
    //     { value: "S11", label: "Storage 11" },
    // ];

    // const lantaiOptions = [
    //     { value: "", label: "" },
    //     { value: "L1", label: "Lantai 1" },
    //     { value: "L2", label: "Lantai 2" },
    //     { value: "L3", label: "Lantai 3" },
    // ];

    // Filter results based on selected filters
    useEffect(() => {
        const filtered = data.filter((row) => {
            const lokasi_penyimpananMatch = lokasi_penyimpanan ? row.lokasi_penyimpanan.includes(lokasi_penyimpanan) : true;
            const lantaiMatch = lantai ? row.lantai.includes(lantai) : true;
            const no_lajurMatch = no_lajur ? row.no_lajur === no_lajur || no_lajur === "non" : true;  // Check if it's "non" or a specific number
            return lokasi_penyimpananMatch && lantaiMatch && no_lajurMatch;
        });
        setSearchResults(filtered);
    }, [lokasi_penyimpanan, lantai, no_lajur, data]);

    return (
        <Container maxWidth="xl" className="py-6">
            <Typography variant="h4" sx={{ mb: 6 }}>
                Tata Letak
            </Typography>

            {/* Filter Search Bar */}
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" className="mb-6">
                {/* Storage Dropdown */}
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Pilih Storage"
                        value={lokasi_penyimpanan}
                        onChange={handleLokasi_penyimpananChange}
                        variant="outlined"
                    >
                        {lokasi_penyimpanan_options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Floor Dropdown */}
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Pilih Lantai"
                        value={lantai}
                        onChange={handleLantaiChange}
                        variant="outlined"
                    >
                        {lantai_options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Column (Lajur) Dropdown */}
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Pilih Lajur"
                        value={no_lajur}
                        onChange={handleNo_lajurChange}
                        variant="outlined"
                    >
                        {no_lajur_options.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option === "non" ? "Non Lajur" : option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>

            {/* Display search results */}
            {searchResults.length > 0 ? (
                <Grid container spacing={2} mt={4}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Hasil Pencarian</Typography>
                        <Table
                            columns={[
                                { label: "Storage", name: "lokasi_penyimpanan" },
                                { label: "Lantai", name: "lantai" },
                                { label: "Lajur", name: "no_lajur" },
                                {
                                    label: "Aksi",
                                    name: "aksi",
                                    renderCell: (row) => (
                                        <div className="flex space-x-2">
                                            <Link
                                                href={route(
                                                    "storage.Lemari",
                                                    row.id
                                                )}
                                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                                            >
                                                Selengkapnya
                                            </Link>
                                        </div>
                                    ),
                                },
                            ]}
                            rows={searchResults}
                        />
                    </Grid>
                </Grid>
            ) : (
                <Grid container justifyContent="center" mt={4}>
                    <Typography variant="h6" color="textSecondary">
                        Tidak ada data yang sesuai dengan kriteria pencarian.
                    </Typography>
                </Grid>
            )}

            {/* Pagination */}
            {links.length > 0 && <Pagination links={links} />}
        </Container>
    );
}

Storage.layout = (page) => <MainLayout title="Storage">{page}</MainLayout>;

export default Storage;
