<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function categories()
    {
        return $this->belongsTo(Category::class);
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class);
    }
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function averageRating()
    {
        return $this->reviews()->avg('rating');
    }
}
