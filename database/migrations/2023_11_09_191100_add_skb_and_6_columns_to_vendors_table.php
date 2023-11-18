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
        Schema::table('vendors', function (Blueprint $table) {
            $table->string('skb')->after('ppn')->nullable();
            $table->string('pph')->after('ppn')->nullable();
            $table->string('coa_prepayment')->after('ppn')->nullable();
            $table->string('coa_liability_account')->after('ppn')->nullable();
            $table->string('coa_receiving')->after('ppn')->nullable();
            $table->string('ship_to')->after('ppn')->nullable();
            $table->string('bill_to')->after('ppn')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn('skb');
            $table->dropColumn('pph');
            $table->dropColumn('coa_prepayment');
            $table->dropColumn('coa_liability_account');
            $table->dropColumn('coa_receiving');
            $table->dropColumn('ship_to');
            $table->dropColumn('bill_to');
        });
    }
};
