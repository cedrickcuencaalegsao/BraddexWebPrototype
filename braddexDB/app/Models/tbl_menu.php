<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbl_menu extends Model
{
    use HasFactory;
    protected $table = 'tbl_menu';
    protected $fillable = [
        'menu_name',
        'price',
        'image',
        'bestselling',
        'updated_at',
    ];
}
