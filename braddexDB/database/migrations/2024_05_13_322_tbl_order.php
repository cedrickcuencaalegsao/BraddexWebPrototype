<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_order', function (Blueprint $table) {
            $table->id();
            $table->string('orderID', 20)->nullable();
            $table->string('userID', 20)->nullable();
            $table->string('menuID', 20)->nullable();
            $table->string('paymentType', 25)->nullable();
            $table->string('userAddress', 255)->nullable();
            $table->float('totalAmmount', 25)->nullable();
            $table->string('quantity', 10)->nullable();
            $table->boolean('isPaid')->nullable();
            $table->boolean('isDelivered')->nullable();
            $table->boolean('isCancelled')->nullable();
            $table->boolean('isDeleted')->nullable();
            $table->string('created_at', 20)->nullable();
            $table->string('updated_at', 20)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_order');
    }
};
