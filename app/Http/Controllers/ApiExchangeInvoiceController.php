<?php

namespace App\Http\Controllers;

use App\Models\OraclePurchaseOrderDetail;
use App\Models\OracleGoodReceiptDetail;
use App\Models\OracleOutstandingInvoice;
use App\Models\OracleRfpView;
use Illuminate\Http\Request;

class ApiExchangeInvoiceController extends Controller
{
    public function purchaseOrderDetail (Request $request) {
        $data['datas'] = OracleGoodReceiptDetail::where('po_header_id', $request->order_id)
		->get()
        ->map(function($item) use($request){
            $item['array'] = OracleGoodReceiptDetail::with('good_receipt.good_receipt_detail', 'purchase_order_detail')
				// ->where('shipment_header_id', $item->shipment_header_id)
				->whereHas('good_receipt', function($q) use($item){
					$q->where('receipt_num', $item->good_receipt->receipt_num);
				})
				// ->where('po_header_id', $request->order_id)
			->get()
			->map(function($array){
				$array['tax'] = ($array['purchase_order_detail']['unit_price'] * $array['qty_received']) * (int)$array['purchase_order_detail']['tax_rate']/100;
				$array['sub_total'] = $array['purchase_order_detail']['unit_price'] * $array['qty_received'];
				
				return $array;
			});
			
			$item['receipt_num'] = $item->good_receipt->receipt_num;

            return $item;
        });
		
		$data['datas'] = $data['datas']->unique('receipt_num')->values();
		
        return response()->json($data);
    }
	
	public function rfp(Request $request)
		{
			$data['outstanding_invoice'] = OracleRfpView::where('invoice_number', (string)$request->invoice_number)->get();
			$data['api'] = 'baru';

			$data['total_debit'] = 0;
			$data['total_credit'] = 0;

			if($data['outstanding_invoice'])
			{
				foreach($data['outstanding_invoice'] as $rfp_view)
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


