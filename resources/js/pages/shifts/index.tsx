import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pencil, TrashIcon, Plus, Eye, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
];

interface Shift {
    id: number;
    name: string;
}

interface Props {
    shifts: Shift[];
}

export default function Index({ shifts }: Props) {
    const handleDelete = (shift: Shift) => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${shift.name}?`)) {
            router.delete('/shifts/' + shift.id);
        }
    }

    const handleEdit = (shift: Shift) => {
        router.get(`/shifts/${shift.id}/edit`);
    }

    const handleDetail = (shift: Shift) => {
        router.get(`/shifts/${shift.id}`);
    }

    const handleCreate = () => {
        router.get('/shifts/create');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Shift" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='font-bold text-2xl'>Daftar Shift</h1>
                        <p className="text-muted-foreground">Kelola data shift kerja pegawai</p>
                    </div>
                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Shift
                    </Button>
                </div>

                {shifts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-neutral-primary-soft rounded-xl border border-dashed border-default">
                        <div className="rounded-full bg-neutral-secondary-soft bg-[#f5f8ff] p-6 mb-4">
                            <Clock className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Data Belum tersedia</h3>
                        <p className="text-muted-foreground mb-4">Belum ada shift yang ditambahkan</p>
                        <Button onClick={handleCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Shift Pertama
                        </Button>
                    </div>
                ) : (
                    <div className="relative whitespace-nowrap my-2 mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-secondary-soft border-b border-default">
                                <tr>
                                    <th className="px-6 py-3 text-left">Nama Shift</th>
                                    <th className="px-6 py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {shifts.map((shift) => (
                                    <tr key={shift.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                        <td className="px-6 py-4 font-medium">{shift.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 justify-center">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDetail(shift)}
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(shift)}
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(shift)}
                                                    title="Hapus"
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                </Button>
                                            </div>
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
