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
        Schema::create('coa_vendors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->nullable();
            $table->string('supplier_site')->nullable();
            $table->string('coa_prepayment_1')->nullable();
            $table->string('coa_prepayment_2')->nullable();
            $table->string('coa_prepayment_3')->nullable();
            $table->string('coa_prepayment_4')->nullable();
            $table->string('coa_prepayment_5')->nullable();
            $table->string('coa_prepayment_6')->nullable();
            $table->string('coa_prepayment_7')->nullable();

            $table->string('coa_liability_account_1')->nullable();
            $table->string('coa_liability_account_2')->nullable();
            $table->string('coa_liability_account_3')->nullable();
            $table->string('coa_liability_account_4')->nullable();
            $table->string('coa_liability_account_5')->nullable();
            $table->string('coa_liability_account_6')->nullable();
            $table->string('coa_liability_account_7')->nullable();

            $table->string('coa_receiving_1')->nullable();
            $table->string('coa_receiving_2')->nullable();
            $table->string('coa_receiving_3')->nullable();
            $table->string('coa_receiving_4')->nullable();
            $table->string('coa_receiving_5')->nullable();
            $table->string('coa_receiving_6')->nullable();
            $table->string('coa_receiving_7')->nullable();
            $table->timestamps();

            $table->foreign('vendor_id')->references('id')->on('vendors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coa_vendors');
    }
};
