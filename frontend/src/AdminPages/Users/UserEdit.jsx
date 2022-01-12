import React, { useState, useEffect } from 'react'
import DisplayProductStyles from './DisplayProducts.Module.css'
import { Button, Form, NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {
  getUserDetails,
  listUsers,
  updateUsers,
} from '../../redux/actions/userActions'
// import Image from 'react-bootstrap/Image';
import Logo from './phoenix.png'
import { logout } from '../../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../../redux/constants/userConstants'
import FormContainer from '../../components/FormContainer'
import { LinkContainer } from 'react-router-bootstrap'

const UserListPage = ({ history, match }) => {
  const [isSidenav, setSidenavOpen] = useState(false)
  const [isSearchBar, setSearchBar] = useState(true)
  const [isMobileNavBar, setMobileNavBarOpen] = useState(false)
  const [isHamburgerbarBlack, setHamburgerWhite] = useState(false)

  const userId = match.params.id

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  console.log('USER_DEEEEE:::', user)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  //   isAdmin = user.roles === 'admin'

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate
  // console.log('USER_DEEEEE:::', user)

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/users')
    } else {
      if (!user?.name || user?._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user?.name)
        setEmail(user?.email)
        setIsAdmin(user?.isAdmin)
      }
    }
  }, [dispatch, userId, successUpdate, history, user])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUsers({ _id: userId, name, email, isAdmin }))
  }

  const handleToggleMenu = () => {
    setSidenavOpen(!isSidenav)
    setSearchBar(!isSearchBar)
    setMobileNavBarOpen(!isMobileNavBar)
    setHamburgerWhite(!isHamburgerbarBlack)
  }

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const logoutHandler = () => {
    dispatch(logout())
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
                <Link className={DisplayProductStyles.navigationLink} to=''>
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
                <Link
                  className={DisplayProductStyles.navigationLink}
                  to='/admin/orders'
                >
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
            <Link to='/admin/users' className='btn btn-light my-3'>
              Go Back
            </Link>

            <FormContainer>
              <h1>Edit User</h1>
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder={user.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder={user.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='isAdmin'>
                    <Form.Check
                      type='checkbox'
                      label='Admin User'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    ></Form.Check>
                  </Form.Group>

                  <Button
                    type='submit'
                    variant='primary'
                    className='cartBtn mt-3'
                  >
                    Update
                  </Button>
                </Form>
              )}
            </FormContainer>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default UserListPage
