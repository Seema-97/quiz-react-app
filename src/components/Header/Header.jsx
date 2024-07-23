import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
 const navMenu = [
    {
        pathName : 'Home' ,
        RouteLink : '/home'
    } ,
    {
        pathName : 'Questions' ,
        RouteLink : '/questions'
    },
    {
        pathName : 'Quiz' ,
        RouteLink : '/quiz'
    }
 ] ;

const Header = () => {
    
      const navigate = useNavigate()
   const handleNavigate = (path) => {
        navigate(path) ;
   }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#" style={{marginLeft : "150px"}}>
      Navbar
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{marginLeft : "20px"}}>
          {navMenu.map(item => (
            <Fragment key={item.RouteLink}>
                <li className="nav-item">
             <a className="nav-link active" aria-current="page" href="#" role='button' onClick={() => handleNavigate(item.RouteLink)}>
              {item.pathName}
             </a>
           </li>
            </Fragment>
          )) }
      </ul>
      {/* <div className="d-flex" style={{marginRight : "300px"}}>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </div> */}
    </div>
  </div>
</nav>

  )
}

export default Header