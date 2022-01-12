import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Logo from './phoenix.png'
import DashboardStyles from './Dasboard.Module.css'
import { logout } from '../../redux/actions/userActions'
import { NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Dashboard = ({ history }) => {
  const [isSidenav, setSidenavOpen] = useState(false)
  const [isSearchBar, setSearchBar] = useState(true)
  const [isMobileNavBar, setMobileNavBarOpen] = useState(false)
  const [isHamburgerbarBlack, setHamburgerWhite] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const handleToggleMenu = () => {
    setSidenavOpen(!isSidenav)
    setSearchBar(!isSearchBar)
    setMobileNavBarOpen(!isMobileNavBar)
    setHamburgerWhite(!isHamburgerbarBlack)
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  // if (userInfo.roles === 'admin') {
  //   history.push('/admin/dashboard')
  // } else {
  //   history.push('/login')
  // }

  return (
    <div className={DashboardStyles.body}>
      <div className={DashboardStyles.container}>
        <div
          className={
            (isMobileNavBar
              ? DashboardStyles.navigationMobile
              : DashboardStyles.navigationMobileActive,
            isSidenav
              ? DashboardStyles.navigationActive
              : DashboardStyles.navigation)
          }
        >
          <ul className={DashboardStyles.navigationLinkUnorderedList}>
            <li className={DashboardStyles.navigationList}>
              <Link className={DashboardStyles.navigationLink} to=''>
                <span className={DashboardStyles.navigationLinkIcon}>
                  <img
                    className={DashboardStyles.navigationImage}
                    src={Logo}
                    alt='phoenix'
                  />
                </span>
              </Link>
            </li>
            <li className={DashboardStyles.navigationList}>
              <Link className={DashboardStyles.navigationLink} to=''>
                <span className={DashboardStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-home ${DashboardStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={DashboardStyles.navigationTitle}>
                  Dashboard
                </span>
              </Link>
            </li>
            <li className={DashboardStyles.navigationList}>
              <Link
                className={DashboardStyles.navigationLink}
                to='/admin/users'
              >
                <span className={DashboardStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-users ${DashboardStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={DashboardStyles.navigationTitle}>Users</span>
              </Link>
            </li>
            <li className={DashboardStyles.navigationList}>
              <Link className={DashboardStyles.navigationLink} to='#'>
                <span className={DashboardStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-comment ${DashboardStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={DashboardStyles.navigationTitle}>Reviews</span>
              </Link>
            </li>
            <li className={DashboardStyles.navigationList}>
              <Link
                className={DashboardStyles.navigationLink}
                to='/admin/products'
              >
                <span className={DashboardStyles.navigationLinkIcon}>
                  <i
                    className={`fab fa-product-hunt ${DashboardStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={DashboardStyles.navigationTitle}>
                  Products
                </span>
              </Link>
            </li>
            <li className={DashboardStyles.navigationList}>
              <Link
                className={DashboardStyles.navigationLink}
                to='/admin/orders'
              >
                <span className={DashboardStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-credit-card ${DashboardStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={DashboardStyles.navigationTitle}>Orders</span>
              </Link>
            </li>
            <li className={DashboardStyles.navigationList}>
              <Link className={DashboardStyles.navigationLink} to='#'>
                <span className={DashboardStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-cog ${DashboardStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={DashboardStyles.navigationTitle}>
                  Settings
                </span>
              </Link>
            </li>

            <li className={DashboardStyles.navigationList}>
              <Link className={DashboardStyles.navigationLink} to=''>
                <span className={DashboardStyles.navigationLinkIcon}>
                  <i
                    className={`fas fa-sign-out-alt ${DashboardStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span
                  className={DashboardStyles.navigationTitle}
                  onClick={logoutHandler}
                >
                  Sign Out
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={
          isSearchBar ? DashboardStyles.main : DashboardStyles.mainActive
        }
      >
        <div className={DashboardStyles.topbar}>
          <div
            className={
              isHamburgerbarBlack
                ? DashboardStyles.toggle
                : DashboardStyles.toggleChange
            }
            onClick={handleToggleMenu}
          ></div>
          <div className={DashboardStyles.search}>
            <label htmlFor='' className={DashboardStyles.labelForm}>
              <input
                className={DashboardStyles.inputForm}
                type='text'
                placeholder='Search'
              />
              <i
                className={`fa fa-search ${DashboardStyles.iconSearch}`}
                aria-hidden='true'
              ></i>
            </label>
          </div>
          <div>
            <NavDropdown title={userInfo?.user?.username} id='username'>
              <LinkContainer to={`/profile`}>
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>

              <NavDropdown.Item onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
        <div className={DashboardStyles.informationContainer}>
          <div className={DashboardStyles.dailyViewsContainer}>
            <div className={DashboardStyles.statsContainer}>
              <p className={DashboardStyles.values}>832</p>
              <p className={DashboardStyles.titles}>Daily Views</p>
            </div>
            <div className={DashboardStyles.iconContainer}>
              <i
                className={`fa fa-eye  ${DashboardStyles.icon}`}
                aria-hidden='true'
              ></i>
            </div>
          </div>
          <div className={DashboardStyles.salesContainer}>
            <div className={DashboardStyles.statsContainer}>
              <p className={DashboardStyles.values}>46</p>
              <p className={DashboardStyles.titles}>Sales</p>
            </div>
            <div className={DashboardStyles.iconContainer}>
              <i
                className={`fa fa-shopping-cart  ${DashboardStyles.icon}`}
                aria-hidden='true'
              ></i>
            </div>
          </div>
          <div className={DashboardStyles.commentsContainer}>
            <div className={DashboardStyles.statsContainer}>
              <p className={DashboardStyles.values}>101</p>
              <p className={DashboardStyles.titles}>Comments</p>
            </div>
            <div className={DashboardStyles.iconContainer}>
              <i
                className={`fa fa-comment  ${DashboardStyles.icon}`}
                aria-hidden='true'
              ></i>
            </div>
          </div>
          <div className={DashboardStyles.earningContainer}>
            <div className={DashboardStyles.statsContainer}>
              <p className={DashboardStyles.values}>₦702,432</p>
              <p className={DashboardStyles.titles}>Earnings</p>
            </div>
            <div className={DashboardStyles.iconContainer}>
              <i
                className={`fa fa-money  ${DashboardStyles.icon}`}
                aria-hidden='true'
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
