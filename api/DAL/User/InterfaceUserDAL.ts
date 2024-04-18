export interface UserDataAccess<T>{
    addUser(t:T):Promise<T>,
    deleteUser(id:number):Promise<number | null>,
    updateUser(id:number, updateUserData: Partial<T>):Promise<void>,
    getUser(username:string): Promise<T>,
    getAllUsers() : Promise<T[]>,
};