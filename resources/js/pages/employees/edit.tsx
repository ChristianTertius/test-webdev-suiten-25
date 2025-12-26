import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { ArrowLeft, PlusIcon } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: dashboard().url,
    },
    {
        title: 'Daftar Pegawai',
        href: '/employees',
    },
    {
        title: 'Edit Pegawai',
    },
];

const periodeGajianOptions = [
    { value: 'Mingguan', label: 'Mingguan' },
    { value: '2 Minggu', label: '2 Minggu (Bi-weekly)' },
    { value: 'Bulanan', label: 'Bulanan' },
    { value: 'Harian', label: 'Harian' },
];

interface Employee {
    id: number;
    nama_pegawai: string;
    job_title_id: number;
    nomor_telepon: string;
    nama_rekening: string;
    nomor_rekening: string;
    bank_id: number;
    shift_id: number;
    periode_gajian: string;
    gaji_pokok: string;
    gaji_harian: string;
    uang_makan: string;
    uang_makan_tanggal_merah: string;
    rate_lembur: string;
    rate_lembur_tanggal_merah: string;
}

interface Props {
    employee: Employee;
    jobtitles: Array<{ id: number; name: string }>;
    banks: Array<{ id: number; name: string }>;
    shifts: Array<{ id: number; name: string }>;
}

