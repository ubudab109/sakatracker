import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FirstLogin from './FirstLogin';
import { useEffect, useState } from 'react';


export default function Dashboard({ auth }) {
    const [data, setData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const apiUrl = `/api/check-first-login?user_id=${auth.user.id}`;
    
        fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setData(data);
            setLoading(false);
          })
          .catch((error) => {
            setError(error);
            setLoading(false);
          });
      }, []);
    
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
    return <div>Error: {error.message}</div>;
    }

    console.log(data);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Home" />

            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18">Home</h4>
                <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item"><a href="javascript: void(0);">Home</a></li>
                        <li className="breadcrumb-item active">Home</li>
                    </ol>
                </div>
            </div>

            <div className="pt-6">
                    <div className="bg-white overflow-hidden shadow-lg sm:rounded-lg">
                        <div className="p-6 text-gray-900 font-bold">Hi, selamat datang</div>
                    </div>
            </div>

            {data.first_login == true ? <FirstLogin vendor_id={data.vendor.id} /> : ''}
        </AuthenticatedLayout>
    );
}
