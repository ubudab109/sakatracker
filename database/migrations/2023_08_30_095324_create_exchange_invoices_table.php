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
        Schema::create('exchange_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->nullable();
            $table->string('category')->nullable();
            $table->string('location')->nullable();
            $table->text('invoice_number')->nullable();
            $table->text('tax_invoice')->nullable();
            $table->boolean('is_materai')->nullable();
            $table->text('note')->nullable();
            $table->date('date')->nullable();
            $table->string('dpp')->nullable();
            $table->string('ppn')->nullable();
            $table->string('total')->nullable();
            $table->boolean('is_po')->nullable();
            $table->string('po_number')->nullable();
            $table->string('order_id')->nullable();
            $table->string('status')->nullable();
            $table->string('status_approval')->nullable();
            $table->timestamps();

            $table->foreign('vendor_id')->references('id')->on('vendors')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exchange_invoices');
    }
};
