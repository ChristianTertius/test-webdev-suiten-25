import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, TrashIcon, Clock } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
    {
        title: 'Daftar Shift',
        href: '/shifts',
    },
    {
        title: 'Detail Shift',
    },
];

interface Shift {
    id: number;
    name: string;
}

interface Props {
    shift: Shift;
}

export default function Show({ shift }: Props) {
    const handleBack = () => {
        router.get('/shifts');
    };

    const handleEdit = () => {
        router.get(`/shifts/${shift.id}/edit`);
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus shift ini?')) {
            router.delete(`/shifts/${shift.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail - ${shift.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={handleBack}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="font-bold text-2xl">Detail Shift</h1>
                            <p className="text-muted-foreground">Informasi lengkap shift kerja</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleEdit}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-neutral-primary-soft rounded-xl border border-default p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <Clock className="h-6 w-6 text-purple-600" />
                        </div>
                        <h2 className="font-semibold text-lg">Informasi Shift</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Nama Shift</p>
                            <p className="font-medium text-lg">{shift.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
