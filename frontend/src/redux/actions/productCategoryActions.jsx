import axios from 'axios'
import { FILTER_APPLE_ITEM } from './../constants/productCategoryReducer'

export const filterproductCategory = (id) => async (dispatch) => {
  const { data } = await axios.get(
    `https://maverickstores.herokuapp.com/products/single/${id}`
  )

  dispatch({
    type: FILTER_APPLE_ITEM,
    payload: data,
    // {
    //   // product: data.id,
    //   // name: data.productName,
    //   // image: data.imagePath,
    //   // price: data.productPrice,
    //   // brand: data.brand,
    //   // category: data.productCategory,
    // },
  })
}
