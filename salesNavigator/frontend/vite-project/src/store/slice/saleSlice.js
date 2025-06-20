import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  loading: false,
  totalSales: 0,
  RigeonDetail: {},
  YearDetails: {},
  Yearwise: [],
  last12MonthSales: [],
  RigeonWise: [],
  ProductWise:[],
  Product:[],
  totalSalesAmount:[],
  totalUnitsSold:[]
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    saleRequest(state) {
      state.loading = true;
    },
    saleSuccess(state) {
      state.loading = false;
    },
    getSaleRequest(state) {
      state.loading = true;
    },
    getSaleSuccess(state, action) {
      state.loading = false;
    },
    getSaleFailed(state) {
      state.loading = false;
    },
    getProductRequest(state) {
      state.loading = true;
    },
    getProductSuccess(state, action) {
      state.loading = false;
    },
    getProductFailed(state) {
      state.loading = false;
    },
    getMySaleSuccess(state, action) {
      state.loading = false;
      const { Yearwise, totalSales,last12MonthSales,RigeonWise } = action.payload;   
      state.last12MonthSales=last12MonthSales
      state.Yearwise = Yearwise;
      state.totalSales = totalSales;
      state.RigeonWise=RigeonWise;
    },
    getProductSuccess(state, action) {
      state.loading = false; 
      state.Product=action.payload; 
    },
    resetSlice(state) {
      state.loading = false;
    },
  },
});

// Thunk for fetching total sales
export const getAllAuctionItems = () => async (dispatch) => {
  dispatch(saleSlice.actions.getSaleRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/routes/get-total-sale",
      {},
      { withCredentials: true }
    );
    dispatch(saleSlice.actions.getMySaleSuccess(response.data));
  } catch (error) {
    dispatch(saleSlice.actions.getSaleFailed());
    console.error("Error fetching sales:", error);
  } finally {
    dispatch(saleSlice.actions.resetSlice());
  }
};
export const getProductItems = () => async (dispatch) => {
  dispatch(saleSlice.actions.getProductRequest());
  try {
    const response = await axios.post(
      "http://localhost:5000/api/routes/get-product-wise-sale",
      {},
      { withCredentials: true }
    );
    // console.log(response.data)
    dispatch(saleSlice.actions.getProductSuccess(response.data));
  } catch (error) {
    dispatch(saleSlice.actions.getProductFailed());
    console.error("Error fetching sales:", error);
  } finally {
    dispatch(saleSlice.actions.resetSlice());
  }
};

export const {
  saleRequest,
  saleSuccess,
  getSaleRequest,
  getSaleSuccess,
  getSaleFailed,
  getMySaleSuccess,
  getProductRequest,
  getProductSuccess,
  getProductFailed,
  resetSlice,
} = saleSlice.actions;

export default saleSlice.reducer;
