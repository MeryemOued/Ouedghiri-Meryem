import { Marchand } from "../marchand.model";

export class Operations {
    requeset_id ?:string;
    idMerchant ?:number;
    amount : string;
    fees :number;
    marchand_code : string ;
    hmac : string ;
    json_data? :string ;
    token? :string;
    status? :boolean;
    date_expiration? : string ;
    date_request? : string;
    merchant :Marchand;
    // token : string;
}
