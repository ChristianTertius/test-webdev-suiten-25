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
        title: 'Daftar Bank',
        href: '/banks',
    },
    {
        title: 'Edit Bank',
    },
];

interface Bank {
    id: number;
    name: string;
}

interface Props {
    bank: Bank;
}

export default function Edit({ bank }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: bank.name || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/banks/${bank.id}`);
    };

    const handleBack = () => {
        router.get('/banks');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit - ${bank.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={handleBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="font-bold text-2xl">Edit Bank</h1>
                        <p className="text-muted-foreground">Perbarui informasi bank</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-neutral-primary-soft rounded-xl border border-default p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Bank <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Bank BCA"
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
                            {processing ? 'Menyimpan...' : 'Update Bank'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
