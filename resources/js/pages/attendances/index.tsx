import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, Link } from '@inertiajs/react';
import { FileText, Plus, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Absensi',
        href: dashboard().url,
    },
];

interface JobTitle {
    id: number;
    name: string;
}

interface Employee {
    id: number;
    nama_pegawai: string;
}

interface Attendance {
    id: number;
    tanggal: string;
    employee: Employee;
    job_title: JobTitle;
    is_present: boolean;
    jam_pulang: string | null;
    hari_kerja: number;
    jam_lembur: number;
    catatan: string | null;
}

interface Props {
    attendances: Attendance[];
    jobtitles: JobTitle[];
    filters: {
        tanggal?: string;
        job_title_id?: string;
        search?: string;
    };
}

export default function Index({ attendances, jobtitles, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [tanggal, setTanggal] = useState(filters.tanggal || new Date().toISOString().split('T')[0]);
    const [jobTitleId, setJobTitleId] = useState(filters.job_title_id || '');

    const handleFilter = () => {
        router.get('/attendances', {
            search,
            tanggal,
            job_title_id: jobTitleId,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Absensi Pegawai" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='font-bold text-2xl'>Daftar Absensi Pegawai</h1>
                        <p className="text-muted-foreground">Lihat riwayat kehadiran pegawai</p>
                    </div>
                    <Link href="/attendances/input">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Input Absensi
                        </Button>
                    </Link>
                </div>

                {/* Filter Section */}
                <div className="bg-neutral-primary-soft rounded-xl border border-default p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Tanggal
                            </label>
                            <input
                                type="date"
                                value={tanggal}
                                onChange={(e) => setTanggal(e.target.value)}
                                className="w-full px-3 py-2 border border-default rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-neutral-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Cari Pegawai
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Nama pegawai..."
                                className="w-full px-3 py-2 border border-default rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-neutral-primary"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Bagian
                            </label>
                            <select
                                value={jobTitleId}
                                onChange={(e) => setJobTitleId(e.target.value)}
                                className="w-full px-3 py-2 border border-default rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-neutral-primary"
                            >
                                <option value="">Semua Bagian</option>
                                {jobtitles.map((jobTitle) => (
                                    <option key={jobTitle.id} value={jobTitle.id}>
                                        {jobTitle.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <Button onClick={handleFilter} className="w-full">
                                Cari
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                {attendances.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-neutral-primary-soft rounded-xl border border-dashed border-default">
                        <div className="rounded-full bg-neutral-secondary-soft bg-[#f5f8ff] p-6 mb-4">
                            <FileText className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Tidak Ada Data</h3>
                        <p className="text-muted-foreground mb-4">Belum ada data absensi untuk tanggal ini</p>
                        <Link href="/attendances/input">
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Input Absensi
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="relative whitespace-nowrap my-2 mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-secondary-soft border-b border-default">
                                <tr>
                                    <th className="px-6 py-3 text-left">Tanggal</th>
                                    <th className="px-6 py-3 text-left">Nama Pegawai</th>
                                    <th className="px-6 py-3 text-left">Bagian</th>
                                    {/* <th className="px-6 py-3 text-left">Kehadiran</th> */}
                                    <th className="px-6 py-3 text-left">Jam Pulang</th>
                                    <th className="px-6 py-3 text-left">Hari Kerja + Lembur</th>
                                    <th className="px-6 py-3 text-left">Catatan</th>
                                </tr>
                            </thead>

                            <tbody>
                                {attendances.map((attendance) => (
                                    <tr
                                        key={attendance.id}
                                        className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                                    >
                                        <td className="px-6 py-4">{formatDate(attendance.tanggal)}</td>
                                        <td className="px-6 py-4 font-medium">{attendance.employee.nama_pegawai}</td>
                                        <td className="px-6 py-4">{attendance.job_title.name}</td>
                                        {/* <td className="px-6 py-4"> */}
                                        {/*     {attendance.is_present ? ( */}
                                        {/*         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"> */}
                                        {/*             <CheckCircle className="h-3 w-3" /> */}
                                        {/*             Hadir */}
                                        {/*         </span> */}
                                        {/*     ) : ( */}
                                        {/*         <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"> */}
                                        {/*             <XCircle className="h-3 w-3" /> */}
                                        {/*             Tidak Hadir */}
                                        {/*         </span> */}
                                        {/*     )} */}
                                        {/* </td> */}
                                        <td className="px-6 py-4">
                                            {attendance.jam_pulang || '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {attendance.is_present ? (
                                                <span className="font-medium">
                                                    {attendance.hari_kerja} + {attendance.jam_lembur}
                                                </span>
                                            ) : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            {attendance.catatan || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {attendances.length > 0 && (
                    <div className="flex justify-between items-center bg-neutral-primary-soft rounded-lg border border-default px-4 py-3">
                        <div className="text-sm text-muted-foreground">
                            Total: {attendances.length} pegawai |
                            Hadir: {attendances.filter(a => a.is_present).length} pegawai |
                            Tidak Hadir: {attendances.filter(a => !a.is_present).length} pegawai
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
