## Pré-requisitos para o funcionamento do projeto de forma local

Como pré-requisito para o funcionamento do projeto são necessárias as instalações:

- [PHP 8.X](https://www.php.net/manual/en/faq.installation).
- [Composer](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-macos).
- MySQL ou MariaDB

## Passos para a instalação e funcionamento do projeto

A partir do sistema operacional escolhido abra um terminal e siga os passos abaixo:

<b>Passo 1:</b> clone o repositório

<b>git clone [https://github.com/niviaguilherme/person-laravel.git](https://github.com/niviaguilherme/person-laravel)</b>

<b>Passo 2:</b> instale os arquivos necessários para o projeto a partir do composer

<b>composer install</b>

<b>Passo 3:</b> gere uma nova chave para que o Laravel funcione

<b>php artisan key:generate</b>

<b>Passo 4:</b> configure o banco de dados no projeto

Primeiramente, acesso o banco de dados e crie um novo schema com o nome de sua preferência. Dentro da pasta do projeto clonado há um arquivo chamado <b>.env.example</b>. Você deve renomar esse arquivo para <b>.env</b>. No arquivo .env há todas as configurações do projeto. É nesse arquivo que se encontram as configurações para acesso ao banco de dados. Edite esse arquivos e coloque os dados do schema que você acabou de criar.

DB_HOST= host do banco de dados<BR>
DB_PORT= porta do banco de dados<BR>
DB_DATABASE= nome do banco de dados<BR>
DB_USERNAME= usuário para acesso ao banco de dados<BR>
DB_PASSWORD= senha do banco de dados<BR>

<b>Passo 5:</b> crie as estruturas das tabelas

<b>php artisan migrate</b>

<b>Passo 6:</b> popule as tabelas criadas

<b>php artisan db:seed</b>

<b>Passo 7:</b> suba o servidor para a API

<b>php artisan serve</b>

Por padrão o servidor local estará configurado para http://127.0.0.1:8000. 
