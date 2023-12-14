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
            $table->text('tax_invoice_note')->nullable();
            $table->text('invoice_note')->nullable();
            $table->text('bast_note')->nullable();
            $table->text('quotation_note')->nullable();
            $table->text('po_note')->nullable();
            $table->text('attachment_note')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exchange_invoices', function (Blueprint $table) {
            $table->dropColumn('tax_invoice_note');
            $table->dropColumn('invoice_note');
            $table->dropColumn('bast_note');
            $table->dropColumn('quotation_note');
            $table->dropColumn('po_note');
            $table->dropColumn('attachment_note');
        });
    }
};
