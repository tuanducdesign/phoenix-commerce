import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Container, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
// import FormContainer from '../../components/FormContainer'
import {
  getUserDetails,
  updateUserProfile,
} from '../../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants'
import { listMyOrders } from '../../redux/actions/orderActions'
import Header from '../../components/Navbar/Header'
import Footer from '../../components/Footer/Footer'

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const myOrders = useSelector((state) => state.myOrders)
  const { orders, loading: loadingOrders, error: errorOrders } = myOrders

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, user.email, user.name, userInfo, success, myOrders])

  const submitHandler = (e) => {
    e.preventDefault()
    // dispatch register
    // check match pass
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && (
              <Message variant='success'>Profile Updated Successfully</Message>
            )}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter your name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label>ConfirmPassword</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type='submit' className='cartBtn mt-3'>
                Update
              </Button>
            </Form>
          </Col>
          <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders}</Message>
            ) : (
              <Table
                striped
                bordered
                hover
                responsive
                text-center
                className='table-sm'
              >
                <thead style={{ backgroundColor: '#3e305c', color: 'white' }}>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((x) => (
                    <tr key={x._id}>
                      <td>{x._id.substring(8, 14)}</td>
                      <td>{x.createdAt.substring(0, 10)}</td>
                      <td>${x.totalPrice}</td>
                      <td>
                        {x.isPaid ? (
                          x.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {x.isDelivered ? (
                          x.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${x._id}`}>
                          <Button variant='light'>Details</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}

export default ProfileScreen
