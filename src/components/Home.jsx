import React from 'react'
import { CartState } from '../context/Context';
import SingleProducts from './SingleProducts';
import './Home.css';
import Filters from './Filters';


const Home = () => {

    const {state : {products}, filterState : {byStock, byFastDelivery, byRating, searchQuery, sort}} = CartState();

    const transformedProducts = () => {
        let sortedProducts = products;
        if(sort){
          sortedProducts = sortedProducts.sort((a,b) => 
           sort === "lowToHigh" ? a.price - b.price : b.price - a.price
          );
        }

        //default it wont show out of stock products. will show only when include out of stock is checked
        if(byStock === false){
            sortedProducts = sortedProducts.filter((prod) => prod.inStock)
        }

        if(byFastDelivery){
            sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery)
        }
        if(byRating){
            sortedProducts = sortedProducts.filter((prod) => prod.ratings <= byRating);
        }

        if(searchQuery){
            sortedProducts = sortedProducts.filter((prod) => prod.name.toLowerCase().includes(searchQuery))
        }

        return sortedProducts;

    }
    return (
        <div className="home">
            <Filters />
            <div className="productContainer">
           {
               //map can be used with function also..todo: need to find out more on this
               transformedProducts().map((prod) => {
                   return <SingleProducts prod={prod} key={prod.id}/>
               })
           }
           </div>
        </div>
    )
}

export default Home
