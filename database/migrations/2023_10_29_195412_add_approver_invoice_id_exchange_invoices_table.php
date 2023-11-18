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
            $table->bigInteger('approver_invoice_id')->unsigned()->nullable();
            
            $table->foreign('approver_invoice_id')->references('id')->on('approver_invoices')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exchange_invoices', function (Blueprint $table) {
            $table->dropColumn('approver_invoice_id');
        });
    }
};
