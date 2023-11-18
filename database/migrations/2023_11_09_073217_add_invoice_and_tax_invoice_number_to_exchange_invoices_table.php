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
        Schema::table('exchange_invoices', function (Blueprint $table) {
            $table->string('tax_invoice_number')->after('tax_invoice')->nullable();
            $table->text('invoice')->after('invoice_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exchange_invoices', function (Blueprint $table) {
            $table->dropColumn('tax_invoice_number');
            $table->dropColumn('invoice');
        });
    }
};
