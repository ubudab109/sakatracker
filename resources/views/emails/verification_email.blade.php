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
        <br>
        <a href="{{route('verification-email', ['code' => $otp_code, 'email' => $user->email])}}" target="_blank">Klik Disini Untuk Konfirmasi</a>
    </body>
</html>