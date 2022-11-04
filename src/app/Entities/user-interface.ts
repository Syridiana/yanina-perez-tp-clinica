export interface UserI {
    uid?: string;
    type:string|undefined;
    email:string|undefined;
    name: string | undefined;
    lastName: string | undefined;
    age: string | undefined;
    id: string | undefined;
    specialty?: string | undefined;
    healthInsurance?:string|undefined;
    photo_1?:string|undefined;
    photo_2?:string|undefined;
    verified?: boolean;
    startShift?: string | undefined;
    endShift?: string | undefined;
}
