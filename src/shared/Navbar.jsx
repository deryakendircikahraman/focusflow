import { NavLink } from 'react-router-dom'
import logo from '../assets/focusflow-logo.png'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img src={logo} alt="FocusFlow logo" className="navbar__logo" />
        <span className="navbar__title">FocusFlow</span>
      </div>
      <div className="navbar__links">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/planner"
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          Planner
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
          }
        >
          History
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar

