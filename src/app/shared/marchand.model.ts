
export class Marchand {
    idMerchant?:number;
    matricule?: string;
    marchand_code?: string;

    firstname: string;
    lastname: string;
    Address?: string="";
    cin?: string ="";
    phoneNumber?: string="";
    childrenNumber?: number =0;
    
    // activiter?: string ="";
    statue?: boolean =false;
    dateBirth?: Date=new Date();
    monthly?: number=0;
    // service?: string="";
    Attachment?: string
    // pj?: string="";
}
