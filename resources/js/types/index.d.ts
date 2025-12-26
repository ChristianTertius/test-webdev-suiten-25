import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Employee {
    id: number;
    nama_pegawai: string;
    job_title_id: number;
    gaji_pokok: string;
    bagian: string;
    periode_gajian: string;
    nomor_telepon: string;
    gaji_harian: string;
    nomor_rekening: string;
    uang_makan: string;
    nama_rekening: string;
    uang_makan_tanggal_merah: number;
    bank: string;
    rate_lembur: number;
    shift: string;
    rate_lembur_tanggal_merah: number;
}

export interface JobTitle {
    id: number;
    name: string;
}
