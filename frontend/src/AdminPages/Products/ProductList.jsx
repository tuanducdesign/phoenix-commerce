import React, { useState, useEffect } from 'react'
import DisplayProductStyles from './DisplayProducts.Module.css'

import { Table, Button, Row, Col, NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
// import Image from 'react-bootstrap/Image';
import Logo from './phoenix.png'
import { logout } from '../../redux/actions/userActions'
// import Paginate from '../../components/Pagination'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../../redux/constants/productConstants'
import Paginate from '../../components/Paginate'

const UserListPage = ({ history, match }) => {
  const [isSidenav, setSidenavOpen] = useState(false)
  const [isSearchBar, setSearchBar] = useState(true)
  const [isMobileNavBar, setMobileNavBarOpen] = useState(false)
  const [isHamburgerbarBlack, setHamburgerWhite] = useState(false)

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  // console.log('CREAAAATE:::', productCreate)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct?._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  const handleToggleMenu = () => {
    setSidenavOpen(!isSidenav)
    setSearchBar(!isSearchBar)
    setMobileNavBarOpen(!isMobileNavBar)
    setHamburgerWhite(!isHamburgerbarBlack)
  }

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
                <Link className={DisplayProductStyles.navigationLink} to='/'>
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
            <Row className='my-3'>
              <Col>
                <h1 className='float-start'>Products</h1>
              </Col>
              <Col className='text-right'>
                <Button
                  className='cartBtn float-end'
                  onClick={createProductHandler}
                >
                  <i className='fas fa-plus'></i> Add Product
                </Button>
              </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>PRICE</th>
                      <th>CATEGORY</th>
                      <th>BRAND</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id.substring(19, 27)}</td>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <LinkContainer
                            to={`/admin/product/${product._id}/edit`}
                          >
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
              </>
            )}
          </Container>
        </div>
      </div>
    </div>
  )
}

export default UserListPage