export default function Edit({ employee, jobtitles, banks, shifts }: Props) {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        nama_pegawai: employee.nama_pegawai || '',
        job_title_id: employee.job_title_id?.toString() || '',
        nomor_telepon: employee.nomor_telepon || '',
        nama_rekening: employee.nama_rekening || '',
        nomor_rekening: employee.nomor_rekening || '',
        bank_id: employee.bank_id?.toString() || '',
        shift_id: employee.shift_id?.toString() || '',
        periode_gajian: employee.periode_gajian || '',
        gaji_pokok: employee.gaji_pokok || '',
        gaji_harian: employee.gaji_harian || '',
        uang_makan: employee.uang_makan || '',
        uang_makan_tanggal_merah: employee.uang_makan_tanggal_merah || '',
        rate_lembur: employee.rate_lembur || '',
        rate_lembur_tanggal_merah: employee.rate_lembur_tanggal_merah || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowConfirmDialog(true);
    };

    const handleConfirmUpdate = () => {
        put(`/employees/${employee.id}`);
        setShowConfirmDialog(false);
    };

    const handleAddJobTitle = () => {
        router.get('/jobtitles/create');
    };

    const handleBack = () => {
        router.get('/employees');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit - ${employee.nama_pegawai}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={handleBack}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="font-bold text-2xl">Edit Pegawai</h1>
                        <p className="text-muted-foreground">Perbarui informasi pegawai</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-neutral-primary-soft p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Informasi Pribadi */}
                        <div className="space-y-2">
                            <Label htmlFor="nama_pegawai">Nama Pegawai <span className="text-red-500">*</span></Label>
                            <Input
                                id="nama_pegawai"
                                value={data.nama_pegawai}
                                onChange={(e) => setData('nama_pegawai', e.target.value)}
                                placeholder="Masukkan nama pegawai"
                                className={errors.nama_pegawai ? 'border-red-500' : ''}
                            />
                            {errors.nama_pegawai && <p className="text-sm text-red-500">{errors.nama_pegawai}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gaji_pokok">Gaji Pokok</Label>
                            <Input
                                id="gaji_pokok"
                                type="number"
                                value={data.gaji_pokok}
                                onChange={(e) => setData('gaji_pokok', e.target.value)}
                                placeholder="0"
                            />
                        </div>

                        {jobtitles && jobtitles.length > 0 ? (
                            <div className="space-y-2">
                                <Label htmlFor="job_title_id">Bagian</Label>
                                <div className="flex items-center gap-2">
                                    <div className="w-full">
                                        <Select
                                            value={data.job_title_id}
                                            onValueChange={(value) => setData('job_title_id', value)}
                                        >
                                            <SelectTrigger className={errors.job_title_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih Bagian" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jobtitles.map((jobtitle) => (
                                                    <SelectItem key={jobtitle.id} value={jobtitle.id.toString()}>
                                                        {jobtitle.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" onClick={handleAddJobTitle}>
                                        <PlusIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                {errors.job_title_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.job_title_id}</p>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <Label>Bagian <span className="text-red-500">*</span></Label>
                                <p className="text-sm text-muted-foreground">Tidak ada data job title. Silakan tambahkan terlebih dahulu.</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="periode_gajian">Periode Gajian</Label>
                            <Select
                                value={data.periode_gajian}
                                onValueChange={(value) => setData('periode_gajian', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Periode Gajian" />
                                </SelectTrigger>
                                <SelectContent>
                                    {periodeGajianOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nomor_telepon">Nomor Telepon</Label>
                            <Input
                                id="nomor_telepon"
                                value={data.nomor_telepon}
                                onChange={(e) => setData('nomor_telepon', e.target.value)}
                                placeholder="Masukkan nomor telepon"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gaji_harian">Gaji Harian</Label>
                            <Input
                                id="gaji_harian"
                                type="number"
                                value={data.gaji_harian}
                                onChange={(e) => setData('gaji_harian', e.target.value)}
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nomor_rekening">Nomor Rekening</Label>
                            <Input
                                id="nomor_rekening"
                                value={data.nomor_rekening}
                                onChange={(e) => setData('nomor_rekening', e.target.value)}
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="uang_makan">Uang Makan</Label>
                            <Input
                                id="uang_makan"
                                type="number"
                                value={data.uang_makan}
                                onChange={(e) => setData('uang_makan', e.target.value)}
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nama_rekening">Nama Rekening</Label>
                            <Input
                                id="nama_rekening"
                                value={data.nama_rekening}
                                onChange={(e) => setData('nama_rekening', e.target.value)}
                                placeholder="Masukkan nama rekening"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="uang_makan_tanggal_merah">Uang Makan (Tanggal Merah)</Label>
                            <Input
                                id="uang_makan_tanggal_merah"
                                type="number"
                                value={data.uang_makan_tanggal_merah}
                                onChange={(e) => setData('uang_makan_tanggal_merah', e.target.value)}
                                placeholder="0"
                            />
                        </div>

                        {banks && banks.length > 0 && (
                            <div className="space-y-2">
                                <Label htmlFor="bank_id">Bank</Label>
                                <div className="flex items-center gap-2">
                                    <div className="w-full">
                                        <Select
                                            value={data.bank_id}
                                            onValueChange={(value) => setData('bank_id', value)}
                                        >
                                            <SelectTrigger className={errors.bank_id ? 'border-red-500' : ''}>
                                                <SelectValue placeholder="Pilih Bank" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {banks.map((bank) => (
                                                    <SelectItem key={bank.id} value={bank.id.toString()}>
                                                        {bank.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" onClick={() => router.get('/banks/create')}>
                                        <PlusIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                                {errors.bank_id && (
                                    <p className="text-red-500 text-sm mt-1">{errors.bank_id}</p>
                                )}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="rate_lembur">Rate Lembur</Label>
                            <Input
                                id="rate_lembur"
                                type="number"
                                value={data.rate_lembur}
                                onChange={(e) => setData('rate_lembur', e.target.value)}
                                placeholder="0"
                            />
                        </div>

                        {shifts && shifts.length > 0 && (
                            <div className="space-y-2">
                                <Label htmlFor="shift_id">Shift</Label>
                                <div className="flex items-center gap-2">
                                    <div className="w-full">
                                        <Select
                                            value={data.shift_id}
                                            onValueChange={(value) => setData('shift_id', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Shift" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {shifts.map((shift) => (
                                                    <SelectItem key={shift.id} value={shift.id.toString()}>
                                                        {shift.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" onClick={() => router.get('/shifts/create')}>
                                        <PlusIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="rate_lembur_tanggal_merah">Rate Lembur (Tanggal Merah)</Label>
                            <Input
                                id="rate_lembur_tanggal_merah"
                                type="number"
                                value={data.rate_lembur_tanggal_merah}
                                onChange={(e) => setData('rate_lembur_tanggal_merah', e.target.value)}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <Button type="button" variant="outline" onClick={handleBack}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Update Pegawai'}
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
                            Apakah Anda yakin ingin menyimpan perubahan data pegawai <strong>{data.nama_pegawai}</strong>?
                            Pastikan semua data sudah benar sebelum menyimpan.
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
