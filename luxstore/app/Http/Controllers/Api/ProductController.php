<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::with('categories:id,name')->get();
    }
    public function categories()
    {
        return Category::all();
    }
}
