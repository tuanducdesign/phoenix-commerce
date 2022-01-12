import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Container,
} from 'react-bootstrap'
import Rating from '../../components/Rating'
import '../../index.css'
import {
  listProductDetails,
  listProducts,
  createProductReview,
} from '../../redux/actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import Product from '../../components/Product'
import Header from '../../components/Navbar/Header'
import Footer from '../../components/Footer/Footer'
import { useForm } from '@formspree/react'
import Modal from 'react-modal'
import Styled from './Product.Module.css'
import { PRODUCT_REVIEW_RESET } from '../../redux/constants/productConstants'
import Desc from '../../components/Desc'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const ProductDetails = ({ history, match }) => {
  const [state, handleSubmit] = useForm('mnqwqqdb')
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const [modalIsOpen, setIsOpen] = useState(false)

  let subtitle
  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const afterOpenModal = () => {
    subtitle.style.color = 'blue'
  }

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  console.log('review::', product.review)

  const relatedProductList = useSelector((state) => state.productList)
  const { products } = relatedProductList

  const createReview = useSelector((state) => state.createReview)
  const {
    loading: loadingReview,
    success: successReview,
    error: errorReview,
  } = createReview

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (successReview) {
      alert('Review Submitted Successfully')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match.params.id, successReview])

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?quantity=${quantity}`)
  }

  const addToWishHandler = () => {
    history.push(`/wishlist/${match.params.id}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Header />
      <Container>
        <div>
          <Link className='btn btn-Light my-3' to={'/'}>
            Home
          </Link>
          <p className='bread btn btn-Light my-3'>{product.name}</p>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Desc title={product.name} />
            <Row>
              <Col md={6}>
                <Image
                  className='img'
                  src={product.image}
                  alt={product.name}
                  fluid
                  style={{ height: '70vh' }}
                />
              </Col>
              <Col md={5}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Stock:</Col>
                      <Col>
                        <strong>
                          {`${
                            product.countInStock > 0
                              ? `In Stock (${product.countInStock})`
                              : `Out of Stock. Available on Back-order`
                          }`}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {/* value must not exceed the items in stock */}
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='cartBtn btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                    <Button
                      onClick={addToWishHandler}
                      className='cartBtn btn-block ms-3'
                      type='button'
                    >
                      Add To Wishlist
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={openModal}
                      className='cartBtn btn-block ms-3'
                      type='button'
                      hidden={product.countInStock > 0}
                    >
                      Notify Me
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2 className='mt-5'>Write a Review</h2>
                    {successReview && (
                      <Message variant='success'>
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingReview && <Loader />}
                    {errorReview && (
                      <Message variant='danger'>{errorReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingReview}
                          type='submit'
                          variant='primary'
                          className='cartBtn mt-3'
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <h2 className='mt-5'>Reviews</h2>
                {product?.reviews?.length === 0 && (
                  <Message>No Reviews</Message>
                )}

                <ListGroup variant='flush'>
                  {product?.reviews?.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p className='mt-3'>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
            </Row>
          </>
        )}

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'
        >
          <div className={Styled.heading}>
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Back Order</h2>
            <i
              onClick={closeModal}
              className='fas fa-times'
              style={{ color: 'red', fontSize: '1.3rem', cursor: 'pointer' }}
            />
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formHorizontalEmail'
            >
              <Form.Label column sm={4}>
                Product
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  type='text'
                  // placeholder={product.id}
                  name='product'
                  value={`${product.name} (${product._id})`}
                  // disabled
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formHorizontalEmail'
            >
              <Form.Label column sm={4}>
                Name
              </Form.Label>
              <Col sm={12}>
                <Form.Control type='text' placeholder='Your name' name='name' />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formHorizontalEmail'
            >
              <Form.Label column sm={4}>
                Email
              </Form.Label>
              <Col sm={12}>
                <Form.Control type='email' placeholder='Email' name='email' />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className='mb-3'
              controlId='formHorizontalPassword'
            >
              <Form.Label column sm={4}>
                Comment
              </Form.Label>
              <Col sm={12}>
                <Form.Control
                  type='textarea'
                  placeholder='How soon do you want this product?'
                  name='comment'
                  style={{ height: '100px' }}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Col sm={{ span: 10, offset: 0 }}>
                <Button
                  type='submit'
                  className='cartBtn'
                  disabled={state.submitting}
                >
                  Submit
                </Button>
              </Col>
            </Form.Group>
            {state.succeeded && (
              <Form.Group as={Row} className='mb-3'>
                <Col sm={12}>
                  <Message variant='success'>
                    Thank you for notifying us
                  </Message>
                </Col>
              </Form.Group>
            )}
          </Form>
        </Modal>

        <h3 className='text-center mt-5'>Related Products</h3>
        <Row>
          {products
            .filter((rel) => rel.category === product.category)
            .map(
              (relatedProducts) =>
                product._id !== relatedProducts._id && (
                  <Col key={relatedProducts._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={relatedProducts} />
                  </Col>
                )
            )}
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default ProductDetails
