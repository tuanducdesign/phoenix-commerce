import React, { useState } from 'react'
import './Header.css'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import image from './phoenix.png'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown } from 'react-bootstrap'
import { logout } from '../../redux/actions/userActions'
import SearchBox from '../SearchBox'

const Header = () => {
  const [menuBar, setMenuBar] = useState(false)
  const [cart, setCart] = useState(false)
  // const [search, setSearch] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <nav className='navbar'>
      <Link to='/' className='logo mb-2'>
        <img src={image} height={60} width={100} alt='Phoenix Store' />
      </Link>
      <ul className={menuBar ? 'nav-links-mobile' : 'nav-links'}>
        <Link
          to='/products'
          className='category-pro'
          onClick={() => setMenuBar(false)}
        >
          <li>Products</li>
        </Link>

        <Route
          render={({ history }) => (
            <SearchBox
              history={history}
              // className={search ? 'search' : 'search-mobile'}
            />
          )}
        />
        <Link to='/cart' className='category me-3 ca'>
          <li>
            <i className='fas fa-shopping-cart' />
          </li>
        </Link>
        {userInfo ? (
          <NavDropdown title={userInfo.name} id='username'>
            {userInfo && userInfo.isAdmin && (
              <LinkContainer to='/admin/dashboard'>
                <NavDropdown.Item>Dashboard</NavDropdown.Item>
              </LinkContainer>
            )}
            <LinkContainer to='/profile'>
              <NavDropdown.Item>Profile</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Link to='/login' className='signup ms-3'>
            <li>Login/Register</li>
          </Link>
        )}
      </ul>
      <Link
        to='/cart'
        className={cart ? 'cart' : 'cart-mobile'}
        onClick={() => {
          setMenuBar(false)
          setCart(false)
        }}
      >
        <i className='fas fa-shopping-cart' />
      </Link>
      <button className='mobile-menu-icon' onClick={() => setMenuBar(!menuBar)}>
        {menuBar ? (
          <i className='fas fa-times'></i>
        ) : (
          <i className='fas fa-bars'></i>
        )}
      </button>
    </nav>
  )
}

export default Header
