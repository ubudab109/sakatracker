import React, { Fragment } from "react";

export default function GeneratedRfp(props) {

    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const tesMonth = new Intl.DateTimeFormat('en', { month: 'short' }).format(date.getMonth() + 1);
        const year = date.getFullYear();

        return `${day}-${tesMonth}-${year}`;
    }

    return (
        <Fragment>
            <div className="pt-3" ref={props.ref}>
                <div className="">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                        <div className='text-center mb-6'>
                            <h1 className='text-3xl font-bold'>REQUEST FOR PAYMENT</h1>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 font-semibold'>
                            {/* LEFT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Type</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].invoice_type: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier Number</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].supp_code: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier Name</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].supp_name: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier NPWP</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].supp_npwp: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier Site</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].supp_site: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Pay Group</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].pay_group: ''}</p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>Page</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>1 of 1</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Printed Date</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.printed_date}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>User Created</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].user_created: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>PO TYPE</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].po_type: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Due Date</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].invoice_due_date: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Currency</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].invoice_currency: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Total Amount</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  formatter.format(parseInt(props.data.total_debit) - parseInt(props.data.total_credit)).replace("€", "").trim(): ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='mb-3'></hr>
                        <div className='grid grid-cols-1 md:grid-cols-2 font-semibold'>
                            {/* LEFT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>RFP Number</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ? props.data.outstanding_invoice[0].rfp_number : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Voucher Number</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].voucher_number: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Batch Name</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].invoice_batch_name: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Number</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].invoice_number: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Date</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].invoice_date: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>File Faktur Pajak</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <div className='flex'>
                                            <p className='flex'>
                                                {props.data.invoice.tax_invoice != null ? 1 : 0} Berkas
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>File Invoice</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <div className='flex'>
                                            <p className='flex'>
                                                {props.data.invoice.invoice != null ? 1 : 0} Berkas
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>File BAST</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <div className='flex'>
                                            <p className='flex'>
                                                {props.data.invoice.bast != null ? 1 : 0} Berkas
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>File Quotation</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <div className='flex'>
                                            <p className='flex'>
                                                {props.data.invoice.quotation != null ? 1 : 0} Berkas
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {props.data.invoice.is_po == 1 ?
                                    <div className='grid grid-cols-2'>
                                        <p>File PO</p>
                                        <div className='flex'>
                                            <p style={{ width: '24px' }}>:</p>
                                            <div className='flex'>
                                                <p className='flex'>
                                                    {props.data.invoice.po != null ? 1 : 0} Berkas
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    : ''}
                                <div className='grid grid-cols-2'>
                                    <p>Lampiran Lainnya</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p className='flex'>
                                            {props.data.invoice.exchange_invoice_attachments != null ? props.data.invoice.exchange_invoice_attachments.length : 0} Berkas
                                        </p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Description</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].invoice_description: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Activity Code</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p></p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Status</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].invoice_status: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Bank Name</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.invoice.vendor ? props.data.invoice.vendor.bank_name : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Account Name</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.invoice.vendor ? props.data.invoice.vendor.bank_account_name : ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Bank Account Number</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.invoice.vendor ? props.data.invoice.vendor.bank_account_number : ''}</p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>GL Date</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  formatDate(props.data.outstanding_invoice[0].gl_date): ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Invoice Receipt Date</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  formatDate(props.data.outstanding_invoice[0].invoice_receipt_date): ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Supplier Tax Invoice Num</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].supp_tax_invoice_num: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Due Date Determination Reason</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p></p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Rate Type</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].rate_type: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Rate Date</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  formatDate(props.data.outstanding_invoice[0].rate_date): ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Tax Name</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].supp_name: ''}</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2'>
                                    <p>Tax NPWP</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ?  props.data.outstanding_invoice[0].tax_npwp: ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-3'>
                            <table className="table table-xs text-center p-0">
                                <thead>
                                    <tr>
                                        <th className='border-2' rowSpan={2}>GL Date <br></br>Distribution</th>
                                        <th className='border-2' rowSpan={2}>Account</th>
                                        <th className='border-2' rowSpan={2}>Description</th>
                                        <th className='border-2' colSpan={2}>Entered Amount ({props.data.outstanding_invoice.length > 0 ? props.data.outstanding_invoice[0].invoice_currency : ''})</th>
                                        <th className='border-2' colSpan={2}>Accounted Amount (IDR)</th>
                                    </tr>
                                    <tr>
                                        <th className='border-2'>D</th>
                                        <th className='border-2'>C</th>
                                        <th className='border-2'>D</th>
                                        <th className='border-2'>C</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.outstanding_invoice.length > 0 ? 
                                        <tr>
                                            <td className='border-2'>{formatDate(props.data.outstanding_invoice[0].gl_date_dist)}</td>
                                            <td className='border-2 text-start'>{props.data.outstanding_invoice[0].tax_account}</td>
                                            <td className='border-2 text-start'>{props.data.outstanding_invoice[0].tax_code}</td>
                                            <td className='border-2'>{formatter.format(parseInt(props.data.outstanding_invoice[0].tax_amount)).replace("€", "").trim()}</td>
                                            <td className='border-2'></td>
                                            <td className='border-2'>{formatter.format(parseInt(props.data.outstanding_invoice[0].tax_amount)).replace("€", "").trim()}</td>
                                            <td className='border-2'></td>
                                        </tr>
                                       : ''}
                                    {props.data.outstanding_invoice.length > 0 ? 
                                        <>
                                            {props.data.outstanding_invoice.map((data, index) => (
                                                <tr>
                                                    <td className='border-2'>{formatDate(data.gl_date_dist)}</td>
                                                    <td className='border-2 text-start'>{data.account_dist}</td>
                                                    <td className='border-2 text-start'>{data.description_dist}</td>
                                                    <td className='border-2'>
                                                        {parseInt(data.amount_dist) > 0 ? formatter.format(parseInt(data.amount_dist)).replace("€", "").trim() : ''}
                                                    </td>
                                                    <td className='border-2'>
                                                        {parseInt(data.amount_dist) < 0 ? formatter.format(parseInt(data.amount_dist)).replace("€", "").trim() : ''}
                                                    </td>
                                                    <td className='border-2'>
                                                        {parseInt(data.amount_dist) > 0 ? formatter.format(parseInt(data.amount_dist)).replace("€", "").trim() : ''}
                                                    </td>
                                                    <td className='border-2'>
                                                        {parseInt(data.amount_dist) < 0 ? formatter.format(parseInt(data.amount_dist)).replace("€", "").trim() : ''}
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                       : ''}
                                    {props.data.outstanding_invoice.length > 0 ? 
                                        <tr>
                                            <td className='border-2'>{formatDate(props.data.outstanding_invoice[0].gl_date_dist)}</td>
                                            <td className='border-2 text-start'>{props.data.outstanding_invoice[0].ap_account}</td>
                                            <td className='border-2 text-start'>{props.data.outstanding_invoice[0].description_dist}</td>
                                            <td className='border-2'></td>
                                            <td className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</td>
                                            <td className='border-2'></td>
                                            <td className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</td>
                                        </tr>
                                       : ''}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className='border-2' colSpan={3}>TOTAL</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_credit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_credit)).replace("€", "").trim()}</th>
                                    </tr>
                                    <tr>
                                        <th className='border-2' colSpan={3}>Amount Remaining</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_credit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim()}</th>
                                        <th className='border-2'>{formatter.format(parseInt(props.data.total_credit)).replace("€", "").trim()}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className='mt-3'>
                            <table className="table table-xs text-center p-0">
                                <thead>
                                    <tr>
                                        <th className='border-2'>PO Num/IR <br></br>Number</th>
                                        <th className='border-2'>Receipt Num- <br></br>Line</th>
                                        <th className='border-2'>Item Code</th>
                                        <th className='border-2'>Billed <br></br> Quantity</th>
                                        <th className='border-2'>UOM</th>
                                        <th className='border-2'>Unit Price</th>
                                        <th className='border-2'>PO Account</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.data.outstanding_invoice.length > 0 ? 
                                        <>
                                            {props.data.outstanding_invoice.map((data, index) => (
                                                <>
                                                    {data.po_number ?
                                                        <tr>
                                                            <td className='border-2'>{data.po_number}</td>
                                                            <td className='border-2'>{data.receipt_num_line}</td>
                                                            <td className='border-2'>{data.item_code}</td>
                                                            <td className='border-2'>{data.billed_qty}</td>
                                                            <td className='border-2'>{data.uom}</td>
                                                            <td className='border-2'>{data.unit_price}</td>
                                                            <td className='border-2'>{data.po_account}</td>
                                                        </tr>
                                                        : ''}
                                                </>
                                            ))}
                                        </>
                                       : ''}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className='border-2' colSpan={2}>Reference :</th>
                                        <th className='border-2' colSpan={3}>FUI Num :</th>
                                        <th className='border-2' colSpan={2}>Landed Cost :</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 font-semibold'>
                            {/* LEFT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p>Grand Total Amount Remaining IDR</p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ? formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim() : ''}</p>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT */}
                            <div>
                                <div className='grid grid-cols-2'>
                                    <p></p>
                                    <div className='flex'>
                                        <p style={{ width: '24px' }}>:</p>
                                        <p>{props.data.outstanding_invoice.length > 0 ? formatter.format(parseInt(props.data.total_debit)).replace("€", "").trim() : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-3'>
                            <table className="table table-xs text-center p-0">
                                <thead>
                                    <tr>
                                        <th className='border-t-2 border-s-2 text-start' colSpan={2}>Paid From:</th>
                                        <th className='border-t-2 text-start' colSpan={3}>Lorem Ipsum</th>
                                        <th className='border-t-2 text-start' colSpan={2}>Received By:</th>
                                        <th className='border-t-2 border-e-2 text-start' colSpan={3}>Lorem Ipsum</th>
                                    </tr>
                                    <tr>
                                        <th className='border-b-2 border-s-2 text-start' colSpan={2}>Paid To:</th>
                                        <th className='border-b-2 text-start' colSpan={3}>Lorem Ipsum</th>
                                        <th className='border-b-2 text-start' colSpan={2}>Date:</th>
                                        <th className='border-b-2 border-e-2 text-start' colSpan={3}>29-AUG-23</th>
                                    </tr>
                                    <tr>
                                        <th className='border-2' colSpan={2}>Department <br></br> Requestor</th>
                                        <th className='border-2' colSpan={2}>Director</th>
                                        <th className='border-2' colSpan={2}>Tax</th>
                                        <th className='border-2' colSpan={2}>Accounting</th>
                                        <th className='border-2' colSpan={2}>Finance</th>
                                    </tr>
                                    <tr>
                                        <th className='border-2'>Issued By</th>
                                        <th className='border-2'>Approved By</th>
                                        <th className='border-2'>Approver By</th>
                                        <th className='border-2'>Checked By</th>
                                        <th className='border-2'>Approved By</th>
                                        <th className='border-2'>Coded By</th>
                                        <th className='border-2'>Checked By</th>
                                        <th className='border-2'>Approved By</th>
                                        <th className='border-2'>Passed for payment</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                        <td className='border-2'></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
