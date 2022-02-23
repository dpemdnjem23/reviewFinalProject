export interface BoardFree{
    description: string;
    title: string;
    user_id: string;
 
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
  
}

export interface userUniqueSearchInput {
    email : string;
}
export interface image {
    files ? : string;
}

export interface Userdata {

    email?:String,
    nickname?:String,
    user_id?:String,
    iat?:number,
    exp?:number
}