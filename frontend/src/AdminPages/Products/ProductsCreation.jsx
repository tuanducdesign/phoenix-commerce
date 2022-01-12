import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Logo from './phoenix.png'
import ProductStyles from './Product.Module.css'
import { logout } from '../../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { PRODUCT_CREATE_RESET } from '../../redux/constants/productConstants'
import { createProduct } from '../../redux/actions/productActions'
import Message from '../../components/Message'

const initialValues = {
  productName: '',
  StockAvailability: '',
  availableQuantity: '',
  productPrice: '',
  productCategory: '',
  brand: '',
  productDescription: '',
  imagePath: '',
}

const onSubmit = (values) => {
  console.log('Form-Data', values)
}

const validationSchema = Yup.object().shape({
  productName: Yup.string().required('Required!'),
  StockAvailability: Yup.string().required('Please Select an Option'),
  availableQuantity: Yup.string().required('Required!'),
  productPrice: Yup.string().required('Required!'),
  productCategory: Yup.string().required('Required!'),
  brand: Yup.string().required('Required!'),
  productDescription: Yup.string().required('Required!'),
  attachment: Yup.mixed()
    .nullable()
    .notRequired()
    .test('File Size', 'Uploaded file is too big.', (value) => {
      const sizeInBytes = 500000
      return value.size <= sizeInBytes
    })
    .test(
      'FILE_FORMAT',
      'uploaded file has unsupported format.',
      function (value) {
        const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']
        return SUPPORTED_FORMATS.includes(value.type)
      }
    ),
})

