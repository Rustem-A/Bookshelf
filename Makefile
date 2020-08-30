install:
	 composer install && composer update
	 npm install
	 touch database/database.sqlite && cp .env.example .env
	 php artisan key:generate
	 php artisan migrate:fresh
	 php artisan db:seed --class=AuthorsBooksTableSeeder
	 composer dump-autoload
	 npm run dev
	 php artisan serve
push:
	git push -u origin master