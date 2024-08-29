import React from 'react';

import MainLayout from '@/Layouts/MainLayout';
import ProgressBar from '@/Components/ProgressBar';
import LineChart from '@/Components/LineChart'; 
import BarChart from '@/Components/BarChart';
import PieChart from '@/Components/PieChart';
import SearchBar from '@/Components/SearchBar/SearchBar';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2'; // Update if using @mui/material/Grid
import Typography from '@mui/material/Typography';

function DashboardPage() {
    
    const progressData = [
        { title: "Batuan & Mineral", total: 108950, progress: 25, color: "success" },
        { title: "Fosil Vertebrata", total: 60378, progress: 15, color: "info" },
        { title: "Fosil Invertebrata", total: 226301, progress: 50, color: "warning" },
        { title: "Artefak", total: 21893, progress: 10, color: "error" },
        { title: "Total Koleksi", total: 417882, progress: 75, color: "warning" },
        { title: "Koleksi pameran", total: 20, progress: 5, color: "warning" },
    ];

    const lineChartData = [
        { month: 'January', value: 250 },
        { month: 'February', value: 280 },
        { month: 'March', value: 270 },
        { month: 'April', value: 290 },
        { month: 'May', value: 300 },
        { month: 'June', value: 350 },
        { month: 'July', value: 420 },
        { month: 'August', value: 480 },
        { month: 'September', value: 520 },
        { month: 'October', value: 500 },
        { month: 'November', value: 450 },
        { month: 'December', value: 480 }
    ];

    const barChartData = [
        { label: 'January', value: 65 },
        { label: 'February', value: 59 },
        { label: 'March', value: 80 },
        { label: 'April', value: 81 },
        { label: 'May', value: 56 },
        { label: 'June', value: 55 },
        { label: 'July', value: 70 },
        { month: 'August', value: 83 },
        { month: 'September', value: 66 },
        { month: 'October', value: 90 },
        { month: 'November', value: 87 },
        { month: 'December', value: 78 }
    ];

    const pieChartData = [
        { label: 'A', value: 20 },
        { label: 'B', value: 30 },
        { label: 'C', value: 25 },
        { label: 'D', value: 15 },
        { label: 'E', value: 10 }
    ];

    return (
        <Container maxWidth="xl" className="py-6">
            <Typography variant="h4" sx={{ mb: 6 }}>
                STORAGE MANAGEMENT SYSTEM DASHBOARD
            </Typography>
            
            <Grid container spacing={2}>
                <SearchBar placeholder="Cari Koleksi..." />
            </Grid>
        
            <Grid container spacing={2}>
                {/* Progress Bars */}
                {progressData.map((item, index) => (
                    <Grid key={index} xs={12} sm={6} md={4} lg={2}>
                        <div className="w-full h-32"> {/* Ensure box is large */}
                            <ProgressBar
                                title={item.title}
                                total={item.total}
                                progress={item.progress}
                                color={item.color}
                            />
                        </div>
                    </Grid>
                ))}

                {/* Line Chart */}
                <Grid item xs={12}>
                    <div className="w-full h-[400px]">
                        <LineChart data={lineChartData} /> {/* Pass data to LineChart */}
                    </div>
                </Grid>

                    <Grid item xs={12} md={6}>
                        <div className="w-full h-[400px]">
                            <BarChart data={barChartData} />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="w-full h-[400px]">
                            <PieChart data={pieChartData} />
                        </div>
                    </Grid>
                </Grid>

            
        </Container>
    );
}

// Tambahkan properti layout untuk menggunakan MainLayout
DashboardPage.layout = (page) => (
    <MainLayout title="Dashboard">{page}</MainLayout>
);

export default DashboardPage;
