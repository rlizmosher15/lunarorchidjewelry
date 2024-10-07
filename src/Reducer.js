export const initialState = {
  basket: [],
  user: null,
};


// Selector
// .reduce() maps through the basket
// Here we use reduce to add each item price to the total amount, with the total starting at 0
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => item.price + amount, 0);


const reducer = (state, action) => {
  console.log(action);
  switch(action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: []
      }

    case "REMOVE_FROM_BASKET":
      // findIndex returns the first element with the given id
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.id);

      // make a copy of the basket
      let newBasket = [...state.basket];

      // if index >= 0, it found an item
      if(index >= 0) {
        // chop off that item!
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.id}) because it's not in the basket`)
      }

      return {
        ...state,
        basket: newBasket
      }

    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    default:
      return state;
  }
};

export default reducer;
