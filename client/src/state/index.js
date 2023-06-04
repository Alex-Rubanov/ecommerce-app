import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCartOpen: false,
  cart: [],
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },

    addToCart: (state, action) => {
      // If item already is in the cart then we don't add duplicate of it but just update it count/amount
      if (state.cart.some(cart => cart.id === action.payload.item.id)) {
        state.cart = state.cart.map(cart => {
          if (cart.id === action.payload.item.id)
            cart.count += action.payload.item.count

          return cart
        })

        return
      }

      state.cart = [...state.cart, action.payload.item]
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id)
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map(item => {
        if (item.id === action.payload.id) {
          item.count++
        }

        return item
      })
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map(item => {
        if (item.id === action.payload.id && item.count > 1) {
          item.count--
        }

        return item
      })
    },

    setIsCartOpen: state => {
      state.isCartOpen = !state.isCartOpen
    }
  }
})

export const {
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen
} = cartSlice.actions

export default cartSlice.reducer
