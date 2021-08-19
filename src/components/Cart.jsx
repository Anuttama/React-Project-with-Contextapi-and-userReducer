import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Col,
  FormControl,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import "./Home.css";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setTotalPrice(cart.reduce((acc, cart) => acc + Number(cart.price)*(cart.qty), 0));
  }, [cart]);

  return (
    <div className="Home">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded></Image>
                </Col>
                <Col md={2}>
                  <span>{prod.name}</span>
                </Col>
                <Col md={2}>Rs {prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                {/*for dropdown */}
                <Col md={2}>
                  <FormControl as="select" value={prod.qty}
                  onChange={(e) => {
                      dispatch({
                          type:"CHANGE_CART_QTY",
                          payload:{
                              id: prod.id,
                              qty: e.target.value
                          }
                      })
                    }
                  }
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </FormControl>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="filters summary">
          <span className="title">Subtotal ({cart.length}) items</span>
          <span style={{ fontWeight: 700, fontSize: 20 }}>
            Total: Rs {totalPrice}
          </span>
          <Button type="button" disabled={cart.length === 0}>
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
