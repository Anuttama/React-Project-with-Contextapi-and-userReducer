import React from 'react'
import { createContext } from 'react'
import faker from "faker";
import { useReducer } from 'react';
import { cartReducer, productReducer } from './Reducers';
import { useContext } from 'react';

const Cart = createContext();
faker.seed(99);

//cart.provider wraps the whole react component
const Context = ({children}) => {
    const products = [...Array(20)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.random.image(),
        inStock: faker.random.arrayElement([0,3,5,6,7]),
        fastDelivery: faker.random.boolean(),
        ratings: faker.random.arrayElement([1,2,3,4,5])

    }));

     const [state, dispatch] = useReducer(cartReducer, {
         products: products,
         cart: []
         
     })

     const [filterState, productDispatch] = useReducer(productReducer, {
         byStock:false,
         byFastDelivery: false,
         byRating: 0,
         searchQuery:"",

     })

    return (
        <Cart.Provider value = {{state , dispatch, filterState, productDispatch}}>
            {children}
        </Cart.Provider>
    )
}

export default Context;

export const CartState = () => {
    return useContext(Cart);
}
