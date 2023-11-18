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
        Schema::create('revision_exchange_invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exchange_invoice_id')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->string('approval_permission')->nullable();
            $table->string('status')->nullable();
            $table->integer('level')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();

            $table->foreign('exchange_invoice_id')->references('id')->on('exchange_invoices')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revision_exchange_invoices');
    }
};
