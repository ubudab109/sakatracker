<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiDashboardController;
use App\Http\Controllers\ApiExchangeInvoiceController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/check-first-login', [ApiDashboardController::class, 'checkFirstLogin']);
Route::get('/purchase-order-detail', [ApiExchangeInvoiceController::class, 'purchaseOrderDetail']);
Route::get('/rfp', [ApiExchangeInvoiceController::class, 'rfp']);

