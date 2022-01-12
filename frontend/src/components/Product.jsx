import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import '../index.css'

const Product = ({ product, history, match }) => {
  const [qty] = useState(1)
  return (
    <Card className='my-3 p-3 rounded' style={{ border: 'none' }}>
      <div className='prod'>
        <Card.Img className='img' src={product.image} variant='top' />

        <i
          className='fas fa-shopping-cart'
          onClick={(id) => {
            history.push(`/cart/${match.params.id}?qty=${qty}`)
          }}
        />
      </div>

      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>

      <Card.Text as='div'>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </Card.Text>

      <Card.Text as='h3'>${product.price}</Card.Text>
    </Card>
  )
}

export default Product
