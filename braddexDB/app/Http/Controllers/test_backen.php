<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class test_backen extends Controller
{
    public function HelloWorld()
    {
        $var = "hello world";
        return $var;
    }
}
