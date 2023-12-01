<?php

use App\Http\Controllers\AdminRequestGoodReceiptController;
use App\Http\Controllers\AdminExchangeInvoiceController;
use App\Http\Controllers\ApproverInvoiceItemController;
use App\Http\Controllers\AdminVendorProfileController;
use App\Http\Controllers\CheckStatusAccountController;
use App\Http\Controllers\RequestGoodReceiptController;
use App\Http\Controllers\RegisterAccountController;
use App\Http\Controllers\ApproverInvoiceController;
use App\Http\Controllers\ApproverPaymentController;
use App\Http\Controllers\ExchangeInvoiceController;
use App\Http\Controllers\ApproverVendorController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\AdminMatchingController;
use App\Http\Controllers\VendorReportController;
use App\Http\Controllers\AdminVendorController;
use App\Http\Controllers\PaymentTermController;
use App\Http\Controllers\MasterUserController;
use App\Http\Controllers\SlaWeekendController;
use App\Http\Controllers\SlaHolidayController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\OtpCodeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\SignUpController;
use App\Http\Controllers\PrefixController;
use App\Http\Controllers\SuffixController;
use App\Http\Controllers\ShipToController;
use App\Http\Controllers\BillToController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DemoController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\TaxController;
use App\Http\Controllers\VendorSLAController;
use App\Http\Controllers\InvoiceSLAController;
use App\Http\Controllers\PaymentSLAController;
use App\Http\Controllers\SummaryVendorSLAController;
use App\Http\Controllers\SummaryInvoiceSLAController;
use App\Http\Controllers\SummaryPaymentSLAController;
use App\Http\Controllers\BatchPaymentController;
use App\Http\Controllers\SiapBayarController;
use App\Http\Controllers\ReportController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('HomePage', [
//         'title' => 'Home',
//         'description' => 'Ini Deskripsi Page ini'
//     ]);
// });

Route::get('/welcome1', function () {
    return view('welcome');
});

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::get('/pdfview', [DashboardController::class, 'pdfviewer']);
Route::post('/pdfview', [DashboardController::class, 'pdfviewerpost']);

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/get-country', [CountryController::class, 'index'])->name('get-country');

Route::get('/get-state', [StateController::class, 'index'])->name('get-state');

Route::get('/get-city', [CityController::class, 'index'])->name('get-city');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/sign-up', [SignUpController::class, 'index'])->name('sign-up');

Route::get('/verification-email', [OtpCodeController::class, 'index'])->name('verification-email');

Route::any('/verification-email', [OtpCodeController::class, 'store'])->name('verification-email.store');

Route::post('/verification-email/resend-otp', [OtpCodeController::class, 'resendOtp'])->name('verification-email.resend-otp');


Route::middleware('auth')->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/create', [AdminController::class, 'create'])->name('admin.create');
    Route::post('/admin', [AdminController::class, 'store'])->name('admin.store');
    Route::get('/admin/{id}/edit', [AdminController::class, 'edit'])->name('admin.edit');
    Route::post('/admin/update/{id}', [AdminController::class, 'update'])->name('admin.update');
    Route::delete('/admin/{id}/destroy', [AdminController::class, 'destroy'])->name('admin.destroy');

    Route::get('/approver', [ApprovalController::class, 'index'])->name('approver.index');
    Route::get('/approver/create', [ApprovalController::class, 'create'])->name('approver.create');
    Route::post('/approver', [ApprovalController::class, 'store'])->name('approver.store');
    Route::get('/approver/{id}/edit', [ApprovalController::class, 'edit'])->name('approver.edit');
    Route::post('/approver/update/{id}', [ApprovalController::class, 'update'])->name('approver.update');
    Route::delete('/approver/{id}/destroy', [ApprovalController::class, 'destroy'])->name('approver.destroy');

    Route::get('/master-user', [MasterUserController::class, 'index'])->name('master-user.index');
    Route::get('/master-user/create', [MasterUserController::class, 'create'])->name('master-user.create');
    Route::post('/master-user', [MasterUserController::class, 'store'])->name('master-user.store');
    Route::get('/master-user/{id}/edit', [MasterUserController::class, 'edit'])->name('master-user.edit');
    Route::post('/master-user/update/{id}', [MasterUserController::class, 'update'])->name('master-user.update');
    Route::delete('/master-user/{id}/destroy', [MasterUserController::class, 'destroy'])->name('master-user.destroy');

    Route::get('/role', [RoleController::class, 'index'])->name('role.index');
    Route::get('/role/create', [RoleController::class, 'create'])->name('role.create');
    Route::post('/role', [RoleController::class, 'store'])->name('role.store');
    Route::get('/role/{id}/edit', [RoleController::class, 'edit'])->name('role.edit');
    Route::post('/role/update/{id}', [RoleController::class, 'update'])->name('role.update');
    Route::delete('/role/{id}/destroy', [RoleController::class, 'destroy'])->name('role.destroy');

    Route::get('/suffix', [SuffixController::class, 'index'])->name('suffix.index');
    Route::get('/suffix/create', [SuffixController::class, 'create'])->name('suffix.create');
    Route::post('/suffix', [SuffixController::class, 'store'])->name('suffix.store');
    Route::get('/suffix/{id}/edit', [SuffixController::class, 'edit'])->name('suffix.edit');
    Route::post('/suffix/update/{id}', [SuffixController::class, 'update'])->name('suffix.update');
    Route::delete('/suffix/{id}/destroy', [SuffixController::class, 'destroy'])->name('suffix.destroy');

    Route::get('/prefix', [PrefixController::class, 'index'])->name('prefix.index');
    Route::get('/prefix/create', [PrefixController::class, 'create'])->name('prefix.create');
    Route::post('/prefix', [PrefixController::class, 'store'])->name('prefix.store');
    Route::get('/prefix/{id}/edit', [PrefixController::class, 'edit'])->name('prefix.edit');
    Route::post('/prefix/update/{id}', [PrefixController::class, 'update'])->name('prefix.update');
    Route::delete('/prefix/{id}/destroy', [PrefixController::class, 'destroy'])->name('prefix.destroy');

    Route::get('/ship-to', [ShipToController::class, 'index'])->name('ship-to.index');
    Route::get('/ship-to/create', [ShipToController::class, 'create'])->name('ship-to.create');
    Route::post('/ship-to', [ShipToController::class, 'store'])->name('ship-to.store');
    Route::get('/ship-to/{id}/edit', [ShipToController::class, 'edit'])->name('ship-to.edit');
    Route::post('/ship-to/update/{id}', [ShipToController::class, 'update'])->name('ship-to.update');
    Route::delete('/ship-to/{id}/destroy', [ShipToController::class, 'destroy'])->name('ship-to.destroy');

    Route::get('/bill-to', [BillToController::class, 'index'])->name('bill-to.index');
    Route::get('/bill-to/create', [BillToController::class, 'create'])->name('bill-to.create');
    Route::post('/bill-to', [BillToController::class, 'store'])->name('bill-to.store');
    Route::get('/bill-to/{id}/edit', [BillToController::class, 'edit'])->name('bill-to.edit');
    Route::post('/bill-to/update/{id}', [BillToController::class, 'update'])->name('bill-to.update');
    Route::delete('/bill-to/{id}/destroy', [BillToController::class, 'destroy'])->name('bill-to.destroy');

    Route::get('/vendor/company-profile', [CompanyProfileController::class, 'index'])->name('vendor.company-profile.index');

    Route::get('/vendor/report', [VendorReportController::class, 'index'])->name('vendor.report.index');

    Route::get('/vendor/outstanding-purchase-order', [VendorReportController::class, 'showOutstandingPurchaseOrder'])->name('vendor.outstanding-purchase-order.index');

    Route::get('/vendor', [VendorController::class, 'index'])->name('vendor.index');
    Route::get('/vendor/create', [VendorController::class, 'create'])->name('vendor.create');
    Route::post('/vendor', [VendorController::class, 'store'])->name('vendor.store');
    Route::get('/vendor/{id}/edit', [VendorController::class, 'edit'])->name('vendor.edit');
    Route::post('/vendor/{id}', [VendorController::class, 'update'])->name('vendor.update');
    Route::get('/vendor/{id}', [VendorController::class, 'show'])->name('vendor.show');

    Route::get('/tax', [TaxController::class, 'index'])->name('tax.index');
    Route::get('/tax/create', [TaxController::class, 'create'])->name('tax.create');
    Route::post('/tax', [TaxController::class, 'store'])->name('tax.store');
    Route::get('/tax/{id}/edit', [TaxController::class, 'edit'])->name('tax.edit');
    Route::post('/tax/{id}', [TaxController::class, 'update'])->name('tax.update');
    Route::delete('/tax/{id}/destroy', [TaxController::class, 'destroy'])->name('tax.destroy');

    Route::get('/payment-term', [PaymentTermController::class, 'index'])->name('payment-term.index');
    Route::get('/payment-term/create', [PaymentTermController::class, 'create'])->name('payment-term.create');
    Route::post('/payment-term', [PaymentTermController::class, 'store'])->name('payment-term.store');
    Route::get('/payment-term/{id}/edit', [PaymentTermController::class, 'edit'])->name('payment-term.edit');
    Route::post('/payment-term/{id}', [PaymentTermController::class, 'update'])->name('payment-term.update');
    Route::delete('/payment-term/{id}/destroy', [PaymentTermController::class, 'destroy'])->name('payment-term.destroy');

    Route::get('/approver-vendor', [ApproverVendorController::class, 'index'])->name('approver-vendor.index');
    Route::get('/approver-vendor/create', [ApproverVendorController::class, 'create'])->name('approver-vendor.create');
    Route::post('/approver-vendor', [ApproverVendorController::class, 'store'])->name('approver-vendor.store');
    Route::get('/approver-vendor/{id}/edit', [ApproverVendorController::class, 'edit'])->name('approver-vendor.edit');
    Route::post('/approver-vendor/{id}', [ApproverVendorController::class, 'update'])->name('approver-vendor.update');
    Route::delete('/approver-vendor/{id}/destroy', [ApproverVendorController::class, 'destroy'])->name('approver-vendor.destroy');
    Route::post('/approver-vendor/{id}/swap-level', [ApproverVendorController::class, 'swapLevel'])->name('approver-vendor.swap-level');

    Route::get('/approver-invoice', [ApproverInvoiceController::class, 'index'])->name('approver-invoice.index');
    Route::get('/approver-invoice/create', [ApproverInvoiceController::class, 'create'])->name('approver-invoice.create');
    Route::post('/approver-invoice', [ApproverInvoiceController::class, 'store'])->name('approver-invoice.store');
    Route::get('/approver-invoice/{id}', [ApproverInvoiceController::class, 'show'])->name('approver-invoice.show');
    Route::get('/approver-invoice/{id}/edit', [ApproverInvoiceController::class, 'edit'])->name('approver-invoice.edit');
    Route::post('/approver-invoice/{id}', [ApproverInvoiceController::class, 'update'])->name('approver-invoice.update');
    Route::delete('/approver-invoice/{id}/destroy', [ApproverInvoiceController::class, 'destroy'])->name('approver-invoice.destroy');

    Route::get('/approver-invoice-item', [ApproverInvoiceItemController::class, 'index'])->name('approver-invoice-item.index');
    Route::get('/approver-invoice-item/create', [ApproverInvoiceItemController::class, 'create'])->name('approver-invoice-item.create');
    Route::post('/approver-invoice-item', [ApproverInvoiceItemController::class, 'store'])->name('approver-invoice-item.store');
    Route::get('/approver-invoice-item/{id}/edit', [ApproverInvoiceItemController::class, 'edit'])->name('approver-invoice-item.edit');
    Route::post('/approver-invoice-item/{id}', [ApproverInvoiceItemController::class, 'update'])->name('approver-invoice-item.update');
    Route::delete('/approver-invoice-item/{id}/destroy', [ApproverInvoiceItemController::class, 'destroy'])->name('approver-invoice-item.destroy');
    Route::post('/approver-invoice-item/{id}/swap-level', [ApproverInvoiceItemController::class, 'swapLevel'])->name('approver-invoice-item.swap-level');

    Route::get('/approver-payment', [ApproverPaymentController::class, 'index'])->name('approver-payment.index');
    Route::get('/approver-payment/create', [ApproverPaymentController::class, 'create'])->name('approver-payment.create');
    Route::post('/approver-payment', [ApproverPaymentController::class, 'store'])->name('approver-payment.store');
    Route::get('/approver-payment/{id}/edit', [ApproverPaymentController::class, 'edit'])->name('approver-payment.edit');
    Route::post('/approver-payment/{id}', [ApproverPaymentController::class, 'update'])->name('approver-payment.update');
    Route::delete('/approver-payment/{id}/destroy', [ApproverPaymentController::class, 'destroy'])->name('approver-payment.destroy');
    Route::post('/approver-payment/{id}/swap-level', [ApproverPaymentController::class, 'swapLevel'])->name('approver-payment.swap-level');

    Route::get('/admin/vendor', [AdminVendorController::class, 'index'])->name('admin.vendor.index');
    Route::get('/admin/vendor/{id}', [AdminVendorController::class, 'show'])->name('admin.vendor.show');
    Route::post('/admin/vendor/{id}/anotation/save', [AdminVendorController::class, 'saveAnotation'])->name('admin.vendor.anotation.save');

    Route::get('/admin/vendor-profile/', [AdminVendorProfileController::class, 'index'])->name('admin.vendor-profile.index');
    Route::get('/admin/vendor-profile/{id}', [AdminVendorProfileController::class, 'edit'])->name('admin.vendor-profile.edit');
    Route::post('/admin/vendor-profile/{id}', [AdminVendorProfileController::class, 'update'])->name('admin.vendor-profile.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile-vendor-payment', [ProfileController::class, 'updateVendorPayment'])->name('profile.updateVendorPayment');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/exchange-invoice', [ExchangeInvoiceController::class, 'index'])->name('exchange-invoice.index');
    Route::get('/exchange-invoice/create', [ExchangeInvoiceController::class, 'create'])->name('exchange-invoice.create');
    Route::post('/exchange-invoice', [ExchangeInvoiceController::class, 'store'])->name('exchange-invoice.store');
    Route::get('/exchange-invoice/{id}', [ExchangeInvoiceController::class, 'show'])->name('exchange-invoice.show');
    Route::get('/exchange-invoice/{id}/edit', [ExchangeInvoiceController::class, 'edit'])->name('exchange-invoice.edit');
    Route::post('/exchange-invoice/{id}', [ExchangeInvoiceController::class, 'update'])->name('exchange-invoice.update');

    Route::get('/admin/exchange-invoice/', [AdminExchangeInvoiceController::class, 'index'])->name('admin.exchange-invoice.index');
    Route::get('/admin/exchange-invoice/{id}', [AdminExchangeInvoiceController::class, 'show'])->name('admin.exchange-invoice.show');
    Route::get('/admin/exchange-invoice/{id}/rfp', [AdminExchangeInvoiceController::class, 'showRfp'])->name('admin.exchange-invoice.show-rfp');
    Route::post('/admin/exchange-invoice/{id}', [AdminExchangeInvoiceController::class, 'update'])->name('admin.exchange-invoice.update');

    Route::get('/admin/matching/', [AdminMatchingController::class, 'index'])->name('admin.matching.index');
    Route::post('/admin/matching/{id}', [AdminMatchingController::class, 'update'])->name('admin.matching.update');

    Route::get('/admin/sla-calendar/', [SlaWeekendController::class, 'index'])->name('admin.sla-calendar.index');

    Route::post('/admin/sla-weekend/', [SlaWeekendController::class, 'store'])->name('admin.sla-weekend.store');
    
    Route::post('/admin/import/sla-holiday', [SlaHolidayController::class, 'import'])->name('admin.sla-holiday.import');
    Route::get('/admin/sla-holiday/', [SlaHolidayController::class, 'create'])->name('admin.sla-holiday.create');
    Route::post('/admin/sla-holiday/', [SlaHolidayController::class, 'store'])->name('admin.sla-holiday.store');
    Route::get('/admin/sla-holiday/{id}/edit', [SlaHolidayController::class, 'edit'])->name('admin.sla-holiday.edit');
    Route::post('/admin/sla-holiday/{id}', [SlaHolidayController::class, 'update'])->name('admin.sla-holiday.update');
    Route::delete('/admin/sla-holiday/{id}/destroy', [SlaHolidayController::class, 'destroy'])->name('admin.sla-holiday.destroy');
	
    // Update Syafiq Freelance
    Route::get('/admin/monitoring-sla/vendor', [VendorSLAController::class, 'index'])->name('admin.monitoring-sla.vendor.index');;
    Route::get('/admin/monitoring-sla/invoice', [InvoiceSLAController::class, 'index'])->name('admin.monitoring-sla.invoice.index');
    Route::get('/admin/monitoring-sla/payment', [PaymentSLAController::class, 'index'])->name('admin.monitoring-sla.payment.index');

    Route::get('/admin/summary-sla/vendor', [SummaryVendorSLAController::class, 'index'])->name('admin.summary-sla.vendor.index');;
    Route::get('/admin/summary-sla/invoice', [SummaryInvoiceSLAController::class, 'index'])->name('admin.summary-sla.invoice.index');
    Route::get('/admin/summary-sla/payment', [SummaryPaymentSLAController::class, 'index'])->name('admin.summary-sla.payment.index');

    //Report
    Route::get('/admin/report', [ReportController::class, 'index'])->name('admin.report.index');;
    
    // Route::get('/demo/exchange-invoice/', [DemoController::class, 'index'])->name('demo.exchange-invoice.index');
    // Route::get('/demo/exchange-invoice/create', [DemoController::class, 'create'])->name('demo.exchange-invoice.create');
    // Route::get('/demo/exchange-invoice/show', [DemoController::class, 'show'])->name('demo.exchange-invoice.show');
    // Route::get('/demo/exchange-invoice/edit', [DemoController::class, 'edit'])->name('demo.exchange-invoice.edit');

    Route::get('/admin/batch-payment', [BatchPaymentController::class, 'index'])->name('admin.batch-payment.index');
    
    Route::get('/admin/batch-payment/outstanding-invoice', [BatchPaymentController::class, 'outstandingInvoicePage'])->name('admin.batch-payment.outstanding-invoice');
    
    Route::get('/admin/batch-payment/create-batch', [BatchPaymentController::class, 'createBatchPayment'])->name('admin.batch-payment.create-batch');
    
    Route::post('/admin/batch-payment/add-invoice', [BatchPaymentController::class, 'addInvoice'])->name('admin.batch-payment.add-invoice');
    
    Route::get('/admin/batch-payment/get-invoices/{id}', [BatchPaymentController::class, 'getInvoices'])->name('admin.batch-payment.get-invoices');
    
    Route::post('/admin/batch-payment/save-draft', [BatchPaymentController::class, 'saveDraft'])->name('admin.batch-payment.save-draft');
    
    Route::post('/admin/batch-payment/save', [BatchPaymentController::class, 'saveBatchPayment'])->name('admin.batch-payment.save');
    
    Route::get('/admin/batch-payment/{id}', [BatchPaymentController::class, 'showBatchPayment'])->name('admin.batch-payment.show');
    
    Route::get('/admin/batch-payment/{id}/edit', [BatchPaymentController::class, 'updateBatchPayment'])->name('admin.batch-payment.edit');
    
    Route::get('/admin/batch-payment/{id}/delete', [BatchPaymentController::class, 'deleteBatchPayment'])->name('admin.batch-payment.delete');
    
    Route::get('/admin/batch-payment/{id}/process', [BatchPaymentController::class, 'processBatchPayment'])->name('admin.batch-payment.update');

    Route::get('/admin/batch-payment/reject/{id}', [BatchPaymentController::class, 'rejectBatchPayment'])->name('admin.batch-payment-reject');
    
    Route::get('/admin/siap-bayar', [SiapBayarController::class, 'index'])->name('admin.siap-bayar.index');

    Route::post('/admin/siap-bayar/paid', [SiapBayarController::class, 'paidInvoices'])->name('admin.siap-bayar.paid-invoices');

    Route::get('/admin/siap-bayar/{id}', [SiapBayarController::class, 'showSiapBayar'])->name('admin.siap-bayar.show');

    Route::get('/admin/siap-bayar/{id}/paid', [SiapBayarController::class, 'paidSiapBayar'])->name('admin.siap-bayar.paid');

    Route::get('/get-notifications/{id}', [DashboardController::class, 'getNotifications'])->name('notifications.get');

    Route::get('/read-notifications/{id}', [DashboardController::class, 'readNotifications'])->name('notifications.read');

    Route::get('/get-permissions', [DashboardController::class, 'getPermissions'])->name('permissions.get');

    Route::get('/request-good-receipt', [RequestGoodReceiptController::class, 'index'])->name('request-good-receipt.index');
    Route::get('/request-good-receipt/create', [RequestGoodReceiptController::class, 'create'])->name('request-good-receipt.create');
    Route::post('/request-good-receipt', [RequestGoodReceiptController::class, 'store'])->name('request-good-receipt.store');
    Route::get('/request-good-receipt/{id}/edit', [RequestGoodReceiptController::class, 'edit'])->name('request-good-receipt.edit');
    Route::post('/request-good-receipt/{id}', [RequestGoodReceiptController::class, 'update'])->name('request-good-receipt.update');
    Route::delete('/request-good-receipt/{id}/destroy', [RequestGoodReceiptController::class, 'destroy'])->name('request-good-receipt.destroy');

    Route::get('/admin/request-good-receipt', [AdminRequestGoodReceiptController::class, 'index'])->name('admin.request-good-receipt.index');
    Route::get('/admin/request-good-receipt/{id}/edit', [AdminRequestGoodReceiptController::class, 'edit'])->name('admin.request-good-receipt.edit');
    Route::post('/admin/request-good-receipt/{id}', [AdminRequestGoodReceiptController::class, 'update'])->name('admin.request-good-receipt.update');
    Route::post('/generate-rfp/{id}', [AdminExchangeInvoiceController::class, 'rfpGenerate']);
});


// Route::get('/check-status-account', [CheckStatusAccountController::class, 'index'])->name('check-status-account');

// Route::post('/check-status-account', [CheckStatusAccountController::class, 'checkStatus'])->name('check-status-account');

// Route::get('/revision-account', [CheckStatusAccountController::class, 'revisionAccount'])->name('revision-account');

// Route::get('/register-account/step-1', [RegisterAccountController::class, 'stepOne'])->name('register-account.step-1');
// Route::post('/register-account/step-1', [RegisterAccountController::class, 'stepOneStore'])->name('register-account.step-1.store');
// Route::get('/register-account/step-2', [RegisterAccountController::class, 'stepTwo'])->name('register-account.step-2');
// Route::post('/register-account/step-2', [RegisterAccountController::class, 'stepTwoStore'])->name('register-account.step-2.store');
// Route::get('/register-account/step-3', [RegisterAccountController::class, 'stepThree'])->name('register-account.step-3');
// Route::get('/register-account/step-4', [RegisterAccountController::class, 'stepFour'])->name('register-account.step-4');

require __DIR__ . '/auth.php';
