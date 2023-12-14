function RevisionHistory({ data }) {
    return (
        <ol className="items-center sm:flex w-full">
            {
                data.map((item, index) => {
                    let color;
                    if (item.status === 'Disetujui') {
                        color = 'green';
                    } else if (item.status === 'Menunggu Persetujuan') {
                        color = 'yellow';
                    } else if (item.status === 'Ditolak') {
                        color = 'red';
                    } else {
                        color = 'blu';
                    }
                    return (
                        <li className="relative mb-6 sm:mb-0" key={index}>
                            <div className="flex items-center">
                                <div className={`z-10 flex items-center justify-center w-6 h-6 bg-${color}-300 rounded-full ring-0 ring-white dark:bg-${color}-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                                    <svg className={`w-2.5 h-2.5 text-${color}-800 dark:text-${color}-300`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    </svg>
                                </div>
                                <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                            </div>
                            <div className="mt-3 sm:pe-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.approval}</h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.date}</time>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">{item.status}</p>
                            </div>
                        </li>
                    );
                })
            }
        </ol>
    );
}

export default RevisionHistory;
