<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbl_inventory extends Model
{
    use HasFactory;
    protected $table ='tbl_inventory';
    protected $fillable = [
        'itemID',
        'name',
        'quantity',
        'price',
        'image',
        'updated_at',
    ];
}
