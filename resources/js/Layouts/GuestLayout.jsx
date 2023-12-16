import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className='flex items-center min-h-screen'>
                <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-white shadow-lg">
                        <ul class="space-y-2 font-medium" className="p-5">
                            <li>
                                <img src="/images/logo-kalbe-black.png"  />
                            </li>
                            <li className="mt-10 flex items-center justify-center">
                                <b className="text-xl">Hi, Selamat Datang</b>
                            </li>
                            <li className="mt-10 flex items-center justify-center border-dashed border-2">
                                {/* <b className="text-xl text-center">LOGO <br/> CHAMPS</b> */}
                            <img src="/assets/images/logo.jpg" alt="" className="md:w-16 md:h-16 sm:w-6 " />

                            </li>
                        </ul>
                    </div>
                </aside>

                <div className="lg:px-64 md:px-10 sm:px-4 lg:ml-64 md:ml-64 sm:ml-4 w-full">
                    <div class="p-4 bg-white shadow-lg rounded-lg">
                        {children}
                    </div>
                </div>
        </div>
        // <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>
    );
}
