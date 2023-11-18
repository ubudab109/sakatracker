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
        Schema::create('request_good_receipt_attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_g_r_id')->nullable();
            $table->text('file')->nullable();
            $table->timestamps();

            $table->foreign('request_g_r_id')->references('id')->on('request_good_receipts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_good_receipt_attachments');
    }
};
