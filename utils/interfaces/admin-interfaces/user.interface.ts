export interface UserInterface {
    _id : string;
    username : string;
    email: string;
    nationalCode : string;
    mobile : string;
    province : string;
    city : string;
    address? : string;
    createdAt : Date;
    userRegister : number
    userLevel : number;
}

// export interface UserLevelInterface {
//     _id : string;
//     userId : string;
//     userLevelRate : number;
//     userLevelName : string;
//     createdAt : Date;
//     updatedAt : Date;
// }