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
            $table->text('bast')->nullable();
            $table->text('po')->nullable();
            $table->text('quotation')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('exchange_invoices', function (Blueprint $table) {
            $table->dropColumn('bast');
            $table->dropColumn('po');
            $table->dropColumn('quotation');
        });
    }
};
