<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = ['name', 'information'];
    
    public function books()
    {
        return $this->belongsToMany('App\Book');
    }
}
