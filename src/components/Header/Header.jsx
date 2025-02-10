import { Fragment} from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useMyContext } from "../../context/ContextProvider";
import { signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { auth} from "../../firebase.config";
const navMenu = [
  {
    pathName: "Home",
    RouteLink: "/",
  },
  {
    pathName: "Questions",
    RouteLink: "/questions",
  },
];

const Header = () => {
  const useMyContextValue = useMyContext();
  const {
    setQuestionData,
    isloggedIn,
    setIsLoggedIn,
    getQuestions,
    setIsQuizStarted,
    setIsAttemptVisible 
  } = useMyContextValue;

  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };

  const provider = new GoogleAuthProvider();

  const handleSignInOnClick = async () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    let data = {
      userName: result.user.displayName,
      userEmail: result.user.email,
      uid: result.user.uid,
    }
    localStorage.setItem("credentials", JSON.stringify(data));
    setIsLoggedIn(true);
    getQuestions();
  })
  .catch((error) => {
    console.log(error);
  });
   
  };

  const handleLogOut = async() => {
    await auth.signOut();
    localStorage.removeItem("credentials");
    setQuestionData(null);
    setIsLoggedIn(false);
    setIsQuizStarted(false);
    setIsAttemptVisible(false);
  };
 
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "rgb(134, 214, 134)" }}
    >
      <div className="container-fluid">
        <div
          className="navbar-brand d-flex align-items-center justify-content-center"
          href="#"
          style={{ marginLeft: "150px" }}
        >
          <img src={logo} alt="" width={50} />
          <p>Quize Bee</p>
        </div>
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
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0"
            style={{ marginLeft: "20px" }}
          >
            {navMenu.map((item) => (
              <Fragment key={item.RouteLink}>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="#"
                    role="button"
                    onClick={() => handleNavigate(item.RouteLink)}
                  >
                    {item.pathName}
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
          {isloggedIn ? (
            <div className="d-flex" style={{ marginRight: "300px" }}>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={() => {
                  handleLogOut();
                }}
              >
                Logout
              </button>
              {JSON.parse(localStorage.getItem('credentials')).userName}
            </div>
          ) : (
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSignInOnClick}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
