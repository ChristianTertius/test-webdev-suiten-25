import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
    {
        title: 'Daftar Bagian',
        href: '/jobtitles',
    },
    {
        title: 'Edit Bagian',
    },
];

interface JobTitle {
    id: number;
    name: string;
}

interface Props {
    jobtitle: JobTitle;
}

export default function Edit({ jobtitle }: Props) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        name: jobtitle.name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmDialog(true);
    };

    const handleConfirmUpdate = () => {
        put(`/jobtitles/${jobtitle.id}`);
        setShowConfirmDialog(false);
    };

    const handleBack = () => {
        router.get('/jobtitles');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit - ${jobtitle.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={handleBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="font-bold text-2xl">Edit Bagian</h1>
                        <p className="text-muted-foreground">Perbarui informasi bagian</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-neutral-primary-soft rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Bagian <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama bagian"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <Button type="button" variant="outline" onClick={handleBack}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Update Bagian'}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Update Data</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menyimpan perubahan bagian <strong>{data.name}</strong>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmUpdate} disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Ya, Update'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
