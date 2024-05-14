<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbl_cart extends Model
{
    use HasFactory;
    protected $table = 'tbl_cart';

    protected $fillable = [
        'created_by',
        'menu_id',
    ];
}
