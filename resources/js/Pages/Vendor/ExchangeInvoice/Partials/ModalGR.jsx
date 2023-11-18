import React, { useState } from 'react';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';

function ModalGR({ show, onClose, ...props }) {
    return (
        <div>
            <Modal show={show} onClose={onClose}>
                <div className='border-b-2 p-3'>
                    <b>Pilih PO dan GR</b>
                </div>
                <div className="p-3">
                    <div className='mb-3'>
                        <InputLabel value="Nomor PO" className="font-bold" required={true}/>

                        <div className="flex items-center gap-3">
                            <select className="select select-bordered w-full mt-1"
                                id="is_po"
                                name="is_po"
                            >
                                <option value="" hidden>Pilih</option>
                                {props.data.map((item, index) => (
                                    <option value={item.order_id} label={item.po_nomor}>{item.po_nomor}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='mb-3'>
                        <b>List GR</b>
                        <table className="table table-xs">
                            <thead>
                                <tr className="border-t bg-gray-100">
                                    <th>Aksi</th>
                                    <th>No. Dokumen</th>
                                    <th>Invoice No</th>
                                    <th>Tanggal GR</th>
                                    <th>Qty</th>
                                    <th>Harga Satuan</th>
                                    <th>Total</th>
                                </tr>
                                <tr></tr>
                            </thead>
                            <tbody>
                                <tr className="border-collapse border-1 border-gray-500">        
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                    <td>4</td>
                                    <td>5</td>
                                    <td>6</td>
                                    <td>7</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={onClose}>Tutup</SecondaryButton>
                        <PrimaryButton>Simpan</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </div>
    );
  }
  
  export default ModalGR;
