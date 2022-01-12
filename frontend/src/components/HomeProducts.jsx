import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from './Product'
import Message from './Message'
import Loader from './Loader'
import { listProducts } from '../redux/actions/productActions'
import { useParams } from 'react-router'
import Paginate from './Paginate'

const HomeProducts = ({ match }) => {
  const { pageNumber } = useParams()

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts('', pageNumber))
  }, [dispatch, pageNumber])

  console.log('pageNumber:::', pageNumber)
  return (
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <Container>
        <h1 className='text-center py-3'>Featured Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  {/* <Pagination count={2} /> */}
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate page={page} pages={pages} />
          </>
        )}
      </Container>
    </div>
  )
}

export default HomeProducts
