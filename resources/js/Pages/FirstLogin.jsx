import PrimaryButton from "@/Components/PrimaryButton";
import { Link } from "@inertiajs/react";

export default function FirstLogin(props) {
    // console.log(props);
    return (
        <div className="pt-5">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                    <div className="p-6 text-gray-900">
                        Silahkan klik tombol dibawah untuk melengkapi detail Profile akun, agar dapat menggunakan aplikasi ini.
                    </div>
                    <div className="flex items-center justify-center mb-5">
                        <Link href={route('vendor.edit', props.vendor_id)}>
                            <PrimaryButton>
                                Lengkapi Profile
                            </PrimaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
