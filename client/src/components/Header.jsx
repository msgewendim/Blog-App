import { useContext, useState } from 'react';
import favicon from '/favicon.ico';
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../providers/authProvider';
import Select from "react-select"
import { BlogContext } from '../providers/blogProvider';


const options = [
  { value: 'art', label: 'ART' },
  { value: 'food', label: 'FOOD' },
  { value: 'design', label: 'DESIGN' },
  { value: 'tech', label: 'TECH' },
  { value: 'cinema', label: 'CINEMA' },
  { value: 'science', label: 'SCIENCE' },
]
const Header = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [filter, setFilter] = useState('');
  const {logout, currentUser} = useContext(AuthContext);
  const {setPosts} = useContext(BlogContext);
  const navigate = useNavigate();
  const buildUrl = () =>{
    let url = '?';
    if (selectedOption && filter) {
      url += `cat=${selectedOption.value}&filter=${filter}`;
    }
    if (selectedOption) url += `cat=${selectedOption.value}`
    if (filter) url += `filter=${filter}`;
    return url
  }

  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilter(value);
  };
  
  const fetchPosts = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/posts${buildUrl()}`, {
        method : "GET",
      });
      if(!response.ok) return Error("fetching failed!");
      const data = await response.json();
      const { posts } = data;
      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };

  const refresh = async () =>{
    // refresh posts at same page
    await fetchPosts();
    navigate(0)
  }
  const handleLogout = () => {
    logout();
    navigate("/login");
  }
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to={"/"}>
            <img src={favicon} alt="logo" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to={"/"}><h6>Home</h6></Link>
          <Link className='link' to={"/posts"}><h6 onClick={refresh}>Posts</h6></Link>
          <Link className='link' to={"/about"}><h6>About</h6></Link>
          <div className="search">
            <Select
              placeholder = "Category"
              defaultValue={selectedOption} // Set a default selected option
              isClearable={true} // Allow clearing the selection
              options={options}
              onChange={setSelectedOption}
            />
            <input
              type="text"
              placeholder="Filter"
              value={filter}
              onChange={handleFilterChange}
            />
            <Link to={buildUrl()} onClick={(event) => {event.preventDefault(); fetchPosts()}}><button className='link'>Search</button></Link>
          </div> 
          <span>{currentUser?.username}</span>
         {currentUser ? (<span onClick={handleLogout}>Logout</span>) : (<Link to={"/login"} className='link'>Login</Link>)}
          {
          currentUser ? (<span className='write'><Link to={`/write`} className='link'>Write</Link></span>) : (null)
          }
          </div>
        </div>
      </div>
  )
}

export default Header;

