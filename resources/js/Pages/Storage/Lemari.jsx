import React, { useState, useEffect } from 'react';
import { Link, usePage, router , Head} from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import Table from "@/Components/Table/Table";
import Pagination from "@/Components/Pagination/Pagination";
import { Container, Grid, TextField, MenuItem, Typography } from '@mui/material';  

function Lemari() {
    const { kelolakoleksi, filters, no_lemari_options, no_laci_options, no_slot_options } = usePage().props;
    console.log(kelolakoleksi);

    const data = kelolakoleksi?.data || [];
    const links = kelolakoleksi?.links || [];

    // State management for filter inputs
    const [no_lemari, setNo_lemari] = useState(filters?.no_lemari || '');
    const [no_laci, setNo_laci] = useState(filters?.no_laci || '');
    const [no_slot, setNo_slot] = useState(filters?.no_slot || '');
    const [searchResults, setSearchResults] = useState(data);

    // Handle filter changes
    const handleNo_lemariChange = (event) => setNo_lemari(event.target.value);
    const handleNo_laciChange = (event) => setNo_laci(event.target.value);
    const handleNo_slotChange = (event) => setNo_slot(event.target.value);

    // Filter results based on selected filters
    useEffect(() => {
        // Log untuk mengecek nilai filter dan data
        console.log('Filters:', { no_lemari, no_laci, no_slot });
        console.log('Data:', data);
    
        const filtered = data.filter((row) => {
            const no_lemariMatch = no_lemari ? row.no_lemari === no_lemari : true;
            const no_laciMatch = no_laci ? row.no_laci === no_laci : true;
            const no_slotMatch = no_slot ? row.no_slot === no_slot : true;
            return no_lemariMatch && no_laciMatch && no_slotMatch;
        });
    
        // Update hasil pencarian
        setSearchResults(filtered);
    }, [no_lemari, no_laci, no_slot, data]);
    

    return (
        <Container maxWidth="xl" className="py-6">
            <Typography variant="h4" sx={{ mb: 6 }}>Tata Letak</Typography>

            <Head title={`Lemari ${kelolakoleksi?.lokasi_penyimpanan}`} />
            <h1 className="mb-8 text-3xl font-bold">
                <Link href={route("storage")} className="text-indigo-600 hover:text-indigo-700">
                    {kelolakoleksi?.lokasi_penyimpanan}
                </Link>
                <span className="mx-2 font-medium text-indigo-600">/</span>
                {kelolakoleksi?.lantai}
                <span className="mx-2 font-medium text-indigo-600">/</span>
                {kelolakoleksi?.no_lajur}
                <span className="mx-2 font-medium text-indigo-600">/</span>
                {kelolakoleksi?.no_lemari}
            </h1>

            {/* Filter Search Bar */}
            <Grid container spacing={2} justifyContent="space-between" alignItems="center" className="mb-6">
                <Grid item xs={12} sm={4}>
                    <TextField 
                        select 
                        fullWidth 
                        label="Pilih Lemari" 
                        value={no_lemari} 
                        onChange={handleNo_lemariChange} 
                        variant="outlined"
                    >
                        {no_lemari_options.map((option, index) => (
                            <MenuItem key={`lemari-${option}-${index}`} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField 
                        select 
                        fullWidth 
                        label="Pilih Laci" 
                        value={no_laci} 
                        onChange={handleNo_laciChange} 
                        variant="outlined"
                    >
                        {no_laci_options.map((option, index) => (
                            <MenuItem key={`laci-${option}-${index}`} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField 
                        select 
                        fullWidth 
                        label="Pilih Nomor Slot" 
                        value={no_slot} 
                        onChange={handleNo_slotChange} 
                        variant="outlined"
                    >
                        {no_slot_options.map((option, index) => (
                            <MenuItem key={`slot-${option}-${index}`} value={option}>
                                {option}
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
                                { label: "Nomor Lemari", name: "no_lemari" },
                                { label: "Nomor Laci", name: "no_laci" },
                                { label: "Nomor Slot", name: "no_slot" },
                                {
                                    label: "Aksi",
                                    name: "aksi",
                                    renderCell: (row) => (
                                        <div className="flex space-x-2">
                                            <Link 
                                                href={route("storage.detail", row.id)} 
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
                    <Typography variant="h6" color="textSecondary">Tidak ada data yang sesuai dengan kriteria pencarian.</Typography>
                </Grid>
            )}

            {/* Pagination */}
            {links.length > 0 && <Pagination links={links} />}
        </Container>
    );
}

Lemari.layout = (page) => <MainLayout title="Storage - Lemari">{page}</MainLayout>;

export default Lemari;
