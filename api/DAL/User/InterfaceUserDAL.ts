export interface UserDataAccess<T>{
    addUser(t:T):Promise<T>,
    deleteUser(id:number):Promise<void>,
    updateUser(id:number, updateUserData: Partial<T>):Promise<void>,
    getUser(username:string): Promise<T>,
    getAllUsers() : Promise<T[]>,
};