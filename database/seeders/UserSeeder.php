<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate([
            'username' => 'risyadridwansyah',
            'password' => bcrypt('12345'),
            'email' => 'risyadridwansyah@gmail.com',
            'asal' => 'ULBI',
            'no_hp' => '088806344561'
        ],[
            'username' => 'risyadridwansyah',
            'password' => bcrypt('12345'),
            'email' => 'risyadridwansyah@gmail.com',
            'asal' => 'ULBI',
            'no_hp' => '088806344561'
        ]);
    }
}
