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
        Schema::create('customer_adresses', function (Blueprint $table) {
            $table->id();
            $table->string('type', 45);
            $table->string('adress', 255);
            $table->string('city', 255);
            $table->string('state', 45)->nullable();
            $table->string('zipcode', 45)->nullable();
            $table->foreignId('customer_id')->references('id')->on('customers');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_adresses');
    }
};
