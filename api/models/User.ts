class User {
    id : number;
    username : string;
    email : string;
    password : string;
    img : string;

    constructor(id : number , username : string, email : string, password : string, img : string) {
        this.id = id; 
        this.username = username;
        this.email = email;
        this.password =password; 
        this.img = img
    }
}


export interface GoogleRefreshToken {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    id_token: string;
}

export interface GoogleUser {
  id: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}
export default User;