import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pencil, TrashIcon, Plus, Eye, Building2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
];

interface Bank {
    id: number;
    name: string;
}

interface Props {
    banks: Bank[];
}

export default function Index({ banks }: Props) {
    const handleDelete = (bank: Bank) => {
        if (confirm(`Apakah Anda yakin ingin menghapus ${bank.name}?`)) {
            router.delete('/banks/' + bank.id);
        }
    }

    const handleEdit = (bank: Bank) => {
        router.get(`/banks/${bank.id}/edit`);
    }

    const handleDetail = (bank: Bank) => {
        router.get(`/banks/${bank.id}`);
    }

    const handleCreate = () => {
        router.get('/banks/create');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Bank" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='font-bold text-2xl'>Daftar Bank</h1>
                        <p className="text-muted-foreground">Kelola data bank untuk keperluan rekening pegawai</p>
                    </div>
                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Bank
                    </Button>
                </div>

                {banks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 bg-neutral-primary-soft rounded-xl border border-dashed border-default">
                        <div className="rounded-full bg-neutral-secondary-soft bg-[#f5f8ff] p-6 mb-4">
                            <Building2 className="h-12 w-12 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Data Belum tersedia</h3>
                        <p className="text-muted-foreground mb-4">Belum ada bank yang ditambahkan</p>
                        <Button onClick={handleCreate}>
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Bank Pertama
                        </Button>
                    </div>
                ) : (
                    <div className="relative whitespace-nowrap my-2 mx-auto overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                        <table className="w-full text-sm">
                            <thead className="bg-neutral-secondary-soft border-b border-default">
                                <tr>
                                    <th className="px-6 py-3 text-left">Nama Bank</th>
                                    <th className="px-6 py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {banks.map((bank) => (
                                    <tr key={bank.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                        <td className="px-6 py-4">{bank.name}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 justify-center">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDetail(bank)}
                                                    title="Lihat Detail"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(bank)}
                                                    title="Edit"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(bank)}
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
