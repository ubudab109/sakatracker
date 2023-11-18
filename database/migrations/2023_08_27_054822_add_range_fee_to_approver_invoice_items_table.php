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
            $table->string('start_fee')->after('level')->nullable();
            $table->string('end_fee')->after('level')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('approver_invoice_items', function (Blueprint $table) {
            $table->dropColumn('start_fee');
            $table->dropColumn('end_fee');
        });
    }
};
