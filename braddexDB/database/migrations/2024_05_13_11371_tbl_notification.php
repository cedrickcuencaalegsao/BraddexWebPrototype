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
        Schema::create('tbl_notif', function (Blueprint $table) {
            $table->id();
            $table->string('notifID', 20)->nullable();
            $table->string('onwed_by', 20)->nullable();
            $table->string('from', 50)->nullable();
            $table->string('title', 15)->nullable();
            $table->string('act_details', 255)->nullable();
            $table->boolean('read')->nullable();
            $table->boolean('admin_only')->nullable();
            $table->string('created_at', 20)->nullable();
            $table->string('updated_at', 20)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_notif');
    }
};
