<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Product;

class AdminController extends Controller
{
    public function addProduct (Request $request) {
        $validated = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'color' => ['required'],
            'memory' => ['required'],
            'sim' => ['required'],
            'price' => ['required'],
            'category_id' => ['required'],
        ]);

        $img = $request->file('image');
        $typeImg = $img->extension();
        $uniqName = Str::random();
        $nameImg = $uniqName + '.' + $typeImg;
        $pathFolder = '/assets/images/';
        $img->move(public_path($pathFolder),$nameImg);

        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'color' => $validated['color'],
            'memory' => $validated['memory'],
            'sim' => $validated['sim'],
            'price' => $validated['price'],
            'image_url' => $pathFolder . $nameImg,
            'category_id' => $validated['category_id'],
            'slug' => Str::slug($product->name . '-' . $product->id),
        ]);
        return response()->json(['message' => 'Товар добавлен', 'id' => $product->id], 201);
    }
}
