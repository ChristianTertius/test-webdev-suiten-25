import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Save, FileText, ArrowLeft, Calculator } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Absensi',
        href: '/attendances',
    },
    {
        title: 'Input Absensi',
        href: '/attendances/input',
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

export default function InputAbsen({ attendances: initialAttendances, jobtitles, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [tanggal, setTanggal] = useState(filters.tanggal || new Date().toISOString().split('T')[0]);
    const [jobTitleId, setJobTitleId] = useState(filters.job_title_id || '');

    const { data, setData, post, processing, errors } = useForm({
        attendances: initialAttendances.map(att => ({
            id: att.id,
            is_present: att.is_present,
            jam_pulang: att.jam_pulang || '',
            hari_kerja: att.hari_kerja,
            jam_lembur: att.jam_lembur,
            catatan: att.catatan || '',
        }))
    });

    const handleFilter = () => {
        router.get('/attendances/input', {
            search,
            tanggal,
            job_title_id: jobTitleId,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Function to calculate hari_kerja and jam_lembur based on jam_pulang
    const calculateWorkHours = (jamPulang: string): { hariKerja: number; jamLembur: number } => {
        if (!jamPulang) return { hariKerja: 0, jamLembur: 0 };

        const [hours, minutes] = jamPulang.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;

        // Jam kerja normal: 09:00 - 17:00 (8 jam = 480 menit)
        const jamNormalSelesai = 17 * 60; // 17:00 = 1020 menit

        if (totalMinutes <= jamNormalSelesai) {
            // Pulang sebelum atau tepat 17:00
            return { hariKerja: 1, jamLembur: 0 };
        }

        // Hitung jam lembur dari jam 17:00
        const menitLembur = totalMinutes - jamNormalSelesai;
        const jamLembur = Math.floor(menitLembur / 60);

        // Logika: setiap 8 jam lembur = 1 hari kerja tambahan
        const hariTambahan = Math.floor(jamLembur / 8);
        const sisaJamLembur = jamLembur % 8;

        return {
            hariKerja: 1 + hariTambahan,
            jamLembur: sisaJamLembur
        };
    };

    const updateAttendance = (index: number, field: string, value: any) => {
        const newAttendances = [...data.attendances];
        newAttendances[index] = {
            ...newAttendances[index],
            [field]: value
        };

        // If not present, clear other fields
        if (field === 'is_present' && !value) {
            newAttendances[index].jam_pulang = '';
            newAttendances[index].hari_kerja = 0;
            newAttendances[index].jam_lembur = 0;
            newAttendances[index].catatan = '';
        }

        // Auto-calculate when jam_pulang changes
        if (field === 'jam_pulang' && value && newAttendances[index].is_present) {
            const calculated = calculateWorkHours(value);
            newAttendances[index].hari_kerja = calculated.hariKerja;
            newAttendances[index].jam_lembur = calculated.jamLembur;
        }

        setData('attendances', newAttendances);
    };

    const handleSave = () => {
        post('/attendances/bulk-update', {
            onSuccess: () => {
                console.log('Data berhasil disimpan, redirecting...');
                window.location.href = '/attendances';
            },
            onError: (errors) => {
                console.error('Error:', errors);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Absensi Pegawai" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='font-bold text-2xl'>Input Absensi Pegawai</h1>
                        <p className="text-muted-foreground">Kelola kehadiran pegawai harian</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => window.location.href = '/attendances'}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali
                        </Button>
                        <Button onClick={handleSave} disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Semua'}
                        </Button>
                    </div>
                </div>

                {/* Info Box */}
                {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4"> */}
                {/*     <div className="flex items-start gap-3"> */}
                {/*         <Calculator className="h-5 w-5 text-blue-600 mt-0.5" /> */}
                {/*         <div className="text-sm text-blue-800"> */}
                {/*             <p className="font-semibold mb-1">Perhitungan Otomatis Hari Kerja & Lembur:</p> */}
                {/*             <ul className="list-disc list-inside space-y-1"> */}
                {/*                 <li>Pulang jam 17:00 = <strong>1 hari + 0 jam lembur</strong></li> */}
                {/*                 <li>Pulang jam 21:00 = <strong>1 hari + 4 jam lembur</strong></li> */}
                {/*                 <li>Pulang jam 01:00 = <strong>2 hari + 0 jam lembur</strong></li> */}
                {/*                 <li>Pulang jam 23:00 = <strong>1 hari + 6 jam lembur</strong></li> */}
                {/*             </ul> */}
                {/*             <p className="mt-2 text-xs italic">*Perhitungan otomatis berdasarkan jam pulang</p> */}
                {/*         </div> */}
                {/*     </div> */}
                {/* </div> */}

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

                {/* Debug Info */}
                {errors && Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-800 font-semibold">Error:</p>
                        <pre className="text-sm text-red-600">{JSON.stringify(errors, null, 2)}</pre>
                    </div>
                )}

                {/* Table Section */}
                {initialAttendances.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-neutral-primary-soft rounded-xl border border-dashed border-default">
                        <div className="rounded-full bg-neutral-secondary-soft bg-[#f5f8ff] p-6 mb-4">
                            <FileText className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Tidak Ada Pegawai</h3>
                        <p className="text-muted-foreground">Silakan tambahkan pegawai terlebih dahulu</p>
                    </div>
                ) : (
                    <div className="relative whitespace-nowrap my-2 mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-secondary-soft border-b border-default">
                                <tr>
                                    <th className="px-6 py-3 text-left">Hadir</th>
                                    <th className="px-6 py-3 text-left">Nama Pegawai</th>
                                    <th className="px-6 py-3 text-left">Bagian</th>
                                    <th className="px-6 py-3 text-left">Jam Pulang</th>
                                    <th className="px-6 py-3 text-left">Hari + Lembur</th>
                                    <th className="px-6 py-3 text-left">Catatan</th>
                                </tr>
                            </thead>

                            <tbody>
                                {initialAttendances.map((attendance, index) => (
                                    <tr
                                        key={attendance.id}
                                        className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default"
                                    >
                                        <td className="px-6 py-4">
                                            <Checkbox
                                                checked={data.attendances[index]?.is_present || false}
                                                onCheckedChange={(checked) =>
                                                    updateAttendance(index, 'is_present', checked)
                                                }
                                            />
                                        </td>
                                        <td className="px-6 py-4">{attendance.employee.nama_pegawai}</td>
                                        <td className="px-6 py-4">{attendance.job_title.name}</td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="time"
                                                value={data.attendances[index]?.jam_pulang || ''}
                                                onChange={(e) => updateAttendance(index, 'jam_pulang', e.target.value)}
                                                disabled={!data.attendances[index]?.is_present}
                                                className="px-2 py-1 border border-default rounded bg-neutral-primary disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            {data.attendances[index]?.is_present && data.attendances[index]?.jam_pulang ? (
                                                <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800">
                                                    {data.attendances[index].hari_kerja} + {data.attendances[index].jam_lembur}
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">-</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <input
                                                type="text"
                                                value={data.attendances[index]?.catatan || ''}
                                                onChange={(e) => updateAttendance(index, 'catatan', e.target.value)}
                                                disabled={!data.attendances[index]?.is_present}
                                                placeholder="Catatan..."
                                                className="w-full px-2 py-1 border border-default rounded bg-neutral-primary disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {initialAttendances.length > 0 && (
                    <div className="flex justify-between items-center bg-neutral-primary-soft rounded-lg border border-default px-4 py-3">
                        <div className="text-sm text-muted-foreground">
                            Total: {initialAttendances.length} pegawai |
                            Hadir: {data.attendances.filter(a => a.is_present).length} pegawai
                        </div>
                        <Button onClick={handleSave} disabled={processing}>
                            <Save className="mr-2 h-4 w-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Semua'}
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
