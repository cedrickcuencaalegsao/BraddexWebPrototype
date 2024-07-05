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
        Schema::create('tbl_inventory', function (Blueprint $table) {
            $table->id();
            $table->string('itemID', 20)->nullable();
            $table->string('name', 50)->nullable();
            $table->string('quantity', 20)->nullable();
            $table->string('price', 50)->nullable();
            $table->string('image', 25)->nullable();
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
        Schema::dropIfExists('tbl_inventory');
    }
};
