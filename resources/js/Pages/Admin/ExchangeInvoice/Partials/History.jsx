import ModalViewer from "@/Components/ModalViewer";
import { useState } from "react";

function History({ ...props }) {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const openPopup = (item) => {
        setPdfUrl(item);
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setPdfUrl('');
        setIsPopupOpen(false);
    };
    console.log('test 123', props)
    return (
        <div>
            <ModalViewer
                files={pdfUrl}
                show={isPopupOpen}
                onClose={closePopup}
            />
            <ol className={`grid grid-cols-5 relative border-l border-gray-200 dark:border-gray-700`}>
                {props.data.map((item, index) => (
                    <li className="mb-10 ml-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                {item.date}
                            </time>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {index + 1}.) {item.title}
                            </h3>
                            <p className={`text-base font-normal text-${item.color}-500 dark:text-gray-400`}>
                                Status : {item.status}
                            </p>
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Note: {item.body}
                            </p>
                            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400" 
                            onClick={(e) =>
                                openPopup(item.attachments)
                            }>
                                Lampiran: {item.attachments.length} Berkas
                            </p>
                    </li>
                ))}
            </ol>
        </div>
    );
  }
  
  export default History;
