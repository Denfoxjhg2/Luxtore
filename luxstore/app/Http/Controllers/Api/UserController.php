<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\Order_item;
use App\Models\Review;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function purchase(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|string',
            'address' => 'required|string',
            'phone' => 'required|string',
            'payment_method' => 'required|string',
            'total_amount' => 'required|int',
        ]);

        $order = Order::create([
            'user_id' => $user->id,
            'shipping_address' => $validated['address'],
            'status' => 'Обрабатывается',
            'payment_method' => $validated['payment_method'],
            'total_amount' => $validated['total_amount'],
        ]);

        foreach ($request->items as $item) {
            Order_item::create([
                'order_id' => $order->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }
        return response()->json(['order_id' => $order->id], 201);
    }
    public function getUserOrders()
    {
        $user = Auth::user();
        return response()->json(
            $user->orders()->with('items.product')->latest()->get()
        );
    }
    public function cancelOrder(Request $request)
    {
        $order = Order::findOrFail($request->orderId);
        $order->status = 'Отменён';
        $order->save();
        return response()->json(['message' => 'Заказ отменен'], 200);
    }
    public function createReview(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'product_id' => 'required|int|exists:products,id',
            'rating' => 'required|int|min:1|max:5',
            'comment' => 'required|string',
        ]);
        $review = Review::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);
        return response()->json(['message' => 'Отзыв успешно создан'], 201);
    }
}
