<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->string('status_account')->nullable();
            $table->string('type_of_business')->nullable();
            $table->string('name')->nullable();
            $table->string('npwp')->nullable();
            $table->text('npwp_address')->nullable();
            $table->text('country')->nullable();
            $table->string('province_id')->nullable();
            $table->string('province_name')->nullable();
            $table->string('city_id')->nullable();
            $table->string('city_name')->nullable();
            $table->string('subdistrict_id')->nullable();
            $table->string('subdistrict_name')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('mobile_phone_number')->nullable();
            $table->string('email')->nullable();
            $table->string('director_name')->nullable();
            $table->string('director_phone_number')->nullable();
            $table->string('director_email')->nullable();
            $table->string('fa_name')->nullable();
            $table->string('fa_phone_number')->nullable();
            $table->string('fa_email')->nullable();
            $table->string('marketing_key_account')->nullable();
            $table->string('marketing_phone_number')->nullable();
            $table->string('marketing_email')->nullable();
            $table->boolean('is_virtual_account')->nullable();
            $table->boolean('is_bca')->nullable();
            $table->string('bank_account_name')->nullable();
            $table->string('bank_account_number')->nullable();
            $table->string('branch_of_bank')->nullable();
            $table->string('bank_swift_code')->nullable();
            $table->text('file_npwp')->nullable();
            $table->date('expired_npwp')->nullable();
            $table->text('file_sppkp')->nullable();
            $table->date('expired_sppkp')->nullable();
            $table->text('file_siup')->nullable();
            $table->date('expired_siup')->nullable();
            $table->text('file_tdp')->nullable();
            $table->date('expired_tdp')->nullable();
            $table->text('file_nib')->nullable();
            $table->date('expired_nib')->nullable();
            $table->text('file_board_of_directors_composition')->nullable();
            $table->text('file_front_page_bank')->nullable();
            $table->text('file_bank_account_statement_letter')->nullable();
            $table->text('file_non_pkp_statement')->nullable();
            $table->text('file_ektp')->nullable();
            $table->date('expired_ektp')->nullable();
            $table->string('top')->nullable();
            $table->string('ppn')->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendors');
    }
};
