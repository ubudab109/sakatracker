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
        Schema::create('revision_exchange_invoice_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('r_e_invoice_id')->nullable();
            $table->text('file')->nullable();
            $table->timestamps();

            $table->foreign('r_e_invoice_id')->references('id')->on('revision_exchange_invoices')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revision_exchange_invoice_attachments');
    }
};
