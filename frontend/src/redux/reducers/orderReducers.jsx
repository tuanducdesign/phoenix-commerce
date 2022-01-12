import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_RESET,
  ORDERS_LIST_REQUEST,
  ORDERS_LIST_SUCCESS,
  ORDERS_LIST_FAIL,
  ORDERS_LIST_RESET,
  ORDERS_DELIVERED_REQUEST,
  ORDERS_DELIVERED_SUCCESS,
  ORDERS_DELIVERED_FAIL,
  ORDERS_DELIVERED_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const myOrdersReducer = (state = { order: [] }, action) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
      }
    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case MY_ORDERS_RESET:
      return { order: [] }

    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDERS_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDERS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDERS_LIST_RESET:
      return { orders: [] }

    default:
      return state
  }
}

export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDERS_DELIVERED_REQUEST:
      return {
        loading: true,
      }
    case ORDERS_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDERS_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDERS_DELIVERED_RESET:
      return {}
    default:
      return state
  }
}
