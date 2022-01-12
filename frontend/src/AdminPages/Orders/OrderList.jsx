import React, { useState, useEffect } from 'react'
import DisplayProductStyles from './DisplayProducts.Module.css'
import { Table, Button, NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { listOrders } from '../../redux/actions/orderActions'
// import Image from 'react-bootstrap/Image';
import Logo from './phoenix.png'

import { logout } from '../../redux/actions/userActions'

const OrderListPage = ({ history }) => {
  const [isSidenav, setSidenavOpen] = useState(false)
  const [isSearchBar, setSearchBar] = useState(true)
  const [isMobileNavBar, setMobileNavBarOpen] = useState(false)
  const [isHamburgerbarBlack, setHamburgerWhite] = useState(false)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  const handleToggleMenu = () => {
    setSidenavOpen(!isSidenav)
    setSearchBar(!isSearchBar)
    setMobileNavBarOpen(!isMobileNavBar)
    setHamburgerWhite(!isHamburgerbarBlack)
  }

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList
  console.log('orderLIST::', orders)

  useEffect(() => {
    dispatch(listOrders())
  }, [dispatch, successDelete])

  // useEffect(() => {
  //   if (userInfo?.roles === 'admin') {
  //     dispatch(listUsers())
  //   } else {
  //     history.push('/login')
  //   }
  // }, [dispatch, history, userInfo?.roles])

  const logoutHandler = () => {
    dispatch(logout())
    history.push('/')
  }

  return (
    <div>
      <div className={DisplayProductStyles.body}>
        <div className={DisplayProductStyles.container}>
          <div
            className={
              (isMobileNavBar
                ? DisplayProductStyles.navigationMobile
                : DisplayProductStyles.navigationMobileActive,
              isSidenav
                ? DisplayProductStyles.navigationActive
                : DisplayProductStyles.navigation)
            }
          >
            <ul className={DisplayProductStyles.navigationLinkUnorderedList}>
              <li className={DisplayProductStyles.navigationList}>
                <Link className={DisplayProductStyles.navigationLink} to='/'>
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <img
                      className={DisplayProductStyles.navigationImage}
                      src={Logo}
                      alt='phoenix'
                    />
                  </span>
                </Link>
              </li>
              <li className={DisplayProductStyles.navigationList}>
                <Link
                  className={DisplayProductStyles.navigationLink}
                  to='/admin/dashboard'
                >
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fa fa-home ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span className={DisplayProductStyles.navigationTitle}>
                    Dashboard
                  </span>
                </Link>
              </li>
              <li className={DisplayProductStyles.navigationList}>
                <Link
                  className={DisplayProductStyles.navigationLink}
                  to='/admin/users'
                >
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fa fa-users ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span className={DisplayProductStyles.navigationTitle}>
                    Users
                  </span>
                </Link>
              </li>
              <li className={DisplayProductStyles.navigationList}>
                <Link className={DisplayProductStyles.navigationLink} to='#'>
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fa fa-comment ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span className={DisplayProductStyles.navigationTitle}>
                    Reviews
                  </span>
                </Link>
              </li>
              <li className={DisplayProductStyles.navigationList}>
                <Link
                  className={DisplayProductStyles.navigationLink}
                  to='/admin/products'
                >
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fab fa-product-hunt ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span className={DisplayProductStyles.navigationTitle}>
                    Products
                  </span>
                </Link>
              </li>
              <li className={DisplayProductStyles.navigationList}>
                <Link className={DisplayProductStyles.navigationLink} to='#'>
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fa fa-credit-card ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span className={DisplayProductStyles.navigationTitle}>
                    Orders
                  </span>
                </Link>
              </li>
              <li className={DisplayProductStyles.navigationList}>
                <Link className={DisplayProductStyles.navigationLink} to='#'>
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fa fa-cog ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span className={DisplayProductStyles.navigationTitle}>
                    Settings
                  </span>
                </Link>
              </li>

              <li className={DisplayProductStyles.navigationList}>
                <Link className={DisplayProductStyles.navigationLink} to=''>
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fas fa-sign-out-alt ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span
                    className={DisplayProductStyles.navigationTitle}
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
            isSearchBar
              ? DisplayProductStyles.main
              : DisplayProductStyles.mainActive
          }
        >
          <div className={DisplayProductStyles.topbar}>
            <div
              className={
                isHamburgerbarBlack
                  ? DisplayProductStyles.toggle
                  : DisplayProductStyles.toggleChange
              }
              onClick={handleToggleMenu}
            ></div>
            <div className={DisplayProductStyles.search}>
              <label htmlFor='' className={DisplayProductStyles.labelForm}>
                <input
                  className={DisplayProductStyles.inputForm}
                  type='text'
                  placeholder='Search'
                />
                <i
                  className={`fa fa-search ${DisplayProductStyles.iconSearch}`}
                  aria-hidden='true'
                ></i>
              </label>
            </div>
            <div>
              <NavDropdown title={userInfo?.name} id='username'>
                <LinkContainer to={`/profile`}>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
          <Container>
            <h1 className='text-center py-3'>ORDERS LIST</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((x) => (
                    <tr key={x._id}>
                      <td>{x._id.substring(17, 30)}</td>
                      <td>{x?.user && x?.user.name}</td>
                      <td>{Date(x?.createdAt).substring(0, 15)}</td>
                      <td>${x.totalPrice}</td>
                      <td>
                        {x.isPaid ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {x.isDelivered ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${x._id}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Container>
        </div>
      </div>
    </div>
  )
}

export default OrderListPage
