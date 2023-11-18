<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $user = \App\Models\User::firstOrCreate([
			'email' => 'admin@gmail.com',
        ], [
			'name' => 'admin',
			'email' => 'admin@gmail.com',
			'role' => 'admin',
			'email_verified_at' => date('Y-m-d H:i:s'),
			'password' => bcrypt(123123123),
		]);

        $role = \App\Models\Role::create([
            'name' => 'PIC TUKAR FAKTUR'
        ]);

        \App\Models\UserRole::create([
            'user_id' => $user->id,
            'role_id' => $role->id,
        ]);

        \App\Models\RolePermission::create([
            'role_id' => $role->id,
            'name' => 'is_pic_exchange_invoice'
        ]);

        \App\Models\ExchangeInvoiceCategory::create([
            'name' => 'Kategori 1'
        ]);

        \App\Models\ExchangeInvoiceCategory::create([
            'name' => 'Kategori 2'
        ]);

        \App\Models\ExchangeInvoiceLocation::create([
            'name' => 'Lokasi 1'
        ]);

        \App\Models\ExchangeInvoiceLocation::create([
            'name' => 'Lokasi 2'
        ]);
    }
}
