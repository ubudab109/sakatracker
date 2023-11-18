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
            $table->text('npwp_note')->nullable();
            $table->text('sppkp_note')->nullable();
            $table->text('siup_note')->nullable();
            $table->text('tdp_note')->nullable();
            $table->text('nib_note')->nullable();
            $table->text('board_of_directors_composition_note')->nullable();
            $table->text('non_pkp_statement_note')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn('npwp_note');
            $table->dropColumn('sppkp_note');
            $table->dropColumn('siup_note');
            $table->dropColumn('tdp_note');
            $table->dropColumn('nib_note');
            $table->dropColumn('board_of_directors_composition_note');
            $table->dropColumn('non_pkp_statement_note');
        });
    }
};
