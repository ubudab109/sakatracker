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
        Schema::table('approver_invoice_items', function (Blueprint $table) {
            $table->integer('sla')->after('level')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('approver_invoice_items', function (Blueprint $table) {
            $table->dropColumn('sla');
        });
    }
};
