import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Employee, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pencil, TrashIcon, Plus, UserX, PaperclipIcon, File, FileText, Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
];

interface Props {
    employees: Employee[];
}

export default function Index({ employees }: Props) {

    const handleDelete = (employee: Employee) => {
        router.delete('/employees/' + employee.id);
    }

    const handleDetail = (employee: Employee) => {
        router.get(`/employees/${employee.id}`);
    }

    const handleEdit = (employee: Employee) => {
        // Implement edit logic
        router.get(`/employees/${employee.id}/edit`);
    }

    const handleCreate = () => {
        router.get('/employees/create');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='font-bold text-2xl'>Daftar Pegawai</h1>
                        <p className="text-muted-foreground">Kelola data pegawai dan informasi gaji</p>
                    </div>
                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Pegawai
                    </Button>
                </div>

                {employees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-neutral-primary-soft rounded-xl border border-dashed border-default">
                        <div className="rounded-full bg-neutral-secondary-soft bg-[#f5f8ff] p-6 mb-4">
                            <FileText className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Data Belum tersedia</h3>
                    </div>
                ) : (
                    <div className="relative whitespace-nowrap my-2 mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <table className="w-full text-sm">
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
                                    <th className="px-6 py-3 text-wrap">Uang Makan(tanggal merah)</th>
                                    <th className="px-6 py-3">Rate Lembur</th>
                                    <th className="px-6 py-3 text-wrap">Rate Lembur(tanggal merah)</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {employees.map((employee, index) => (
                                    <tr key={employee.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                        <td className="px-6 py-4">{employee.nama_pegawai || '-'}</td>
                                        <td className="px-6 py-4">{employee.job_title.name || '-'}</td>
                                        <td className="px-6 py-4">{employee.nomor_telepon || '-'}</td>
                                        <td className="px-6 py-4">{employee.nama_rekening || '-'}</td>
                                        <td className="px-6 py-4">{employee.bank.name || '-'}</td>
                                        <td className="px-6 py-4">{employee.shift.name || '-'}</td>
                                        <td className="px-6 py-4">{employee.periode_gajian || '-'}</td>
                                        <td className="px-6 py-4">{employee.gaji_pokok || '-'}</td>
                                        <td className="px-6 py-4">{employee.gaji_harian || '-'}</td>
                                        <td className="px-6 py-4">{employee.uang_makan || '-'}</td>
                                        <td className="px-6 py-4">{employee.uang_makan_tanggal_merah || '-'}</td>
                                        <td className="px-6 py-4">{employee.rate_lembur || '-'}</td>
                                        <td className="px-6 py-4">{employee.rate_lembur_tanggal_merah || '-'}</td>

                                        <td className="px-6 py-4 flex gap-2 justify-center">

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDetail(employee)}
                                                title="Lihat Detail"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant={'outline'} size="sm" onClick={() => handleEdit(employee)}>
                                                <Pencil />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(employee)}
                                            >
                                                <TrashIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
