import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followedCoins: [],
  isLoading: true
}

const followSlice = createSlice({
  name: 'follow',
  initialState,
  reducers: {
    followAdd: (state, action) => {
      const coinId = action.payload
      state.followedCoins.push(coinId)
    },
    followRemove: (state, action) => {
      const coinId = action.payload
      state.followedCoins = state.followedCoins.filter((coin) => coin !== coinId);
    }
  }
})

export const {followAdd, followRemove} = followSlice.actions
export default followSlice.reducer