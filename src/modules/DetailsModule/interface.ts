import { BukuSihir } from "../HomePageModule/interface";


export interface ResponseDetailBukuSihir {
    status: boolean;
    message: string;
    bukuSihir: BukuSihir;
}
