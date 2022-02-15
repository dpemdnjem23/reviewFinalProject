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