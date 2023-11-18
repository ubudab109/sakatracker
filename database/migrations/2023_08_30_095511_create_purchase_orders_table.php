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
        Schema::create('purchase_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exchange_invoice_id')->nullable();
            $table->string('orderline_id')->nullable();;
            $table->string('order_id')->nullable();
            $table->string('document_number')->nullable();
            $table->string('invoice_number')->nullable();
            $table->string('date_gr')->nullable();
            $table->string('quantity')->nullable();
            $table->string('unit_price')->nullable();
            $table->string('total_price')->nullable();
            $table->timestamps();

            $table->foreign('exchange_invoice_id')->references('id')->on('exchange_invoices')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_orders');
    }
};
