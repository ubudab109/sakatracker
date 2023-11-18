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
        Schema::create('exchange_invoice_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exchange_invoice_id')->nullable();
            $table->text('file')->nullable();
            $table->timestamps();

            $table->foreign('exchange_invoice_id')->references('id')->on('exchange_invoices')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exchange_invoice_attachments');
    }
};
