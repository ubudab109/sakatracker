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
        Schema::create('batch_payment_invoices', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('batch_payment_id')->unsigned();
            $table->bigInteger('exchange_invoice_id')->unsigned();
            $table->enum('status', ['unpaid', 'paid'])->default('unpaid');
            $table->timestamps();

            $table->foreign('batch_payment_id')->references('id')->on('batch_payments')->onDelete('cascade');
            $table->foreign('exchange_invoice_id')->references('id')->on('exchange_invoices')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batch_payment_invoices');
    }
};
