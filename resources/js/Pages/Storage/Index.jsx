import React, { useState, useEffect } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Container, Grid, Typography, TextField, MenuItem } from '@mui/material';
import { Inertia } from '@inertiajs/inertia'; // Ensure Inertia is imported
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

    // Function to perform the search
    const performSearch = () => {
        // Example search logic (replace with real API call or filtering logic)
        const results = [
            { id: 1, storage: 'Storage 1', floor: 'Lantai 1', column: 'Lajur 1' },
            { id: 2, storage: 'Storage 2', floor: 'Lantai 2', column: 'Lajur 2' },
        ];

        // Filter results based on current filters (storage, floor, column)
        const filteredResults = results.filter((row) => {
            const storageMatch = storage ? row.storage.includes(storage) : true;
            const floorMatch = floor ? row.floor.includes(floor) : true;
            const columnMatch = column ? row.column.includes(column) : true;
            return storageMatch && floorMatch && columnMatch;
        });

        // Set search results to state
        setSearchResults(filteredResults);
    };

    // Use useEffect to trigger search whenever the filter changes
    useEffect(() => {
        performSearch();
    }, [storage, floor, column]); // Trigger search when storage, floor, or column changes

    // Function to navigate to the details page for a specific row
    const handleViewDetails = (id) => {
        // Use Inertia to navigate to the details page
        Inertia.get(`/lemari/${id}`);  // Adjust this route to match your actual routing
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
                            <MenuItem key={i + 1} value={`Storage ${i + 1}`}>Storage {i + 1}</MenuItem>
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
                            <MenuItem key={i + 1} value={`Lantai ${i + 1}`}>Lantai {i + 1}</MenuItem>
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
                            <MenuItem key={i + 1} value={`Lajur ${i + 1}`}>Lajur {i + 1}</MenuItem>
                        ))}
                        <MenuItem value="non">Non Lajur</MenuItem>
                    </TextField>
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
                                                onClick={() => handleViewDetails(row.id)} // Navigate to detail page
                                                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-700 transition"
                                            >
                                                Selengkapnya
                                            </button>
                                        </div>
                                    ),
                                },
                            ]}
                            rows={searchResults} // Pass searchResults to the table
                        />
                    </Grid>
                </Grid>
            )}

            {/* If no search results */}
            {searchResults.length === 0 && (
                <Grid container justifyContent="center" mt={4}>
                    <Typography variant="h6" color="textSecondary">
                        Tidak ada data yang sesuai dengan kriteria pencarian.
                    </Typography>
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
