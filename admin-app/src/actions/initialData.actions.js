import axios from "../helpers/axios";
import { categoryConstants, initalDataConstants, productConstants } from "./constants";

export const getInitalData = () => {
    return async dispatch => {
        const res = await axios.post(`/initialdata`);
        const {categories, products} = res.data;

        if(res.status === 200) {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: { categories }
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: { products }
            });
        } else {
            dispatch({
                type : initalDataConstants.GET_ALL_INITIAL_DATA_FAILURE,
            });
        };
    };
};
