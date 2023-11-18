<?php

namespace App\Http\Controllers;

use App\Models\OraclePurchaseOrderDetail;
use App\Models\OracleGoodReceiptDetail;
use Illuminate\Http\Request;

class ApiExchangeInvoiceController extends Controller
{
    public function purchaseOrderDetail (Request $request) {
        $data['datas'] = OracleGoodReceiptDetail::where('shipment_header_id', $request->order_id)->get()
        ->map(function($item){
            $item['array'] = OracleGoodReceiptDetail::with('good_receipt', 'purchase_order_detail')->where('shipment_header_id', $item->shipment_header_id)->whereHas('good_receipt', function($q) use($item){
                $q->where('receipt_num', $item->good_receipt->receipt_num);
            })->get();

            return $item;
        });

        $data['datas'] = $data['datas']->unique('po_header_id', 'po_line_id');

        return response()->json($data);
    }
}
