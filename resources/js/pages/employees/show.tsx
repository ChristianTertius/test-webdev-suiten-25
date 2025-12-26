import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Pencil, TrashIcon } from 'lucide-react';

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
        title: 'Detail Pegawai',
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

export default function Show({ employee, jobtitles, banks, shifts }: Props) {
    const handleBack = () => {
        router.get('/employees');
    };

    const handleEdit = () => {
        router.get(`/employees/${employee.id}/edit`);
    };

    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus pegawai ini?')) {
            router.delete(`/employees/${employee.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail - ${employee.nama_pegawai}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={handleBack}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="font-bold text-2xl">Detail Pegawai</h1>
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

                <div className="bg-neutral-primary-soft p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Informasi Pribadi */}
                        <div className="space-y-2">
                            <Label htmlFor="nama_pegawai">Nama Pegawai <span className="text-red-500">*</span></Label>
                            <Input
                                id="nama_pegawai"
                                value={employee.nama_pegawai}
                                disabled
                                placeholder="Masukkan nama pegawai"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gaji_pokok">Gaji Pokok</Label>
                            <Input
                                id="gaji_pokok"
                                type="number"
                                value={employee.gaji_pokok}
                                disabled
                                placeholder="0"
                            />
                        </div>

                        {jobtitles && jobtitles.length > 0 ? (
                            <div className="space-y-2">
                                <Label htmlFor="job_title_id">Bagian</Label>
                                <Select
                                    value={employee.job_title_id?.toString()}
                                    disabled
                                >
                                    <SelectTrigger>
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
                        ) : (
                            <div className="space-y-2">
                                <Label>Bagian <span className="text-red-500">*</span></Label>
                                <p className="text-sm text-muted-foreground">Tidak ada data job title.</p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="periode_gajian">Periode Gajian</Label>
                            <Select
                                value={employee.periode_gajian}
                                disabled
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
                                value={employee.nomor_telepon}
                                disabled
                                placeholder="Masukkan nomor telepon"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="gaji_harian">Gaji Harian</Label>
                            <Input
                                id="gaji_harian"
                                type="number"
                                value={employee.gaji_harian}
                                disabled
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nomor_rekening">Nomor Rekening</Label>
                            <Input
                                id="nomor_rekening"
                                value={employee.nomor_rekening}
                                disabled
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="uang_makan">Uang Makan</Label>
                            <Input
                                id="uang_makan"
                                type="number"
                                value={employee.uang_makan}
                                disabled
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nama_rekening">Nama Rekening</Label>
                            <Input
                                id="nama_rekening"
                                value={employee.nama_rekening}
                                disabled
                                placeholder="Masukkan nama rekening"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="uang_makan_tanggal_merah">Uang Makan (Tanggal Merah)</Label>
                            <Input
                                id="uang_makan_tanggal_merah"
                                type="number"
                                value={employee.uang_makan_tanggal_merah}
                                disabled
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bank_id">Bank</Label>
                            <Select
                                value={employee.bank_id?.toString()}
                                disabled
                            >
                                <SelectTrigger>
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

                        <div className="space-y-2">
                            <Label htmlFor="rate_lembur">Rate Lembur</Label>
                            <Input
                                id="rate_lembur"
                                type="number"
                                value={employee.rate_lembur}
                                disabled
                                placeholder="0"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="shift_id">Shift</Label>
                            <Select
                                value={employee.shift_id?.toString()}
                                disabled
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

                        <div className="space-y-2">
                            <Label htmlFor="rate_lembur_tanggal_merah">Rate Lembur (Tanggal Merah)</Label>
                            <Input
                                id="rate_lembur_tanggal_merah"
                                type="number"
                                value={employee.rate_lembur_tanggal_merah}
                                disabled
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <Button type="button" variant="outline" onClick={handleBack}>
                            Kembali
                        </Button>
                        <Button onClick={handleEdit}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Pegawai
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
