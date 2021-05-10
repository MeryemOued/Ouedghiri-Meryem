
export class Marchand {
   id?:string;
    matricule?: string;
    nom: string;
    adress?: string="";
    cin?: string ="";
    ntel?: string;
    nombreenfants?: number =0;
    activiter?: string ="";
    status?: boolean =false;
    datenaissance?: Date=new Date();
    soldecourant?: number=0;
    service?: string="";
}
