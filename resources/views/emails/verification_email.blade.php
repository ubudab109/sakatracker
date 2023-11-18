<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <p>Kepada Yth.</p>
        <p>Bapak/Ibu {{ $user->name ?? '' }}!</p>
        <p>Terima kasih telah mendaftarkan perusahaan anda bersama kami. silahkan lakukan konfirmasi email untuk mengaktifkan akun anda dengan memasukkan kode otp dibawah ini : </p>
        <b>OTP: {{ $otp_code }}</b>
    </body>
</html>