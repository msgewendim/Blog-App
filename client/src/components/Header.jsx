import { useContext, useState } from 'react';
import favicon from '/favicon.ico';
import {Link} from "react-router-dom";
import { AuthContext } from '../providers/authProvider';
import Select from "react-select"
import { BlogContext } from '../providers/blogProvider';


const options = [
  { value: 'Art', label: 'ART' },
  { value: 'Food', label: 'FOOD' },
  { value: 'Design', label: 'DESIGN' },
  { value: 'Tech', label: 'TECH' },
  { value: 'Cinema', label: 'CINEMA' },
  { value: 'Science', label: 'SCIENCE' },
]
const Header = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [filter, setFilter] = useState('');
  const {logout, currentUser} = useContext(AuthContext);
  const {setPosts} = useContext(BlogContext);

  const buildUrl = () =>{
    let url = '';
    if (selectedOption) {
      url += `?cat=${selectedOption.value}`;
    }
    if (filter) url += `&filter=${filter}`;
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
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

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
          <Link className='link' to={"/posts"}><h6 onClick={fetchPosts}>Posts</h6></Link>
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
         {currentUser ? (<span onClick={logout}>Logout</span>) : (<Link to={"/login"} className='link'>Login</Link>)}
          {
          currentUser ? (<span className='write'><Link to={`/write`} className='link'>Write</Link></span>) : (null)
          }
          </div>
        </div>
      </div>
  )
}

export default Header;

