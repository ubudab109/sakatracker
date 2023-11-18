import { useEffect, useRef, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import WebViewer from "@pdftron/pdfjs-express";

export default function PDFViewer({ pdfUrl, closeModal, docs }) {
    const viewer = useRef(null);
    const { url } = usePage();

    const parts = url.split("/");
    const vendorId = parts && parseInt(parts[parts.indexOf("vendor") + 1], 10);

    const path = new URL(pdfUrl).pathname;
    const pathArray = path.split("/");
    const namaFile = pathArray.pop();

    const doc = docs.find((item) => {
        if (item.doc_id === namaFile) return item;
    });

    const { data, setData, post, processing } = useForm({
        doc_id: namaFile || "",
        xdf_string: "",
    });

    useEffect(() => {
        WebViewer(
            {
                path: "/",
                initialDoc: pdfUrl,
            },
            viewer.current
        ).then((instance) => {
            instance.Core.documentViewer.addEventListener(
                "documentLoaded",
                async () => {
                    const xfdfString = doc?.xdf_string;
                    await instance.Core.annotationManager.importAnnotations(
                        xfdfString
                    );
                }
            );

            const saveButton = document.getElementById("saveButton");

            saveButton.onclick = async () => {
                const xfdfString =
                    await instance.Core.annotationManager.exportAnnotations();

                saveToDatabase(xfdfString);
            };
        });
    }, []);

    const saveToDatabase = (xfdfString) => {
        if (xfdfString) data.xdf_string = xfdfString;

        post(route("admin.vendor.anotation.save", vendorId), {
            onSuccess: () => {
                console.log("Berhasil menyimpan dokumen.");
                closeModal();
            },
            onError: () => {
                console.log("Kesalahan dalam menyimpan dokumen.");
            },
        });
    };

    return (
        <div className="relative h-full">
            <div className="webviewer h-[93%]" ref={viewer}></div>
            <div className="absolute bottom-0 z-0">
                <button
                    id="saveButton"
                    className={`py-1 px-3  text-white rounded-lg hover:bg-blue-800 ${
                        processing
                            ? "pointer-events-none bg-blue-800"
                            : "bg-blue-500"
                    }`}
                >
                    {processing ? "Loading..." : "SAVE"}
                </button>
            </div>
        </div>
    );
}
