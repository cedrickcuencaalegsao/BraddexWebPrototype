<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class tbl_order extends Model
{
    use HasFactory;
    protected $table = 'tbl_order';
    protected $fillable = [
        'orderID',
        'userID',
        'menuID',
        'paymentType',
        'totalAmmount',
        'isPaid',
        'isDelivered',
        'isDeleted',
        'updated_at'
    ];
}
