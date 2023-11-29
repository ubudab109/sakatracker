<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Styles -->
        <style>
            .text-center {
                text-align: center;
            }

            .mb-6 {
                margin-bottom: 10px; /* You can adjust the value as needed */
            }

            .grid {
                display: grid;
                /* ... (add grid styles) */
            }

            .grid-cols-1 {
                grid-template-columns: repeat(1, minmax(0, 1fr));
                /* ... (define columns for small screens) */
            }

            .md\:grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                /* ... (define columns for medium screens and above) */
            }

            .font-bold {
                font-weight: bold;
            }

            /* Define grid styles */
            .grid {
                /* Add grid properties */
                gap: 1rem; /* Spacing between grid elements */
            }

            .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr));
                /* Define columns for the grid */
            }
            
            /* Flex and text styles */
            .flex {
                display: flex;
                /* Add flex properties */
                align-items: center; /* Align items vertically */
            }

            .text-3xl {
                font-size: 24px; /* Adjust font size for text-3xl */
            }

            .font-semibold {
                font-weight: 600; /* Or any desired font weight */
            }

            /* Layout adjustments */
            /* For responsiveness: media queries */
            @media screen and (max-width: 768px) {
                .grid-cols-2 {
                    grid-template-columns: repeat(1, minmax(0, 1fr)); /* Adjust columns for smaller screens */
                }
                /* Add other responsive adjustments as needed */
            }

            /* Margin top */
            .mt-3 {
                margin-top: 0.75rem; /* Adjust the value as needed */
            }

            /* Table styles */
            .table {
                width: 100%;
                border-collapse: collapse;
                /* Other common table styles */
            }

            .table-xs {
                font-size: 0.75rem; /* Adjust font size for 'table-xs' */
            }

            .text-center {
                text-align: center;
            }

            .p-0 {
                padding: 0;
            }

            /* Border styles */
            .border-2 {
                border: 1px solid black; /* Add border styles */
            }

            /* Table Header/Footer adjustments */
            tfoot th {
                /* Footer specific styles */
            }

            /* Table Row styles */
            tbody tr:nth-child(even) {
                /* Style for even rows */
            }

            tbody tr:nth-child(odd) {
                /* Style for odd rows */
            }

            /* Adjust column spans */
            tfoot th[colspan="2"],
            tfoot th[colspan="3"],
            tfoot th[colspan="2"] {
                /* Adjust column span styles */
            }

            p {
                margin: 5px;
                font-weight: 200;
            }

            .title {
                width: 6px !important;
            }
        </style>
    </head>
    <body class="antialiased">
    <div style="margin-top: 10px;" ref={props.ref}>
        <div class="">
            <div class="bg-white overflow-hidden shadow-lg sm:rounded-lg p-6">
                <div class='text-center mb-6'>
                    <h1 class='text-3xl font-bold'>REQUEST FOR PAYMENT</h1>
                </div>
                <table style="width: 100%;">
                    <tr>
                        <td width="20%">Invoice Type</td>
                        <td width="5%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="30%">Page</td>
                        <td width="5%" style="text-align: right;">:</td>
                        <td width="20%">1 of 1</td>
                    </tr>
                    <tr>
                        <td width="20%">Supplier Number</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Printed Date</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Supplier Name</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">User Created</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Supplier NPWP</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">PO TYPE</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Supplier Site</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Invoice Due Date</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Pay Group</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Invoice Currency</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%"></td>
                        <td width="10%" style="text-align: right;"></td>
                        <td width="20%"></td>
                        <td width="20%">Invoice Total Amount</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                </table>
                <!-- <div class='grid grid-cols-1 md:grid-cols-2 font-semibold'> -->
                    
                    <!-- <div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p class="title">Invoice Type</p>
                            <div class='flex'>
                                <p >:</p>
                                <p class="sub-title">Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Supplier Number</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Supplier Name</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Supplier NPWP</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Supplier Site</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Pay Group</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                    <!-- </div> -->

                    
                    <!-- <div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Page</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>1 of 1</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Printed Date</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>User Created</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>PO TYPE</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Invoice Due Date</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Invoice Currency</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                        <!-- <div class='grid grid-cols-2'>
                            <p>Invoice Total Amount</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div> -->
                    <!-- </div> -->
                <!-- </div> -->
                <hr class='mb-3'></hr>
                <table style="width: 100%;">
                    <tr>
                        <td width="20%">RFP Number</td>
                        <td width="5%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="30%">GL Date</td>
                        <td width="5%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Voucher Number</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Invoice Receipt Date</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Invoice Batch Name</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Supplier Tax Invoice Num</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Invoice Number</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Due Date Determination Reason</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Invoice Date</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Rate Type</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Description</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Rate Date</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Activity Code</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Tax Name</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Status</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%">Tax NPWP</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                    </tr>
                    <tr>
                        <td width="20%">Bank Name</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%"></td>
                        <td width="10%" style="text-align: right;"></td>
                        <td width="20%"></td>
                    </tr>
                    <tr>
                        <td width="20%">Account Name</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%"></td>
                        <td width="10%" style="text-align: right;"></td>
                        <td width="20%"></td>
                    </tr>
                    <tr>
                        <td width="20%">Bank Account Number</td>
                        <td width="10%" style="text-align: right;">:</td>
                        <td width="20%">Data</td>
                        <td width="20%"></td>
                        <td width="10%" style="text-align: right;"></td>
                        <td width="20%"></td>
                    </tr>
                </table>
                <!-- <div class='grid grid-cols-1 md:grid-cols-2 font-semibold'>
                    
                    <div>
                        <div class='grid grid-cols-2'>
                            <p>RFP Number</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Voucher Number</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Invoice Batch Name</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Invoice Number</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Invoice Date</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Lampiran Lainnya</p>
                            <div class='flex'>
                                <p >:</p>
                                <p class='flex'>
                                    Data
                                </p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Description</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Activity Code</p>
                            <div class='flex'>
                                <p >:</p>
                                <p></p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Status</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Bank Name</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Account Name</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Bank Account Number</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <div class='grid grid-cols-2'>
                            <p>GL Date</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Invoice Receipt Date</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Supplier Tax Invoice Num</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Due Date Determination Reason</p>
                            <div class='flex'>
                                <p >:</p>
                                <p></p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Rate Type</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Rate Date</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Tax Name</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                        <div class='grid grid-cols-2'>
                            <p>Tax NPWP</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                    </div>
                </div> -->

                <div class='mt-3'>
                    <table class="table table-xs text-center p-0">
                        <thead>
                            <tr>
                                <th class='border-2' rowspan="2">GL Date <br>Distribution</th>
                                <th class='border-2' rowspan="2">Account</th>
                                <th class='border-2' rowspan="2">Description</th>
                                <th class='border-2' colspan="2">Entered Amount (Data)</th>
                                <th class='border-2' colspan="2">Accounted Amount (IDR)</th>
                            </tr>
                            <tr>
                                <th class='border-2'>D</th>
                                <th class='border-2'>C</th>
                                <th class='border-2'>D</th>
                                <th class='border-2'>C</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td class='border-2'>Data</td>
                                    <td class='border-2 text-start'>Data</td>
                                    <td class='border-2 text-start'>Data</td>
                                    <td class='border-2'>Data</td>
                                    <td class='border-2'></td>
                                    <td class='border-2'>Data</td>
                                    <td class='border-2'></td>
                                </tr>
                                <tr>
                                    <td class='border-2'>Data</td>
                                    <td class='border-2 text-start'>Data</td>
                                    <td class='border-2 text-start'>Data</td>
                                    <td class='border-2'>
                                        Data
                                    </td>
                                    <td class='border-2'>
                                        Data
                                    </td>
                                    <td class='border-2'>
                                        Data
                                    </td>
                                    <td class='border-2'>
                                        Data
                                    </td>
                                </tr>
                                <tr>
                                    <td class='border-2'>Data</td>
                                    <td class='border-2 text-start'>Data</td>
                                    <td class='border-2 text-start'>Data</td>
                                    <td class='border-2'></td>
                                    <td class='border-2'>Data</td>
                                    <td class='border-2'></td>
                                    <td class='border-2'>Data</td>
                                </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th class='border-2' colspan="3">TOTAL</th>
                                <th class='border-2'>Data</th>
                                <th class='border-2'>Data</th>
                                <th class='border-2'>Data</th>
                                <th class='border-2'>Data</th>
                            </tr>
                            <tr>
                                <th class='border-2' colspan="3">Amount Remaining</th>
                                <th class='border-2'>Data</th>
                                <th class='border-2'>Data</th>
                                <th class='border-2'>Data</th>
                                <th class='border-2'>Data</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class='mt-3'>
                    <table class="table table-xs text-center p-0">
                        <thead>
                            <tr>
                                <th class='border-2'>PO Num/IR <br>Number</th>
                                <th class='border-2'>Receipt Num- <br>Line</th>
                                <th class='border-2'>Item Code</th>
                                <th class='border-2'>Billed <br> Quantity</th>
                                <th class='border-2'>UOM</th>
                                <th class='border-2'>Unit Price</th>
                                <th class='border-2'>PO Account</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class='border-2'>Data</td>
                                <td class='border-2'>Data</td>
                                <td class='border-2'>Data</td>
                                <td class='border-2'>Data</td>
                                <td class='border-2'>Data</td>
                                <td class='border-2'>Data</td>
                                <td class='border-2'>Data</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th class='border-2' colspan="2">Reference :</th>
                                <th class='border-2' colspan="3">FUI Num :</th>
                                <th class='border-2' colspan="2">Landed Cost :</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div class='grid grid-cols-1 md:grid-cols-2 font-semibold'>
                    
                    <div>
                        <div class='grid grid-cols-2'>
                            <p>Grand Total Amount Remaining IDR</p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                    </div>

                    
                    <div>
                        <div class='grid grid-cols-2'>
                            <p></p>
                            <div class='flex'>
                                <p >:</p>
                                <p>Data</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='mt-3'>
                    <table class="table table-xs text-center p-0">
                        <thead>
                            <tr>
                                <th class='border-t-2 border-s-2 text-start' colspan="2">Paid From:</th>
                                <th class='border-t-2 text-start' colspan="3">Lorem Ipsum</th>
                                <th class='border-t-2 text-start' colspan="2">Received By:</th>
                                <th class='border-t-2 border-e-2 text-start' colspan="3">Lorem Ipsum</th>
                            </tr>
                            <tr>
                                <th class='border-b-2 border-s-2 text-start' colspan="2">Paid To:</th>
                                <th class='border-b-2 text-start' colspan="3">Lorem Ipsum</th>
                                <th class='border-b-2 text-start' colspan="2">Date:</th>
                                <th class='border-b-2 border-e-2 text-start' colspan="3">29-AUG-23</th>
                            </tr>
                            <tr>
                                <th class='border-2' colspan="2">Department <br> Requestor</th>
                                <th class='border-2' colspan="2">Director</th>
                                <th class='border-2' colspan="2">Tax</th>
                                <th class='border-2' colspan="2">Accounting</th>
                                <th class='border-2' colspan="2">Finance</th>
                            </tr>
                            <tr>
                                <th class='border-2'>Issued By</th>
                                <th class='border-2'>Approved By</th>
                                <th class='border-2'>Approver By</th>
                                <th class='border-2'>Checked By</th>
                                <th class='border-2'>Approved By</th>
                                <th class='border-2'>Coded By</th>
                                <th class='border-2'>Checked By</th>
                                <th class='border-2'>Approved By</th>
                                <th class='border-2'>Passed for payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                                <td class='border-2'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </body>
</html>
