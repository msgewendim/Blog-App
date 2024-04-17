
export interface AuthAccess<T>{
    register(user : T) : Promise<T>;
    login(username : string, password : string) : Promise<T>;
    addGoogleUser(user : T) : Promise<T>;
}
