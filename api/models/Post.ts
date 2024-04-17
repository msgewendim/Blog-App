class Post {
  id: number;
  title: string;
  desc: string;
  img : string;
  category : string | undefined; 
  date : string | undefined;
  uid: number;
  
  constructor(id: number, title: string, desc: string, img: string, uid : number, category?: string, date?: string) {
    this.id = id;
    this.title = title;
    this.desc = desc;
    this.img = img;
    this.date = date;
    this.category = category;
    this.uid = uid;
  }
}
export default Post;