export interface BoardFree{
    description: string;
    title: string;
    user_id: string;
 
}

export interface IUserInputDTO {
    name: string;
    email: string;
    password: string;
    avatar?: string;
    date?: Date;
}

export interface userUniqueSearchInput {
    email : string;
}
export interface image {
    image : string;
}