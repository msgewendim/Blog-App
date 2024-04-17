import homeImg from '/images/homeImg.png';

const Home = () => {
  
  return (
    <div className="mainPage">
      <h1>WELCOME TO MY-BLOG</h1>
      <img src={homeImg} alt="blog" />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Nisi totam saepe cupiditate perspiciatis est 
        perferendis molestias iure minima. Eos, ea.
      </p>
    </div>  
  )
}

export default Home