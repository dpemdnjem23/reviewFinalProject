export interface BoardFree{
    like?:[string]
    like_count:number;
    _id?:string;
    description?: string;
    title?: string
    user_id?: string;
 
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
  
}

export interface userUniqueSearchInput {
    email : string;
}
export interface Image {
    files ? : string;
}

export interface Userdata {
    _id?:string;
    email?:string
    nickname?:string
    user_id?:string
    is_like?:boolean
    iat?:number
    exp?:number
}