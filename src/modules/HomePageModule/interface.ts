type TipeSihir = 'ELEMENTAL' | 'KUTUKAN' | 'PENYEMBUHAN'
type status = 'TERSEDIA' | 'DIPINJAM' | 'HILANNG'

export interface ResponseBukuSihir {
    status: boolean;
    message: string;
    bukuSihir: BukuSihir[];
}

export interface BukuSihir {
    id: string;
    judul: string;
    deskripsi: string;
    tipeSihir: TipeSihir;
    jumlah: number;
    status: status;
    createdAt: string;
    updatedAt: string;
}
