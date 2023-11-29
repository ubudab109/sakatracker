export default function CardDashboardChart(props) {
    return (
        <div className="col-xl-4 col-md-6">
            <a href={props.href ?? 'javascript:;'}>
                <div className="card card-h-100">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-6">
                                <span className="text-muted mb-3 lh-1 d-block text-truncate">{props.name}</span>
                                <h4 className="mb-3">
                                    <span className="stat-value">{props.data}</span>
                                </h4>
                            </div>

                            <div className="col-6">
                                <img src="/assets/images/graph.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
}