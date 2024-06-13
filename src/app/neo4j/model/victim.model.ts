export interface KillerModel {
    id?: string;
    firstname?: string;
    lastname?: string;
    label?: string;
    image?:string;
    birthday?:string;
    placeOfBirthday?:string;
    country?:string;
    nationality?:string;
    victimsOfKiller?: number;
    workPeriodStart?: string;
    workPeriodEnd?: string;
    convicted?: [string],
    summary?: string
}
