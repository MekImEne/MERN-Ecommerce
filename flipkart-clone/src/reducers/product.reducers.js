import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    productsByPrice : {
        under5k : [],
        under10k : [],
        under15k : [],
        under20k : [],
        under30k : [],
    },
};

const productReducer = (state = initState, action) => {
    console.log(action);
    switch(action.type){
        case productConstants.GET_PRODUCTS_BY_SLUG_REQUEST:
            state = {
                ...state,
                products: action.payload.products.products,
                productsByPrice : {
                    ...action.payload.products.productsByPrice
                }
            }
            break;
        default:
            break;
    }
    return state;
};

export default productReducer;

