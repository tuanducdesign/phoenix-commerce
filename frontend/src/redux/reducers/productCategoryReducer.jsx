import { FILTER_APPLE_ITEM } from './../constants/productCategoryReducer'

export const productCategoryReducer = (state = { filterItems: [] }, action) => {
  switch (action.type) {
    case FILTER_APPLE_ITEM:
      return {
        ...state,
        filterItems: state.filterItems
          .filter((x) => x.product === action.payload)
          .map((p) => p.payload),
      }
    default:
      return state
  }
}
