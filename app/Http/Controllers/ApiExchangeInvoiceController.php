<?php

namespace App\Http\Controllers;

use App\Models\OraclePurchaseOrderDetail;
use App\Models\OracleGoodReceiptDetail;
use App\Models\OracleOutstandingInvoice;
use Illuminate\Http\Request;

class ApiExchangeInvoiceController extends Controller
{
    public function purchaseOrderDetail (Request $request) {
        $data['datas'] = OracleGoodReceiptDetail::where('po_header_id', $request->order_id)->get()
        ->map(function($item){
            $item['array'] = OracleGoodReceiptDetail::with('good_receipt.good_receipt_detail', 'purchase_order_detail')->where('shipment_header_id', $item->shipment_header_id)->whereHas('good_receipt', function($q) use($item){
                $q->where('receipt_num', $item->good_receipt->receipt_num);
            })->get();

            return $item;
        });

        $data['datas'] = $data['datas']->unique('po_header_id', 'po_line_id');

        return response()->json($data);
    }
	
	public function rfp(Request $request)
	{
        $data['outstanding_invoice'] = OracleOutstandingInvoice::with('rfp_views')->where('invoice_num', urldecode($request->invoice_number))->first();

        $data['total_debit'] = $data['outstanding_invoice']->tax_amount ?? 0;
        $data['total_credit'] = $data['outstanding_invoice']->total_amount ?? 0;
        
        if($data['outstanding_invoice'])
        {
            foreach($data['outstanding_invoice']->rfp_views as $rfp_view)
            {
                if((int)$rfp_view->amount_dist > 0)
                {
                    $data['total_debit'] += $rfp_view->amount_dist;
                } else {
                    $data['total_credit'] += $rfp_view->amount_dist;
                }
            }
        }

        $data['printed_date'] = date('d-m-Y H:i:s');
		
	 	return response()->json($data);
	}
}

