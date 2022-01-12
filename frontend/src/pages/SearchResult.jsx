import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../redux/actions/productActions'
import { useParams } from 'react-router-dom'
import Header from '../components/Navbar/Header'
import Footer from '../components/Footer/Footer'
import Paginate from '../components/Paginate'
import Desc from '../components/Desc'

const SearchResult = ({ match }) => {
  const { keyword } = useParams()
  const { pageNumber } = useParams()

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Desc title='Search Results | Phoenix Store ' />
      <Header />
      <h1 className='text-center py-3 mt-3'>Products Match</h1>
      <div style={{ backgroundColor: '#f9f9f9' }}>
        <Container style={{ minHeight: '60vh' }}>
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
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              />
            </>
          )}
        </Container>
      </div>
      <Footer />
    </>
  )
}

export default SearchResult
