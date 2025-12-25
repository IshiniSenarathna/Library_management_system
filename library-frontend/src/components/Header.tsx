import React from "react"; 
import { Link } from "react-router-dom"; 
 
export default function Header() { 
  return ( 
    <header className="header"> 
      <div className="brand"> 
        <div className="logo">LB</div> 
        <div> 
          <h1>Library Manager</h1> 
          <small>React • Vite • TypeScript</small> 
        </div> 
      </div> 
      <nav> 
        <Link to="/">Books</Link> 
        <Link to="/add" className="btn-link">Add Book</Link> 
      </nav> 
    </header> 
  ); 
}