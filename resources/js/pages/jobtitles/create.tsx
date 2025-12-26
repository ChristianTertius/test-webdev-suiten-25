import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
    {
        title: 'Daftar Pegawai',
        href: '/jobtitles',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/jobtitles');
    };

    const handleBack = () => {
        router.get('/jobtitles');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pegawai" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={handleBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="font-bold text-2xl">Tambah Pegawai Baru</h1>
                        <p className="text-muted-foreground">TESTTTTTTTTTTTTTTTTTTTTT</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-neutral-primary-soft p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Informasi Pribadi */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Pegawai <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama pegawai"
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
                            {processing ? 'Menyimpan...' : 'Simpan Pegawai'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
