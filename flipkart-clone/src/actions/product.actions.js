import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products/${slug}`);
        if (res.status === 200) {
            dispatch({
                type : productConstants.GET_PRODUCTS_BY_SLUG_REQUEST,
                payload : { products : res.data }
            })
        }else {
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG_FAILURE,
                payload: {error: res.data.error }
            });
        }
        console.log(res);
    }
}