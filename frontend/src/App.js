import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import Landing from './pages/Landing/Landing'
import ProductScreen from './pages/Product/ProductScreen'
import ProductCategory from './pages/Product-Category/ProductCategory'
import Table from './pages/cart/Table'
import NotFound from './pages/NotFound/NotFound'
import WishList from './pages/WishList/WishList'
import Page from 'react-page-loading'
import LoginScreen from './pages/login/LoginScreen'
import RegisterScreen from './pages/login/RegisterScreen'
import ProfileScreen from './pages/login/ProfileScreen'
import ShippingScreen from './pages/shipping/ShippingScreen'
import PlaceOrderScreen from './pages/order/PlaceOrderScreen'
import OrderScreen from './pages/order/OrderScreen'
import Dashboard from './AdminPages/Dashboard/Dashboard'
import Users from './AdminPages/Users/UserListPage'
import UserEdit from './AdminPages/Users/UserEdit'
import ProductsList from './AdminPages/Products/ProductList'
import ProductEdit from './AdminPages/Products/ProductEdit'
import OrderList from './AdminPages/Orders/OrderList'
import SearchResult from './pages/SearchResult'

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <Page loader={'bubble-spin'} color={'#2cccff'} size={9}>
          <main>
            <Switch>
              <Route path='/search/:keyword' component={SearchResult} exact />
              <Route
                path='/search/:keyword/page/:pageNumber'
                component={SearchResult}
                exact
              />
              <Route path='/page/:pageNumber' component={Landing} exact />
              <Route path='/' component={Landing} exact />
              <Route path='/products' component={ProductCategory} exact />
              <Route path='/product/:id' exact component={ProductScreen} />
              <Route path='/login' component={LoginScreen} exact />
              <Route path='/register' component={RegisterScreen} exact />
              <Route path='/profile' component={ProfileScreen} exact />
              <Route path='/shipping' component={ShippingScreen} exact />
              <Route path='/order/:id' component={OrderScreen} exact />
              <Route path='/placeOrder' component={PlaceOrderScreen} exact />
              <Route path='/cart/:id?' component={Table} />
              <Route path='/wishlist' component={WishList} exact />
              <Route path='/admin/dashboard' component={Dashboard} exact />
              <Route path='/admin/users' component={Users} exact />
              <Route path='/admin/user/:id/edit' component={UserEdit} exact />
              <Route path='/admin/products' component={ProductsList} exact />
              <Route
                path='/admin/products/:pageNumber'
                component={ProductsList}
                exact
              />
              <Route
                path='/admin/product/:id/edit'
                component={ProductEdit}
                exact
              />
              <Route path='/admin/orders' component={OrderList} exact />
              <Route component={NotFound} />
            </Switch>
          </main>
        </Page>
      </Provider>
    </Router>
  )
}

export default App
