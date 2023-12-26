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
        Schema::table('batch_payment_invoices', function (Blueprint $table) {
            $table->string('document_status')->after('status')->nullable();
            $table->text('notes')->after('document_status')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('batch_payment_invoices', function (Blueprint $table) {
            //
        });
    }
};
