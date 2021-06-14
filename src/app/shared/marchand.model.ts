import { Activity } from "./model/activity";
import { Platform } from "./model/platform";

export class Marchand {
    idMerchant?:number;
    IdPlatform?:number;
    idActivity?:number;
    matricule?: string;
    marchand_code?: string;
    firstname: string;
    lastname: string;
    Address?: string="";
    cin?: string ="";
    phoneNumber?: string="";
    childrenNumber?: number =0;
    activities :Activity;
       statue ?: boolean =false;
    dateBirth?: Date=new Date();
    monthly?: number=0;
    Attachment?: string;
    platforms :Platform;
}
