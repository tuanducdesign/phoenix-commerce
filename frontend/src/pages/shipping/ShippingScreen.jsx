import React, { useState } from 'react'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  savePaymentMethod,
  saveShippingAddress,
} from '../../redux/actions/cartActions'
import Header from '../../components/Navbar/Header'
import Footer from '../../components/Footer/Footer'

const ShippingScreen = ({ history }) => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, postalCode, country }))
    dispatch(savePaymentMethod(paymentMethod))
    history.push('/placeOrder')
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <h1>Shipping</h1>

          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your address'
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter city'
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='postalcode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter postal code'
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter country'
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col md={2}></Col>
          <Col md={4}>
            <h3>Payment Method</h3>
            <Form onSubmit={submitHandler}>
              <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                  <Form.Check
                    type='radio'
                    label='Paypal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  ></Form.Check>
                </Col>
              </Form.Group>

              <Button type='submit' className='cartBtn mt-3'>
                Continue
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default ShippingScreen
