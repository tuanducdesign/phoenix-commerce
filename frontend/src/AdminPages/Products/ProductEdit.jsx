import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayProductStyles from './DisplayProducts.Module.css'
import { Button, Form, NavDropdown } from 'react-bootstrap'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {
  listProductDetails,
  updateProduct,
} from '../../redux/actions/productActions'
// import Image from 'react-bootstrap/Image';
import Logo from './phoenix.png'
import { logout } from '../../redux/actions/userActions'
import FormContainer from '../../components/FormContainer'
import { PRODUCT_UPDATE_RESET } from '../../redux/constants/productConstants'
import { LinkContainer } from 'react-router-bootstrap'

const ProductEdit = ({ history, match }) => {
  const [isSidenav, setSidenavOpen] = useState(false)
  const [isSearchBar, setSearchBar] = useState(true)
  const [isMobileNavBar, setMobileNavBarOpen] = useState(false)
  const [isHamburgerbarBlack, setHamburgerWhite] = useState(false)

  const productId = match.params.id

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setQuantity] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/products')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setQuantity(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, product, productId, successUpdate])

  const uploadFileHandler = async (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post(`/api/upload`, formData, config)
      console.log('image-data:::', data)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        countInStock,
        category,
        description,
      })
    )
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
            <Link to='/admin/products' className='btn btn-light my-3'>
              Go Back
            </Link>

            <FormContainer>
              <h1>Edit Product</h1>
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
                      placeholder={product.name}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder={product.price}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder={product.image}
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.Control
                      type='file'
                      // id='image-file'
                      label='Choose File'
                      // custom
                      onChange={uploadFileHandler}
                    ></Form.Control>
                    {uploading && <Loader />}
                  </Form.Group>

                  <Form.Group controlId='brand'>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder={product.brand}
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='stock'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                      type='number'
                      placeholder={product.countInStock}
                      value={countInStock}
                      onChange={(e) => setQuantity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='category'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder={product.category}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder={product.description}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
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

export default ProductEdit
