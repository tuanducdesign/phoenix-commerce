import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProducts } from '../../redux/actions/productActions'
import Image from 'react-bootstrap/Image'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Banner from '../../assets/slides/Banner.jpg'
import Product from '../../components/Product'
import StyledProductCategory from './ProductCategory.Module.css'
import Header from '../../components/Navbar/Header'
import Footer from '../../components/Footer/Footer'
import { filterproductCategory } from '../../redux/actions/productCategoryActions'

const ProductCategory = ({ history, match }) => {
  const dispatch = useDispatch()
  // const productCategoryDetails = useSelector((state) => state.productCategoryDetails)
  const productList = useSelector((state) => state.productList)
  const filterproduct = useSelector((state) => state.filterItems)
  const { loading, error, products } = productList
  const { items } = filterproduct
  console.log(items)

  useEffect(() => {
    dispatch(listProducts())
    dispatch(filterproductCategory())
  }, [dispatch])

  // products checkbox states
  const [isShowLaptopForm, setIsShowLaptopForm] = useState(true)
  const [isShowConsolesForm, setIsShowConsolesForm] = useState(false)
  const [isShowAccessoriesForm, setIsShowAccessoriesForm] = useState(false)
  const [isShowSmartWatchesForm, setIsShowSmartWatchesForm] = useState(false)
  const [isShowSmartphonesForm, setIsShowSmartphonesForm] = useState(false)

  // product container states
  const [isShowLaptopProductContainer, setIsShowLaptopProductContainer] =
    useState(true)
  const [isShowConsolesContainer, setIShowConsolesContainer] = useState(false)
  const [isShowAccessoriesContainer, setIsShowAccessoriesContainer] =
    useState(false)
  const [isShowSmartWatchesContainer, setIsShowSmartWatchesContainer] =
    useState(false)
  const [isShowSmartphonesContainer, setIsShowSmartphonesContainer] =
    useState(false)
  const [isOnlyAppleProducts, setOnlyAppleProducts] = useState(false)
  const [isOnlyAcerProducts, setOnlyAcerProducts] = useState(false)
  const [isOnlySamsungProducts, setOnlySamsungproducts] = useState(false)
  const [isSortLaptopProductsContainer, setSortLaptopsProductsContainer] =
    useState(false)
  const [
    isSortLaptopHighProductsContainer,
    setSortLaptopsHighProductsContainer,
  ] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [isChecked1, setIsChecked1] = useState(false)
  const [isChecked2, setIsChecked2] = useState(false)

  const handleClickShow = () => {
    setIsShowConsolesForm(true)
    setIShowConsolesContainer(true)
    setIsShowAccessoriesForm(false)
    setIsShowLaptopForm(false)
    setIsShowSmartWatchesForm(false)
    setSortLaptopsHighProductsContainer(false)
    setOnlyAppleProducts(false)
    setOnlyAcerProducts(false)
    setOnlySamsungproducts(false)
    setIsShowLaptopProductContainer(false)
    setIsShowLaptopProductContainer(false)
    setIsShowSmartWatchesContainer(false)
    setIsShowAccessoriesContainer(false)
    setIsShowSmartphonesForm(false)
    setIsShowSmartphonesContainer(false)
  }
  const handleClickShow1 = () => {
    setIsShowAccessoriesForm(true)
    setIsShowAccessoriesContainer(true)
    setIsShowConsolesForm(false)
    setIsShowLaptopForm(false)
    setIsShowSmartWatchesForm(false)
    setSortLaptopsHighProductsContainer(false)
    setOnlyAppleProducts(false)
    setOnlyAcerProducts(false)
    setIsShowLaptopProductContainer(false)
    setOnlySamsungproducts(false)
    setIsShowLaptopProductContainer(false)
    setIShowConsolesContainer(false)
    setIsShowSmartWatchesContainer(false)
    setIsShowSmartphonesForm(false)
    setIsShowSmartphonesContainer(false)
  }

  const handleClickShow2 = () => {
    setIsShowSmartWatchesForm(true)
    setIsShowSmartWatchesContainer(true)
    setIsShowAccessoriesForm(false)
    setIsShowLaptopForm(false)
    setSortLaptopsHighProductsContainer(false)
    setOnlyAppleProducts(false)
    setOnlyAcerProducts(false)
    setIsShowLaptopProductContainer(false)
    setOnlySamsungproducts(false)
    setIsShowConsolesForm(false)
    setIsShowAccessoriesContainer(false)
    setIsShowLaptopProductContainer(false)
    setIShowConsolesContainer(false)
    setIsShowSmartphonesForm(false)
    setIsShowSmartphonesContainer(false)
  }

  const handleClickShow3 = () => {
    setIsShowSmartWatchesForm(false)
    setIsShowAccessoriesForm(false)
    setIsShowLaptopForm(true)
    setIsShowConsolesForm(false)
    setSortLaptopsHighProductsContainer(false)
    setOnlyAppleProducts(false)
    setOnlyAcerProducts(false)
    setOnlySamsungproducts(false)
    setIsShowLaptopProductContainer(false)
    setIsShowLaptopProductContainer(false)
    setIsShowSmartWatchesContainer(false)
    setIsShowAccessoriesContainer(false)
    setIsShowLaptopProductContainer(true)
    setIsShowSmartphonesForm(false)
    setIsShowSmartphonesContainer(false)
  }

  const handleClickShow4 = () => {
    setIsShowSmartWatchesForm(false)
    setIsShowAccessoriesForm(false)
    setIsShowLaptopForm(false)
    setIsShowConsolesForm(false)
    setIShowConsolesContainer(false)
    setIsShowLaptopProductContainer(false)
    setIsShowSmartWatchesContainer(false)
    setIsShowAccessoriesContainer(false)
    setIsShowLaptopProductContainer(false)
    setIsShowSmartphonesForm(true)
    setIsShowSmartphonesContainer(true)
  }

  const randomNumber = Math.floor(Math.random() * (8 - 1 + 1) + 1)

  // const onlyAppleProducts = () => {
  //   setOnlyAppleProducts(!isOnlyAppleProducts);
  //   setIsShowLaptopProductContainer(!isShowLaptopProductContainer);
  //   console.log("fire");
  // };

  // const priceFilter = (a,b) => {
  //   let ordered =
  // }

  const handleEvent1 = () => {
    setOnlyAppleProducts(!isOnlyAppleProducts)
    setOnlyAcerProducts(false)
    setIsChecked(true)
    setIsChecked1(false)
    setIsChecked2(false)
    setIsShowLaptopProductContainer(!isShowLaptopProductContainer)
    setSortLaptopsHighProductsContainer(false)
    setSortLaptopsProductsContainer(false)
    // setOnlySamsungproducts(!isOnlySamsungProducts);
  }

  const handleEvent = () => {
    setOnlyAppleProducts(false)
    setOnlyAcerProducts(!isOnlyAcerProducts)
    setIsShowLaptopProductContainer(false)
    setSortLaptopsHighProductsContainer(false)
    setSortLaptopsProductsContainer(false)
    setIsChecked(false)
    setIsChecked1(false)
    setIsChecked2(true)
    // if (isChecked1 === false) {
    //   setIsShowLaptopProductContainer(false);
    // } else {
    //   setIsShowLaptopProductContainer(false);
    // }
    // if (isChecked === false && isChecked1 === true) {
    //   setOnlyAppleProducts(true);
    //   setIsShowLaptopProductContainer(false);
    // } else {
    //   setIsShowLaptopProductContainer(false);
    // }
  }

  const handleEvent2 = () => {
    setIsChecked(false)
    setIsChecked1(true)
    setIsChecked2(false)
    setOnlyAppleProducts(false)
    setOnlyAcerProducts(false)
    setOnlySamsungproducts(!isOnlySamsungProducts)
    setIsShowLaptopProductContainer(false)
    setSortLaptopsHighProductsContainer(false)
    setSortLaptopsProductsContainer(false)
    // setOnlyAppleProducts(!isOnlyAppleProducts);
    // setOnlyAcerProducts(!isOnlyAcerProducts);
  }

  console.log(products)

  const sortLaptopProducts = () => {
    setSortLaptopsHighProductsContainer(false)
    setIsChecked(false)
    setIsChecked1(false)
    setIsChecked2(false)
    setOnlyAppleProducts(false)
    setOnlyAcerProducts(false)
    setOnlySamsungproducts(false)
    setSortLaptopsProductsContainer(!isSortLaptopProductsContainer)
    setIsShowLaptopProductContainer(false)
  }

  const sortLaptopProductsHigh = () => {
    setSortLaptopsHighProductsContainer(!isSortLaptopHighProductsContainer)
    setSortLaptopsProductsContainer(false)
    setOnlyAppleProducts(false)
    setOnlyAcerProducts(false)
    setIsChecked(false)
    setIsChecked1(false)
    setIsChecked2(false)
    setOnlySamsungproducts(false)
    setIsShowLaptopProductContainer(false)
  }

  return (
    <>
      <Header />
      <div>
        <h2 className='text-center mt-3'>PRODUCT CATEGORIES</h2>
        <div className={`${StyledProductCategory.productContainer} mt-3`}>
          <Row>
            <Col className={StyledProductCategory.Smaller} sm={12} lg={2}>
              <div
                className={StyledProductCategory.laptopCheckboxContainer}
                style={{ display: isShowLaptopForm ? 'block' : 'none' }}
              >
                <Form>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check
                      type='radio'
                      label='Apple'
                      id='AppleLaptops'
                      checked={isChecked}
                      onChange={handleEvent1}
                      name='formHorizontalRadios'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check
                      type='radio'
                      label='Samsung'
                      id='SamsungLaptops'
                      checked={isChecked1}
                      onChange={handleEvent2}
                      name='formHorizontalRadios'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check
                      type='radio'
                      label='Acer'
                      checked={isChecked2}
                      id='AcerLaptops'
                      onChange={handleEvent}
                      name='formHorizontalRadios'
                    />
                  </Form.Group>
                </Form>
              </div>
              <div
                className={StyledProductCategory.consolesCheckboxContainer}
                style={{ display: isShowConsolesForm ? 'block' : 'none' }}
              >
                <Form>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Playstation' />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Xbox' />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Nintendo' />
                  </Form.Group>
                </Form>
              </div>
              <div
                className={StyledProductCategory.accessoriesCheckboxContainer}
                style={{ display: isShowAccessoriesForm ? 'block' : 'none' }}
              >
                <Form>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Speakers' />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Camera' />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Power-Banks' />
                  </Form.Group>
                </Form>
              </div>
              <div
                className={StyledProductCategory.SmartWatchesCheckboxContainer}
                style={{ display: isShowSmartWatchesForm ? 'block' : 'none' }}
              >
                <Form>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Apple' />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radi' label='Samsung' />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Xiaomi' />
                  </Form.Group>
                </Form>
              </div>
              <div
                className={StyledProductCategory.smartphonesCheckboxContainer}
                style={{ display: isShowSmartphonesForm ? 'block' : 'none' }}
              >
                <Form>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Apple' />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Huawei' />
                  </Form.Group>
                  <Form.Group className='mb-3' id='formGridCheckbox'>
                    <Form.Check type='radio' label='Samsung' />
                  </Form.Group>
                </Form>
              </div>
              <div className={StyledProductCategory.PriceAdjustContainer}>
                <Form.Check
                  type='radio'
                  label='Lowest To Highest'
                  className={StyledProductCategory.priceLabel}
                  name='formHorizontalRadios'
                  onClick={sortLaptopProducts}
                  id='formHorizontalRadios1'
                />
                <Form.Check
                  type='radio'
                  label='Highest To Lowest'
                  className={StyledProductCategory.priceLabel}
                  name='formHorizontalRadios'
                  onClick={sortLaptopProductsHigh}
                  id='formHorizontalRadios2'
                />
              </div>

              <div className='random-product'>
                <Row>
                  {loading ? (
                    <Loader />
                  ) : error ? (
                    <Message variant='danger'>{error}</Message>
                  ) : (
                    <Row>
                      {products
                        .filter(
                          (relatedProducts) =>
                            relatedProducts._id === randomNumber.toString()
                        )
                        .map((relatedProducts) => (
                          <Col
                            key={relatedProducts._id}
                            sm={12}
                            md={6}
                            lg={4}
                            xl={3}
                          >
                            <Product product={relatedProducts} />
                          </Col>
                        ))}
                    </Row>
                  )}
                </Row>
              </div>
            </Col>
            <Col className='bigger' lg={10} sm={12}>
              <Nav fill variant='pills' defaultActiveKey='link'>
                <Nav.Item>
                  <Nav.Link
                    eventKey='link'
                    className={StyledProductCategory.navLink}
                    onClick={handleClickShow3}
                  >
                    Laptop
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey='link-4'
                    onClick={handleClickShow4}
                    className={StyledProductCategory.navLink}
                  >
                    SmartPhones
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey='link-1'
                    onClick={handleClickShow}
                    className={StyledProductCategory.navLink}
                  >
                    Consoles
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey='link-2'
                    onClick={handleClickShow1}
                    className={StyledProductCategory.navLink}
                  >
                    Accessories
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey='link-3'
                    onClick={handleClickShow2}
                    className={StyledProductCategory.navLink}
                  >
                    SmartWatches
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <div
                className={
                  StyledProductCategory.AppleAcerLaptopProductsContainer
                }
                style={{
                  display: isChecked && isChecked1 ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter(
                        (rel) =>
                          rel.category === 'Laptops' &&
                          rel.brand === 'Acer' &&
                          rel.brand === 'Apple'
                      )
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={
                  StyledProductCategory.AppleSamsungLaptopProductsContainer
                }
                style={{
                  display: isChecked && isChecked2 ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter(
                        (rel) =>
                          rel.category === 'Laptops' &&
                          rel.brand === 'Apple' &&
                          rel.brand === 'Samsung'
                      )
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={
                  StyledProductCategory.AcerSamsungLaptopProductsContainer
                }
                style={{
                  display: isChecked2 && isChecked1 ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter(
                        (rel) =>
                          rel.category === 'Laptops' &&
                          rel.brand === 'Acer' &&
                          rel.brand === 'Samsung'
                      )
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.TotalLaptopProductsContainer}
                style={{
                  display:
                    isChecked2 && isChecked1 && isChecked ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter(
                        (rel) =>
                          rel.category === 'Laptops' &&
                          rel.brand === 'Acer' &&
                          rel.brand === 'Samsung' &&
                          rel.brand === 'Apple'
                      )
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.ApplelaptopProductsContainer}
                style={{
                  display: isOnlyAppleProducts ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter(
                        (rel) =>
                          rel.category === 'Laptops' && rel.brand === 'Apple'
                      )
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.AcerlaptopProductsContainer}
                style={{
                  display: isOnlyAcerProducts ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter(
                        (rel) =>
                          rel.category === 'Laptops' && rel.brand === 'Acer'
                      )
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.samsunglaptopProductsContainer}
                style={{
                  display: isOnlySamsungProducts ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter(
                        (rel) =>
                          rel.category === 'Laptops' && rel.brand === 'Samsung'
                      )
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.laptopsProductsContainer}
                style={{
                  display: isShowLaptopProductContainer ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter((rel) => rel.category === 'Laptops')
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.sortlaptopsProductsContainer}
                style={{
                  display: isSortLaptopProductsContainer ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .sort((a, b) => (a.price > b.price ? 1 : -1))
                      .filter((rel) => rel.category === 'Laptops')
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={
                  StyledProductCategory.sortlaptopsHighProductsContainer
                }
                style={{
                  display: isSortLaptopHighProductsContainer ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .sort((a, b) => (b.price > a.price ? 1 : -1))
                      .filter((rel) => rel.category === 'Laptops')
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.consoleProductsContainer}
                style={{
                  display: isShowConsolesContainer ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter((rel) => rel.category === 'Consoles')
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.accessoriesProductsContainer}
                style={{
                  display: isShowAccessoriesContainer ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter((rel) => rel.category === 'Accessories')
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.smartWatchesProductsContainer}
                style={{
                  display: isShowSmartWatchesContainer ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter((rel) => rel.category === 'SmartWatches')
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
              <div
                className={StyledProductCategory.smartphoneProductsContainer}
                style={{
                  display: isShowSmartphonesContainer ? 'block' : 'none',
                }}
              >
                {loading ? (
                  <Loader />
                ) : error ? (
                  <Message variant='danger'>{error}</Message>
                ) : (
                  <Row>
                    {products
                      .filter((rel) => rel.category === 'SmartPhones')
                      .map((relatedProducts) => (
                        <Col
                          key={relatedProducts._id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <Product product={relatedProducts} />
                        </Col>
                      ))}
                  </Row>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductCategory
