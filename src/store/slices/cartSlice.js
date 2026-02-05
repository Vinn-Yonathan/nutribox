import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("cart-items");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cartGuest",
  initialState: {
    items: loadFromLocalStorage(),
  },
  reducers: {
    add: (state, action) => {
      const menuIndex = state.items.findIndex(
        (menu) => menu.menu_id === action.payload.menu_id,
      );
      if (menuIndex !== -1) {
        state.items[menuIndex].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("cart-items", JSON.stringify(state.items));
    },
    remove: (state, action) => {
      state.items = state.items.filter(
        (menu) => menu.menu_id !== action.payload,
      );
      localStorage.setItem("cart-items", JSON.stringify(state.items));

      //   return {
      //     items: state.items.filter((menu) => menu.menu_id !== action.payload),
      //   };
    },
    load: (state, action) => {
      state.items = action.payload;
    },
    clear: (state) => {
      state.items = [];
      localStorage.removeItem("cart-items");
      //   return { items: [] };
    },
  },
});

export const { add, remove, clear, load } = cartSlice.actions;
export default cartSlice.reducer;
