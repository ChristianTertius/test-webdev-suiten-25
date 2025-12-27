import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { employees } from '@/semuaroutes';
import { Employee, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Plus, FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: employees().url,
    },
];

interface Props {
    employees: Employee[];
}

export default function Index({ employees }: Props) {
    const handleCreate = () => {
        router.get('/employees/create');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="font-bold text-2xl">Daftar Pegawai</h1>
                        <p className="text-muted-foreground">
                            Kelola data pegawai dan informasi gaji
                        </p>
                    </div>

                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Pegawai
                    </Button>
                </div>

                {employees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-neutral-primary-soft rounded-xl border border-dashed border-default">
                        <div className="rounded-full bg-[#f5f8ff] p-6 mb-4">
                            <FileText className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Data Belum tersedia
                        </h3>
                    </div>
                ) : (
                    <div className="rounded-base border border-default bg-neutral-primary-soft shadow-xs">
                        <div className="overflow-x-auto">
                            <table className="min-w-max text-sm whitespace-nowrap">
                                <thead className="bg-neutral-secondary-soft border-b border-default">
                                    <tr>
                                        <th className="px-6 py-3">Nama Pegawai</th>
                                        <th className="px-6 py-3">Bagian</th>
                                        <th className="px-6 py-3">Nomor Telepon</th>
                                        <th className="px-6 py-3">Nama Rekening</th>
                                        <th className="px-6 py-3">Bank</th>
                                        <th className="px-6 py-3">Shift</th>
                                        <th className="px-6 py-3">Periode Gajian</th>
                                        <th className="px-6 py-3">Gaji Pokok</th>
                                        <th className="px-6 py-3">Gaji Harian</th>
                                        <th className="px-6 py-3">Uang Makan</th>
                                        <th className="px-6 py-3">
                                            Uang Makan (Tanggal Merah)
                                        </th>
                                        <th className="px-6 py-3">Rate Lembur</th>
                                        <th className="px-6 py-3">
                                            Rate Lembur (Tanggal Merah)
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {employees.map((employee) => (
                                        <tr
                                            key={employee.id}
                                            onClick={() =>
                                                router.visit(`/employees/${employee.id}`)
                                            }
                                            className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default hover:bg-gray-50 cursor-pointer"
                                        >
                                            <td className="px-6 py-4">
                                                {employee.nama_pegawai || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.job_title?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.nomor_telepon || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.nama_rekening || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.bank?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.shift?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.periode_gajian || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.gaji_pokok || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.gaji_harian || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.uang_makan || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.uang_makan_tanggal_merah || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.rate_lembur || '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {employee.rate_lembur_tanggal_merah || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
