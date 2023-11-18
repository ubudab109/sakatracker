<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <p>{{ $title }}</p>
        <p>{{ $description }}</p>
        <a href="{{ url('/') . $url }}">
            <button>Lihat</button>
        </a>
    </body>
</html>