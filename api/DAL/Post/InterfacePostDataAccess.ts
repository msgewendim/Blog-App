export interface DataAccess<T>{
    addPost(t:T):Promise<T>,
    deletePost(id:number):Promise<number | null>,
    updatePost(id:number, updateData: Partial<T>):Promise<T>,
    getPost(id:number): Promise<T>,
    getAllPosts():Promise<T[]>

}
/*
This layer of the INTERFACE defines the behavior of Class DataAccess,
defines the methods and what each methods takes, 
*/