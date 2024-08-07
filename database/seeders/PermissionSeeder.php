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
                'name' => 'view_dashboard',
            ],
            ['name' => 'view_dashboard']
        );
        
        $permission2 = Permission::updateOrCreate(
            [
                'name' => 'view_dashboard',
            ],
            ['name' => 'view_dashboard']
        );

        $permission3 = Permission::updateOrCreate(
            [
                'name' => 'view_dashboard',
            ],
            ['name' => 'view_dashboard']
        );

        $permission4 = Permission::updateOrCreate(
            [
                'name' => 'view_dashboard',
            ],
            ['name' => 'view_dashboard']
        );

        $role_admin->givePermissionTo($permission);
        $role_staff->givePermissionTo($permission);
        $role_peminjam->givePermissionTo($permission);
        $role_pengunjung->givePermissionTo($permission);

        $user = User::find(1);
        $user2 = User::find(2);
        $user3 = User::find(3);
        $user4 = User::find(4);

        $user->assignRole(['admin', 'staff', 'peminjam', 'pengunjung']);
        $user2->assignRole(['staff', 'peminjam', 'pengunjung']);
        $user3->assignRole(['peminjam']);
        $user4->assignRole(['pengunjung']);
    }
}
