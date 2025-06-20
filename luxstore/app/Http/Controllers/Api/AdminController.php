<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use App\Models\Order;

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
        $nameImg = $uniqName . '.' . $typeImg;
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
            'slug' => Str::slug($validated['name']),
        ]);
        return response()->json(['message' => 'Товар добавлен', 'id' => $product->id], 201);
    }

    public function addCategory (Request $request) 
    {
        $validated = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]);
        $category = Category::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'slug' => Str::slug($validated['name']),
        ]);
        return response()->json(['message' => 'Товар добавлен', 'id' => $category->id], 201);
    }

    public function getAllOrders ()
    {
        $orders = Order::with('items.product', 'user')->latest()->get();
    return response()->json($orders);
    }
    public function updateStatus (Request $request)
    {
        $order = Order::findOrFail($request->id);
        $order->status = $request->status;
        $order->save();
        return response()->json(['message' => 'Статус заказа успешно изменен'], 200);
    }
}
