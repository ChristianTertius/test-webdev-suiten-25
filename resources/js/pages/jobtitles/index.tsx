import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Employee, JobTitle, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Pencil, TrashIcon, Plus, UserX, PaperclipIcon, File, FileText, Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
];

interface Props {
    jobtitles: JobTitle[];
}

export default function Index({ jobtitles }: Props) {

    const handleDelete = (jobtitle: JobTitle) => {
        router.delete('/jobtitles/' + jobtitle.id);
    }

    const handleEdit = (jobtitle: JobTitle) => {
        // Implement edit logic
        router.get(`/jobtitles/${jobtitle.id}/edit`);
    }

    const handleCreate = () => {
        router.get('/jobtitles/create');
    }

    const handleDetail = (jobtitle: JobTitle) => {
        router.get(`/jobtitles/${jobtitle.id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4 sm:p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className='font-bold text-2xl'>Daftar Bagian</h1>
                    </div>
                    <Button onClick={handleCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        Tambah Data Bagian
                    </Button>
                </div>

                {jobtitles.length === 0 ? (
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
                                    <th className="px-6 py-3">Nama Bagian</th>
                                    <th className="px-6 py-3">Jumlah Pegawai</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {jobtitles.map((jobtitle, index) => (
                                    <tr key={jobtitle.id} className="odd:bg-neutral-primary even:bg-neutral-secondary-soft border-b border-default">
                                        <td className="px-6 py-4">{jobtitle.name || '-'}</td>
                                        <td className="px-6 py-4 text-center">{jobtitle.employees_count || 0}</td> {/* ← Update ini */}

                                        <td className="px-6 py-4 flex gap-2 justify-center">

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDetail(jobtitle)}
                                                title="Lihat Detail"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant={'outline'} size="sm" onClick={() => handleEdit(jobtitle)}>
                                                <Pencil />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(jobtitle)}
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
