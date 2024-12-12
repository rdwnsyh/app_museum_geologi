import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Container, Grid, Typography, TextField, MenuItem } from '@mui/material';
import { Inertia } from '@inertiajs/inertia'; // Pastikan Anda mengimpor Inertia

import Table from "@/Components/Table/Table";

function ReportsPage() {
    const [storage, setStorage] = useState('');
    const [floor, setFloor] = useState('');
    const [column, setColumn] = useState('');
    const [searchResults, setSearchResults] = useState([]);  // State to store search results

    // Handle changes for storage, floor, and column (lajur)
    const handleStorageChange = (event) => {
        setStorage(event.target.value);
    };

    const handleFloorChange = (event) => {
        setFloor(event.target.value);
    };

    const handleColumnChange = (event) => {
        setColumn(event.target.value);
    };

    const handleSearch = () => {
        // Example search logic (you can replace this with a real API call)
        const results = [
        ];

        // Set search results to state
        setSearchResults(results);
    };

    // Function to navigate to the details page for a specific row
    const handleViewDetails = (id) => {
        // Navigate to the detail page using Inertia
        Inertia.get(`/lemari-laci/${id}`);  // Adjust the route based on your structure
    };

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
                        value={storage}
                        onChange={handleStorageChange}
                        variant="outlined"
                    >
                        {[...Array(11).keys()].map(i => (
                            <MenuItem key={i + 1} value={i + 1}>Storage {i + 1}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Floor Dropdown */}
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Pilih Lantai"
                        value={floor}
                        onChange={handleFloorChange}
                        variant="outlined"
                    >
                        {[...Array(3).keys()].map(i => (
                            <MenuItem key={i + 1} value={i + 1}>Lantai {i + 1}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                {/* Column (Lajur) Dropdown */}
                <Grid item xs={12} sm={4}>
                    <TextField
                        select
                        fullWidth
                        label="Pilih Lajur"
                        value={column}
                        onChange={handleColumnChange}
                        variant="outlined"
                    >
                        {[...Array(25).keys()].map(i => (
                            <MenuItem key={i + 1} value={i + 1}>Lajur {i + 1}</MenuItem>
                        ))}
                        <MenuItem value="non">Non Lajur</MenuItem>
                    </TextField>
                </Grid>
            </Grid>

            {/* Search Button */}
            <Grid container justifyContent="center" spacing={2}>
                <Grid item>
                    <button 
                        onClick={handleSearch} 
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
                    >
                        Cari Koleksi
                    </button>
                </Grid>
            </Grid>

            {/* Display search results */}
            {searchResults.length > 0 && (
                <Grid container spacing={2} mt={4}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Hasil Pencarian</Typography>
                        <Table 
                            columns={[
                                { label: "Storage", name: "storage" },
                                { label: "Lantai", name: "floor" },
                                { label: "Lajur", name: "column" },
                                {
                                    label: "Aksi",
                                    name: "aksi",
                                    renderCell: (row) => (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleViewDetails(row.id)} // Navigate on click
                                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 transition"
                                            >
                                                Selengkapnya
                                            </button>
                                            <button
                                                onClick={() => handleDelete(row.id)}
                                                className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-900 transition"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            rows={searchResults} // Pass searchResults here
                        />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
}

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
ReportsPage.layout = (page) => <MainLayout title="Reports">{page}</MainLayout>;

export default ReportsPage;
