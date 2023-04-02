import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

function Navbar() {
  const { theme, setTheme } = useContext(GlobalContext);

  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary mb-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Paycat
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Transactions
              </a>
            </li>
          </ul>
          <button
            className={`btn btn-${theme === "dark" ? "light" : "dark"}`}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
