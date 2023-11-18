import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import SecondaryButton from "./SecondaryButton";
import { useState } from "react";
import InputLabel from "./InputLabel";
import DangerButton from "./DangerButton";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";

export default function Modal({
    files,
    show = false,
    closeable = true,
    props = null,
    datas = null,
    onClose = () => {},
}) {
    console.log(datas);
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        status: '',
        note: props ? props.data.revision_vendor.note : '',
        document: '',
        approval_role: '',
        top: '',
        ppn: '',
        skb: '',
        pph: '',
        coa_prepayment: '',
        coa_liability_account: '',
        coa_receiving: '',
        ship_to: '',
        bill_to: '',
        npwp_note: '',
        sppkp_note: '',
        siup_note: '',
        tdp_note: '',
        nib_note: '',
        board_of_directors_composition_note: '',
        non_pkp_statement_note: '',
    });

    
    const handleStatusChange = (event) => {
        data.status = event;
    }
    const submit = (e) => {
        e.preventDefault();
        if(props != null) {
            data.top = datas.top;
            data.ppn = datas.ppn;
            data.skb = datas.skb;
            data.pph = datas.pph;
            data.coa_prepayment = datas.coa_prepayment;
            data.coa_liability_account = datas.coa_liability_account;
            data.coa_receiving = datas.coa_receiving;
            data.ship_to = datas.ship_to;
            data.bill_to = datas.bill_to;
            data.approval_role = datas.approval_role;
            data.npwp_note = datas.npwp_note;
            data.sppkp_note = datas.sppkp_note;
            data.siup_note = datas.siup_note;
            data.tdp_note = datas.tdp_note;
            data.nib_note = datas.nib_note;
            data.board_of_directors_composition_note = datas.board_of_directors_composition_note;
            data.non_pkp_statement_note = datas.non_pkp_statement_note;
            post(route('admin.vendor-profile.update', props.data.revision_vendor.id));
            close();
        }
    };

    const [idxfile, setidxfile] = useState(0);
    const close = () => {
        if (closeable) {
            setidxfile(0);
            onClose();
        }
    };

    const prev = () => {
        var total = files.length;
        if(idxfile == 0){
            setidxfile(total - 1);
        }else{
            setidxfile(idxfile-1);
        }
    };

    const next = () => {
        var total = files.length;
        if(idxfile == (total - 1)){
            setidxfile(0);
        }else{
            setidxfile(idxfile+1);
        }
    };

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
        <Dialog
            as="div"
            id="modal"
            className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-[999999] transform transition-all"
            onClose={close}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-500/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    <form onSubmit={submit}>
                        <div class="grid grid-cols-2 gap-4">
                        {files.length > 0 && (<>
                            <div class="flex justify-start gap-3">
                            {files[idxfile].name} ({idxfile+1}/{files.length})
                                {props != null ? 
                                    <input 
                                        type="text"
                                        name="note"
                                        className=""
                                        placeholder="catatan *"
                                        onChange={(e) => setData('note', e.target.value)}
                                        value={data.note}
                                        style={{height: '30px'}} 
                                    />
                                    : ''}
                                </div>
                            <div class="flex justify-end gap-3 ...">
                            {props != null ? 
                            <>
                                <DangerButton className='' style={{height: '30px'}}  onClick={() => handleStatusChange('ditolak')}>
                                    Tolak
                                </DangerButton>
                                <PrimaryButton className='' style={{height: '30px'}} onClick={() => handleStatusChange('disetujui')}>
                                    Setuju
                                </PrimaryButton>
                            </>
                            : ''}
                                <a href={files[idxfile].origin} target="_blank" className="text-blue-500 mr-1">View Original File</a>
                            <a
                                    href="javascript:;"
                                    onClick={(e) =>
                                        prev()
                                    }
                                >
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                                    </svg>
                                </a>
                                <a
                                    href="javascript:;"
                                    onClick={(e) =>
                                        next()
                                    }
                                >
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                                    </svg>
                                </a>
                                <a
                                    href="javascript:;"
                                    onClick={(e) =>
                                        close()
                                    }
                                >
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                </a>
                            </div>
                        </>)}
                        </div>
                    </form>
                  </Dialog.Title>
                  <div className="mt-2" style={{height:'92%'}}>
                    {files.length > 0 && (<iframe width={'100%'} height={'100%'} src={files[idxfile].ispdf ? baseUrl+'/pdfview?file='+files[idxfile].edited : files[idxfile].edited}></iframe>)}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
}
