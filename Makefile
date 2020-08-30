install:
	 composer install && composer update
	 npm install
	 touch database/database.sqlite && cp .env.example .env
	 php artisan key:generate
	 php artisan migrate:fresh
	 npm run dev
	 php artisan serve
push:
	git push -u origin master