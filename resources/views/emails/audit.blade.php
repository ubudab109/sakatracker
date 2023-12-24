<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <p>Kepada Yth.</p>
        <p>Bapak/Ibu {{ $user->name ?? '' }}!</p>
        <p>Terima kasih telah mendaftarkan perusahaan anda bersama kami</p>
        <p>Data Vendor Anda ({{$vendor->name}}) telah melebihi satu tahun batas audit. Harap perbaruin data Anda </p>
    </body>
</html>