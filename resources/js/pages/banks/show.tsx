import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, TrashIcon, Building2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
    {
        title: 'Daftar Bank',
        href: '/banks',
    },
    {
        title: 'Detail Bank',
    },
];

interface Bank {
    id: number;
    name: string;
}

interface Props {
    bank: Bank;
}

export default function Show({ bank }: Props) {
    const handleBack = () => {
        router.get('/banks');
    };

    const handleEdit = () => {
        router.get(`/banks/${bank.id}/edit`);
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus bank ini?')) {
            router.delete(`/banks/${bank.id}`);
        }
    };

    const formatDate = (date: string | undefined) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail - ${bank.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={handleBack}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="font-bold text-2xl">Detail Bank</h1>
                            <p className="text-muted-foreground">Informasi lengkap bank</p>
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
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <h2 className="font-semibold text-lg">Informasi Bank</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Nama Bank</p>
                            <p className="font-medium text-lg">{bank.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
