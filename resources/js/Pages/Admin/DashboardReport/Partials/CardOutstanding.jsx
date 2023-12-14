export default function CardOutstanding(props) {
    // console.log(props);

    return (
        <div className="mt-3">
            <div className="flex gap-3 grid-cols-3 justify-evenly">
                <a href={`/vendor/outstanding-purchase-order?month=${props.month}`}>
                    <div className="stats shadow-lg w-full">
                        <div className="stat">
                            <div className="stat-title">PO Outstanding</div>
                            <div className="stat-value">{props.data.po_amount}</div>
                        </div>
                    </div>
                </a>
                <div className="stats shadow-lg w-full">
                    <div className="stat">
                        <div className="stat-title">Outstanding Invoice</div>
                        <div className="stat-value">{props.data.invoice_amount}</div>
                    </div>
                </div>
                <div className="stats shadow-lg w-full">
                    <div className="stat">
                        <div className="stat-title">Outstanding Invoice Amount</div>
                        <div className="stat-value">{props.data.formated_invoice_total}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}