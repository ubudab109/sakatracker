<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Notification;
use App\Models\RevisionRegisterVendor;
use App\Models\User;
use App\Models\Vendor;
use Inertia\Inertia;
use Storage;
use Auth;

class DashboardController extends Controller
{
    public function index()
    {
        if (Auth::user()->role == 'vendor') {
            $onProgressRevisionVendor = RevisionRegisterVendor::where('user_id', Auth::user()->id)
                ->where('status', 'menunggu persetujuan')
                ->orderBy('id', 'desc')->first();
            if ($onProgressRevisionVendor) {

                $approval = [];
                $revisionVendors = RevisionRegisterVendor::where('vendor_id', $onProgressRevisionVendor->vendor_id)
                    ->orderBy('id', 'asc')
                    ->get();
                foreach ($revisionVendors as $revision) {
                    $approval[] = [
                        'approval' => $revision->approval_role,
                        'status' => ucwords($revision->status),
                        'date' => date('Y-m-d H:i:s', strtotime($revision->updated_at))
                    ];
                }
                $data['revisions'] = $approval;
            } else {
                $data['revisions'] = [];
            }
            $data['revision_vendor'] = $this->revisionVendor(Auth::user()->id);
            return Inertia::render('Dashboard', ['data' => $data]);
        } else if (Auth::user()->role == 'approver') {
            $data['revision_vendor'] = $this->revisionVendor();
            return Inertia::render('Dashboard', ['data' => $data]);
        }
        return Inertia::render('Dashboard');
    }

    public function pdfviewer(Request $request)
    {
        $file = $request->input('file');
        if (!$file)
            die('file required');
        $data = [];

        $doc_path = parse_url($file, PHP_URL_PATH);
        $nama_doc = basename($doc_path);

        //have edited file
        $folder = explode("/", $doc_path);
        $fileorigin = $folder[count($folder) - 2] . '/' . $folder[count($folder) - 1];
        if (Str::contains($fileorigin, 'edited'))
            $fileedited = $fileorigin;
        else
            $fileedited = $folder[count($folder) - 2] . '/edited_' . $folder[count($folder) - 1];
        $exist = Storage::disk('public')->exists($fileedited);
        $file = ($exist ? Storage::disk('public')->url($fileedited) : Storage::disk('public')->url($fileorigin));

        $data['file'] = $file;
        $data['filesave'] = Storage::disk('public')->url($fileedited);
        return view('pdfviewer', $data);
    }

    private function revisionVendor(int $userId = null)
    {
        if ($userId) {
            $revisionApproved = 0;
            $revisionRejected = 0;
            $revisionProgress = 0;
            Vendor::where('user_id', $userId)
                ->with('revision_register_vendor_latest')
                ->orderBy('updated_at', 'desc')->get()
                ->map(function ($vendor) use ($revisionApproved, $revisionProgress, $revisionRejected) {
                    if ($vendor->status_account == 'ditolak') {
                        $revisionRejected += 1;
                    }

                    if ($vendor->status_account == 'pengajuan perubahan') {
                        $revisionProgress += 1;
                    }

                    if ($vendor->status_account == 'disetujui') {
                        $revisionApproved += 1;
                    }

                    return $vendor;
                });
            $data['revisionApproved'] = $revisionApproved;
            $data['revisionRejected'] = $revisionRejected;
            $data['revisionProgress'] = $revisionProgress;
        } else {
            $revisionApproved = 0;
            $revisionRejected = 0;
            $revisionProgress = 0;
            Vendor::with('revision_register_vendor_latest')
                ->orderBy('updated_at', 'desc')->get()
                ->map(function ($vendor) use ($revisionApproved, $revisionProgress, $revisionRejected) {
                    if ($vendor->status_account == 'ditolak') {
                        $revisionRejected += 1;
                    }

                    if ($vendor->status_account == 'pengajuan perubahan') {
                        $revisionProgress += 1;
                    }

                    if ($vendor->status_account == 'disetujui') {
                        $revisionApproved += 1;
                    }

                    return $vendor;
                });
            $data['revisionApproved'] = $revisionApproved;
            $data['revisionRejected'] = $revisionRejected;
            $data['revisionProgress'] = $revisionProgress;
        }
        return $data;
    }

    public function pdfviewerpost(Request $request)
    {
        $file = $request->input('file');
        if (!$file)
            die('file required');
        $data = [];

        $doc_path = parse_url($file, PHP_URL_PATH);
        $nama_doc = basename($doc_path);

        //have edited file
        $folder = explode("/", $doc_path);
        $path = storage_path('app/public/' . $folder[count($folder) - 2]);

        if (request()->file->move($path, $folder[count($folder) - 1]))
            return ['success' => true];
        return ['success' => false];
    }

    public function getNotifications($id)
    {
        $notifications = Notification::where([['user_id', $id], ['read', false]])->orderBy('created_at', 'desc')->get();
        $unreadNotification = Notification::where([['user_id', $id], ['read', false]])->get();

        return response()->json([
            'status' => 'OK',
            'message' => 'Berhasil mengambil data notifications',
            'notifications' => $notifications,
            'unread' => count($unreadNotification)
        ], 200);
    }

    public function readNotifications($id)
    {
        $notifications = Notification::where('id', $id)->update(['read' => true]);
        return response()->json([
            'status' => 'OK',
            'message' => 'Berhasil mengupdate data notifications',
            'notifications' => $notifications
        ], 200);
    }

    public function getPermissions()
    {
        $permissions = [];
        if (Auth::user()->user_role != null) {
            foreach (Auth::user()->user_role as $user_role) {
                $permissions[] = $user_role->role->permissions->pluck('name')->toArray();
            }

            $permissions = array_unique(array_merge(...$permissions));
        }

        return implode(' | ', $permissions);
    }
}
