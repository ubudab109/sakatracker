import Modal from "@/Components/Modal";
import SecondaryButton from "./SecondaryButton";
import PDFViewer from "./PDFViewer";

function PDFPopup({ pdfUrl, show, onClose, docs }) {
    return (
        <div>
            <Modal show={show} onClose={onClose}>
                <div className="p-3">
                    <div className="h-[75vh]">
                        <PDFViewer
                            pdfUrl={pdfUrl}
                            closeModal={onClose}
                            docs={docs}
                        />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={onClose}>
                            Tutup
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default PDFPopup;
