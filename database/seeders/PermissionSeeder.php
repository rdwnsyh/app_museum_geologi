<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::updateOrCreate([
            'name' => 'admin'
        ],
        ['name' => 'admin']);

        $role_staff = Role::updateOrCreate([
            'name' => 'staff'
        ],
        ['name' => 'staff']);

        $role_peminjam = Role::updateOrCreate([
            'name' => 'peminjam'
        ],
        ['name' => 'peminjam']);

        $role_pengunjung = Role::updateOrCreate([
            'name' => 'pengunjung'
        ],
        ['name' => 'pengunjung']);

        $permission = Permission::updateOrCreate(
            [
                'name' => 'manage sistem kageo',
            ],
            ['name' => 'manage sistem kageo']
        );
        
        $permission2 = Permission::updateOrCreate(
            [
                'name' => 'manage data koleksi, manage inbound dan outbound, laporan dan statistika, pencarian data koleksi',
            ],
            ['name' => 'manage data koleksi, manage inbound dan outbound, laporan dan statistika, pencarian data koleksi']
        );

        $permission3 = Permission::updateOrCreate(
            [
                'name' => 'meminjam barang, pengembalian barang',
            ],
            ['name' => 'meminjam barang, pengembalian barang']
        );

        $permission4 = Permission::updateOrCreate(
            [
                'name' => 'pencarian',
            ],
            ['name' => 'pencarian']
        );

        $role_admin->givePermissionTo($permission);
        $role_staff->givePermissionTo($permission2);
        $role_peminjam->givePermissionTo($permission3);
        $role_pengunjung->givePermissionTo($permission4);

        $user = User::find(1);

        $user->assignRole('admin');
    }
}
