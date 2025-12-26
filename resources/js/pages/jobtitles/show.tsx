import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Pencil, TrashIcon, Briefcase } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
    {
        title: 'Daftar Pegawai',
        href: '/jobtitles',
    },
    // {
    //     title: 'Detail',
    // },
];

interface JobTitle {
    id: number;
    name: string;
}

interface Props {
    jobtitle: JobTitle;
}

export default function Show({ jobtitle }: Props) {
    const [showEditDialog, setShowEditDialog] = useState(false);
    // const handleBack = () => {
    //     router.get('/jobtitles');
    // };

    const handleConfirmEdit = () => {
        router.get(`/jobtitles/${jobtitle.id}/edit`);
    };

    const handleEdit = () => {
        setShowEditDialog(true);
    };

    const handleBack = () => {
        router.get('/jobtitles');
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
            router.delete(`/jobtitles/${jobtitle.id}`);
        }
    };

    const { data, setData, post, processing, errors } = useForm({
        name: ''
    });


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail - ${jobtitle.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="font-bold text-2xl">Detail Job Title</h1>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button type="button" variant="outline" onClick={handleBack}>
                            Kembali
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Hapus
                        </Button>
                        <Button variant="outline" onClick={handleEdit}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Nama Bagian <span className="text-red-500">*</span></Label>
                    <Input
                        id="name"
                        value={jobtitle.name}
                        className={errors.name ? 'border-red-500' : 'readonly'}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
            </div>

            <AlertDialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Edit Data</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin mengedit data pegawai
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmEdit}>
                            Edit
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
