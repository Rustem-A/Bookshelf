<?php

use Illuminate\Database\Seeder;

class AuthorsBooksTableSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Author::class, 20)->create();
        factory(App\Book::class, 50)->create();
        $author = App\Author::all();
        App\Book::all()->each(function ($book) use ($author) {
            $book->authors()->attach(
                $author->random(rand(0, 3))->pluck('id')->toArray()
            );
        });
    }
}
