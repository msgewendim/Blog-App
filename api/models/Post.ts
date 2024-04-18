class Post {
  id: number;
  title: string;
  desc: string;
  img : string;
  category : string | undefined; 
  date : undefined;
  uid: number;
  
  constructor(id: number, title: string, desc: string, img: string, uid : number, category?: string) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.img = img;
    this.category = category;
    this.uid = uid;
  }
}
export default Post;