const ProductsCreation = ({ history, match }) => {
  const dispatch = useDispatch()

  const productId = match.params.id

  const [isSidenav, setSidenavOpen] = useState(false)
  const [isSearchBar, setSearchBar] = useState(true)
  const [isMobileNavBar, setMobileNavBarOpen] = useState(false)
  const [isHamburgerbarBlack, setHamburgerWhite] = useState(false)
  const [isLaptopSelectFormDisplay, setIsLaptopSelectFormDisplay] =
    useState(false)
  const [isConsolesFormDisplay, setIsConsolesFormDisplay] = useState(false)
  const [isSmartwatchesDisplay, setIsSmartwatchesDisplay] = useState(false)
  const [isSmartphonesDisplay, setIsSmartphonesDisplay] = useState(false)
  const [isAccessoriesDisplay, setIsAccessoriesDisplay] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const [productName, setName] = useState('')
  const [productPrice, setPrice] = useState(0)
  const [imagePath, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [productCategory, setCategory] = useState('')
  const [availableQuantity, setQuantity] = useState(0)
  const [productDescription, setDescription] = useState('')

  // const resetInputField = (e) => {
  //   setInputValue('')
  // }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })

  const handleToggleMenu = () => {
    setSidenavOpen(!isSidenav)
    setSearchBar(!isSearchBar)
    setMobileNavBarOpen(!isMobileNavBar)
    setHamburgerWhite(!isHamburgerbarBlack)
  }

  const handleEvent = (event) => {
    if (event.target.value === 'Laptop') {
      console.log(event.target.value)
      setIsLaptopSelectFormDisplay(!isLaptopSelectFormDisplay)
    } else if (event.target.value === 'Console') {
      console.log(event.target.value)
      setIsConsolesFormDisplay(!isConsolesFormDisplay)
    } else if (event.target.value === 'SmartWatches') {
      setIsSmartwatchesDisplay(!isSmartwatchesDisplay)
    } else if (event.target.value === 'Smartphones') {
      setIsSmartphonesDisplay(!isSmartphonesDisplay)
    } else if (event.target.value === 'Accessories') {
      setIsAccessoriesDisplay(!isAccessoriesDisplay)
    }
  }

  const productCreate = useSelector((state) => state.productCreate)
  const {
    // loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product,
  } = productCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET })
      history.push('/admin/products')
    } else {
      setName(product?.productName)
      setPrice(product?.productPrice)
      setImage(product?.imagePath)
      setBrand(product?.brand)
      setCategory(product?.productcategory)
      setQuantity(product?.availableQuantity)
      setDescription(product?.productDescription)
    }
  }, [dispatch, history, product, successCreate])

  const createProductHandler = () => {
    dispatch(
      createProduct({
        id: productId,
        productName,
        productPrice,
        imagePath,
        brand,
        availableQuantity,
        productCategory,
        productDescription,
      })
    )
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div className={ProductStyles.body}>
      <div className={ProductStyles.container}>
        <div
          className={
            (isMobileNavBar
              ? ProductStyles.navigationMobile
              : ProductStyles.navigationMobileActive,
            isSidenav
              ? ProductStyles.navigationActive
              : ProductStyles.navigation)
          }
        >
          <ul className={ProductStyles.navigationLinkUnorderedList}>
            <li className={ProductStyles.navigationList}>
              <Link className={ProductStyles.navigationLink} to=''>
                <span className={ProductStyles.navigationLinkIcon}>
                  <img
                    className={ProductStyles.navigationImage}
                    src={Logo}
                    alt='phoenix'
                  />
                </span>
              </Link>
            </li>
            <li className={ProductStyles.navigationList}>
              <Link
                className={ProductStyles.navigationLink}
                to='/admin/dashboard'
              >
                <span className={ProductStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-home ${ProductStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={ProductStyles.navigationTitle}>Dashboard</span>
              </Link>
            </li>
            <li className={ProductStyles.navigationList}>
              <Link className={ProductStyles.navigationLink} to='/admin/users'>
                <span className={ProductStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-users ${ProductStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={ProductStyles.navigationTitle}>Users</span>
              </Link>
            </li>
            <li className={ProductStyles.navigationList}>
              <Link className={ProductStyles.navigationLink} to='#'>
                <span className={ProductStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-comment ${ProductStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={ProductStyles.navigationTitle}>Reviews</span>
              </Link>
            </li>
            <li className={ProductStyles.navigationList}>
              <Link
                className={ProductStyles.navigationLink}
                to='/admin/products'
              >
                <span className={ProductStyles.navigationLinkIcon}>
                  <i
                    className={`fab fa-product-hunt ${ProductStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={ProductStyles.navigationTitle}>Products</span>
              </Link>
            </li>
            <li className={ProductStyles.navigationList}>
              <Link className={ProductStyles.navigationLink} to='/admin/orders'>
                <span className={ProductStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-credit-card ${ProductStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={ProductStyles.navigationTitle}>Orders</span>
              </Link>
            </li>
            <li className={ProductStyles.navigationList}>
              <Link className={ProductStyles.navigationLink} to='#'>
                <span className={ProductStyles.navigationLinkIcon}>
                  <i
                    className={`fa fa-cog ${ProductStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span className={ProductStyles.navigationTitle}>Settings</span>
              </Link>
            </li>

            <li className={ProductStyles.navigationList}>
              <Link className={ProductStyles.navigationLink} to=''>
                <span className={ProductStyles.navigationLinkIcon}>
                  <i
                    className={`fas fa-sign-out-alt ${ProductStyles.navigationIcon}`}
                    aria-hidden='true'
                  ></i>
                </span>
                <span
                  className={ProductStyles.navigationTitle}
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
        className={isSearchBar ? ProductStyles.main : ProductStyles.mainActive}
      >
        <div className={ProductStyles.topbar}>
          <div
            className={
              isHamburgerbarBlack
                ? ProductStyles.toggle
                : ProductStyles.toggleChange
            }
            onClick={handleToggleMenu}
          ></div>
          <div className={ProductStyles.search}>
            <label htmlFor='' className={ProductStyles.labelForm}>
              <input
                className={ProductStyles.inputForm}
                type='text'
                placeholder='Search'
              />
              <i
                className={`fa fa-search ${ProductStyles.iconSearch}`}
                aria-hidden='true'
              ></i>
            </label>
          </div>
          <div className={ProductStyles.user}>
            <img src='../static/img/ray.jpg' alt='admin' />
          </div>
        </div>
        <Link to='/admin/products' className='btn btn-light my-3 mx-3'>
          Go Back
        </Link>

        <h1 className='text-center'>Add Product</h1>
        <div className={ProductStyles.formContainer}>
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
          <Form onSubmit={formik.handleSubmit}>
            <Container>
              <div className='mt-3'>
                <Form.Group className='mb-3'>
                  <Form.Label>Upload a Product Picture</Form.Label>
                  <Form.Control
                    type='file'
                    id='attachment'
                    onChange={(event) => {
                      console.log(event.currentTarget.files[0])
                      formik.setFieldValue(
                        'attachment',
                        event.currentTarget.files[0]
                      )
                      const file = event.currentTarget.files[0]
                      const reader = new FileReader()
                      reader.onloadend = (base64String) => {
                        base64String = reader.result
                          .replace('data:', '')
                          .replace(/^.+,/, '')
                        console.log(base64String)
                        formik.setFieldValue('imagePath', base64String)
                      }
                      reader.readAsDataURL(file)
                    }}
                  />
                  {formik.touched.attachment && formik.errors.attachment ? (
                    <div className={ProductStyles.errors}>
                      {formik.errors.attachment}
                    </div>
                  ) : null}
                </Form.Group>
              </div>
              <Form.Group className='mb-3'>
                <Form.Label className='mt-3 mb-2'>Name Of Product</Form.Label>
                <Form.Control
                  type='Text'
                  className={ProductStyles.inputforms}
                  id='productName'
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder='Enter Name Of Product'
                  {...formik.getFieldProps('productName')}
                />
                {formik.touched.productName && formik.errors.productName ? (
                  <div className={ProductStyles.errors}>
                    {formik.errors.productName}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className='mt-3 mb-2'>
                  Stock Availability
                </Form.Label>
                <Form.Select
                  className={ProductStyles.inputforms}
                  id='StockAvailability'
                  {...formik.getFieldProps('StockAvailability')}
                >
                  <option>Select An option</option>
                  <option value='Available'>Available</option>
                  <option value='Out Of Stock'>Out Of Stock</option>
                </Form.Select>
                {formik.touched.StockAvailability &&
                formik.errors.StockAvailability ? (
                  <div className={ProductStyles.errors}>
                    {formik.errors.StockAvailability}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className='mt-3 mb-2'>
                  Stock Amount Available
                </Form.Label>
                <Form.Control
                  type='Text'
                  className={ProductStyles.inputforms}
                  id='availableQuantity'
                  placeholder='Enter Stock Amount Available'
                  {...formik.getFieldProps('availableQuantity')}
                />
                {formik.touched.availableQuantity &&
                formik.errors.availableQuantity ? (
                  <div className={ProductStyles.errors}>
                    {formik.errors.availableQuantity}
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label className='mt-3 mb-2'>Price</Form.Label>
                <Form.Control
                  type='Text'
                  className={ProductStyles.inputforms}
                  id='productPrice'
                  placeholder='Enter Price Of Product'
                  {...formik.getFieldProps('productPrice')}
                />
                {formik.touched.productPrice && formik.errors.productPrice ? (
                  <div className={ProductStyles.errors}>
                    {formik.errors.productPrice}
                  </div>
                ) : null}
              </Form.Group>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Label className='mt-3 mb-2'>
                    Product Category
                  </Form.Label>
                  <Form.Select
                    className={ProductStyles.inputforms}
                    id='productCategory'
                    onClick={handleEvent}
                    {...formik.getFieldProps('productCategory')}
                  >
                    <option>Select An option</option>
                    <option value='Laptop'>Laptop</option>
                    <option value='Console'>Console</option>
                    <option value='SmartWatches'>SmartWatches</option>
                    <option value='Accessories'>Accessories</option>
                    <option value='Smartphones'>Smartphones</option>
                  </Form.Select>
                  {formik.touched.productCategory &&
                  formik.errors.productCategory ? (
                    <div className={ProductStyles.errors}>
                      {formik.errors.productCategory}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId='formGridEmail'
                  style={{
                    display: isLaptopSelectFormDisplay ? 'block' : 'none',
                  }}
                >
                  <Form.Label className='mt-3 mb-2'>Brand</Form.Label>
                  <Form.Select
                    className={ProductStyles.inputforms}
                    id='brand'
                    {...formik.getFieldProps('brand')}
                  >
                    <option>Select An option</option>
                    <option value='Apple'>Apple</option>
                    <option value='Acer'>Acer</option>
                    <option value='Samsung'>Samsung</option>
                    <option value='Huawei'>Huawei</option>
                  </Form.Select>
                  {formik.touched.brand && formik.errors.brand ? (
                    <div className={ProductStyles.errors}>
                      {formik.errors.brand}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId='formGridEmail'
                  style={{
                    display: isConsolesFormDisplay ? 'block' : 'none',
                  }}
                >
                  <Form.Label className='mt-3 mb-2'>Brand</Form.Label>
                  <Form.Select
                    className={ProductStyles.inputforms}
                    id='brand'
                    {...formik.getFieldProps('brand')}
                  >
                    <option>Select An option</option>
                    <option value='Playstation'>PlayStation</option>
                    <option value='Xbox'>XBOX</option>
                    <option value='Nintendo'>Nintendo</option>
                  </Form.Select>
                  {formik.touched.brand && formik.errors.brand ? (
                    <div className={ProductStyles.errors}>
                      {formik.errors.brand}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId='formGridEmail'
                  style={{
                    display: isSmartwatchesDisplay ? 'block' : 'none',
                  }}
                >
                  <Form.Label className='mt-3 mb-2'>Brand</Form.Label>
                  <Form.Select
                    className={ProductStyles.inputforms}
                    id='brand'
                    {...formik.getFieldProps('brand')}
                  >
                    <option>Select An option</option>
                    <option value='Apple'>Apple</option>
                    <option value='Samsung'>Samsung</option>
                    <option value='Xiaomi'>Xiaomi</option>
                  </Form.Select>
                  {formik.touched.brand && formik.errors.brand ? (
                    <div className={ProductStyles.errors}>
                      {formik.errors.brand}
                    </div>
                  ) : null}
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId='formGridEmail'
                  style={{
                    display: isAccessoriesDisplay ? 'block' : 'none',
                  }}
                >
                  <Form.Label className='mt-3 mb-2'>Brand</Form.Label>
                  <Form.Select
                    className={ProductStyles.inputforms}
                    id='brand'
                    {...formik.getFieldProps('brand')}
                  >
                    <option>Select An option</option>
                    <option value='Speaker'>Speaker</option>
                    <option value='Camera'>Camera</option>
                    <option value='Power-Banks'>Power-Banks</option>
                  </Form.Select>
                  {formik.touched.brand && formik.errors.brand ? (
                    <div className={ProductStyles.errors}>
                      {formik.errors.brand}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId='formGridEmail'
                  style={{
                    display: isSmartphonesDisplay ? 'block' : 'none',
                  }}
                >
                  <Form.Label className='mt-3 mb-2'>brand</Form.Label>
                  <Form.Select
                    className={ProductStyles.inputforms}
                    id='brand'
                    {...formik.getFieldProps('brand')}
                  >
                    <option>Select An option</option>
                    <option value='Apple'>Apple</option>
                    <option value='Samsung'>Samsung</option>
                    <option value='Huawei'>Huawei</option>
                  </Form.Select>
                  {formik.touched.brand && formik.errors.brand ? (
                    <div className={ProductStyles.errors}>
                      {formik.errors.brand}
                    </div>
                  ) : null}
                </Form.Group>
              </Row>
              <Form.Group className='mb-3'>
                <Form.Label className='mt-3 mb-2'>Description</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Leave a comment here'
                  style={{ height: '100px' }}
                  className={ProductStyles.inputforms}
                  id='productdescription'
                  {...formik.getFieldProps('productDescription')}
                />
                {formik.touched.productDescription &&
                formik.errors.productDescription ? (
                  <div className={ProductStyles.errors}>
                    {formik.errors.productDescription}
                  </div>
                ) : null}
              </Form.Group>
              <div className={ProductStyles.buttonContainer}>
                <Button
                  className={`mb-3 ${ProductStyles.buttonCenter}`}
                  variant='primary'
                  type='submit'
                  onClick={createProductHandler}
                >
                  Submit
                </Button>
              </div>
            </Container>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default ProductsCreation
