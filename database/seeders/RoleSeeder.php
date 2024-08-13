<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::updateOrCreate([
            'name' => 'admin'
        ],
        ['name' => 'admin']);
        Role::updateOrCreate([
            'name' => 'staff'
        ],
        ['name' => 'staff']);
        Role::updateOrCreate([
            'name' => 'peminjam'
        ],
        ['name' => 'peminjam']);
        Role::updateOrCreate([
            'name' => 'pengunjung'
        ],
        ['name' => 'pengunjung']);
        
    }
}
