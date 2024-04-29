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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('f_name', 50)->nullable();
            $table->string('l_name', 50)->nullable();
            $table->string('email', 50)->unique();
            $table->string('password', 255)->nullable();
            $table->string('phone_no', 11)->nullable();
            $table->string('address', 70)->nullable();
            $table->string('prof_pic', 50)->nullable();
            $table->string('birthday', 15)->nullable();
            $table->boolean('isActive')->default(false);
            $table->boolean('isOnline')->default(false);
            $table->boolean('isAdmin')->default(false);
            $table->string('created_at')->nullable();
            $table->string('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
