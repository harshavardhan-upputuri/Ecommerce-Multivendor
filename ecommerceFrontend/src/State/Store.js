import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { thunk } from "redux-thunk";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from './customers/ProductSlice'
import authSlice from "./AuthSlice"
import cartSlice from "../State/customers/cartSlice"
import OrderSlice from "../State/customers/OrderSlice"
import wishListSlice from "../State/customers/wishListSlice";
import sellerOrderSlice from "../State/seller/sellerOrderSlice";
import transactionSlice from "../State/seller/transactionSlice";
import homeSlice from "../State/customers/customerSlice"
import adminSlice from "./admin/adminSlice"
import dealSlice from "./admin/DealSlice"
const rootReducer = combineReducers({
    seller: sellerSlice,
    sellerProduct:sellerProductSlice,
    product: productSlice,
    auth:authSlice,
    cart:cartSlice,
    order: OrderSlice,
    wishlist : wishListSlice,
    home:homeSlice,

    //seller
    sellerOrder: sellerOrderSlice,
    transaction: transactionSlice,
    
    // admin
    admin: adminSlice,
    deal:dealSlice
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);

export default store;