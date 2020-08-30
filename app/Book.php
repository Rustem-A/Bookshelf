<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = ['title', 'price'];
    
    public function authors()
    {
        return $this->belongsToMany('App\Author');
    }
}
