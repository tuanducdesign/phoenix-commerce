import React, { useState, useEffect } from 'react'
import DisplayProductStyles from './DisplayProducts.Module.css'
import { listProducts } from '../../redux/actions/productActions'
import Table from 'react-bootstrap/Table'
import { Row, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Image from 'react-bootstrap/Image'
import Logo from './phoenix.png'

const DisplayProducts = () => {
  const [isSidenav, setSidenavOpen] = useState(false)
  const [isSearchBar, setSearchBar] = useState(true)
  const [isMobileNavBar, setMobileNavBarOpen] = useState(false)
  const [isHamburgerbarBlack, setHamburgerWhite] = useState(false)

  const handleToggleMenu = () => {
    setSidenavOpen(!isSidenav)
    setSearchBar(!isSearchBar)
    setMobileNavBarOpen(!isMobileNavBar)
    setHamburgerWhite(!isHamburgerbarBlack)
  }

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
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
                <Link className={DisplayProductStyles.navigationLink} to=''>
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
                <Link className={DisplayProductStyles.navigationLink} to=''>
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
                <Link className={DisplayProductStyles.navigationLink} to=''>
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
                <Link className={DisplayProductStyles.navigationLink} to=''>
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fa fa-product-hunt ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span className={DisplayProductStyles.navigationTitle}>
                    Products
                  </span>
                </Link>
              </li>
              <li className={DisplayProductStyles.navigationList}>
                <Link className={DisplayProductStyles.navigationLink} to=''>
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
                <Link className={DisplayProductStyles.navigationLink} to=''>
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
                      className={`fa fa-lock ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span className={DisplayProductStyles.navigationTitle}>
                    Password
                  </span>
                </Link>
              </li>
              <li className={DisplayProductStyles.navigationList}>
                <Link className={DisplayProductStyles.navigationLink} to=''>
                  <span className={DisplayProductStyles.navigationLinkIcon}>
                    <i
                      className={`fa fa-sign-out ${DisplayProductStyles.navigationIcon}`}
                      aria-hidden='true'
                    ></i>
                  </span>
                  <span
                    className={DisplayProductStyles.navigationTitle}
                    onClick={handleToggleMenu}
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
            <div className={DisplayProductStyles.user}>
              <img src='../static/img/ray.jpg' alt='admin' />
            </div>
          </div>
          <Container>
            <h1 className='text-center py-3'>Featured Products</h1>
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product Name</th>
                  <th>Picture Of Product</th>
                  <th>brand</th>
                  <th>Product Description</th>
                  <th>Product Price</th>
                  <th></th>
                </tr>
              </thead>
            </Table>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Row>
                {products.map((product) => (
                  <Table responsive striped bordered hover>
                    <tbody>
                      <tr>
                        <td className={DisplayProductStyles.productId}>
                          {product.id}
                        </td>
                        <td className={DisplayProductStyles.productName}>
                          {product.productName}
                        </td>
                        <td className={DisplayProductStyles.productImage}>
                          <Image src={product.imagePath} thumbnail></Image>
                        </td>
                        <td>{product.brand}</td>
                        <td className={DisplayProductStyles.description}>
                          {product.productDescription}
                        </td>
                        <td>{product.productPrice}</td>
                      </tr>
                    </tbody>
                  </Table>
                ))}
              </Row>
            )}
          </Container>
        </div>
      </div>
    </div>
  )
}

export default DisplayProducts
