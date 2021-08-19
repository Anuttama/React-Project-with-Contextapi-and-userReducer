import React from "react";
import {
  Dropdown,
  Container,
  FormControl,
  Nav,
  Navbar,
  Badge,
  Button
} from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { CartState } from "../context/Context";
import './Home.css';

function Header() {
    const {state : {cart}, dispatch, productDispatch } = CartState();
  return (
    <Navbar className="navbar__header" bg="dark" variant="dark" style={{ height: 60 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shopping cart</Link>
        </Navbar.Brand>

        <Navbar.Text className="search">
          <FormControl
            style={{ width: 300 }}
            placeholder="Search a product"
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value
              });
            }
            }
          />
        </Navbar.Text>
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
              {<Badge>{cart.length}</Badge>}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 370 }}>
                {
                    cart.length > 0 ? (
                     <>
                     {cart.map((prod) => (
                         <span className="cartItem" key={prod.id}>
                             <img
                              src={prod.image}
                              className="cartItemImg"
                              alt={prod.name}
                             />
                    <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>Rs {prod.price} </span>
                    </div>
                    
                        <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer"}}
                        onClick={() => 
                            dispatch({
                             type: "REMOVE_FROM_CART",
                             payload: prod
                            })
                          }
                        />
                    
                    </span>
                     )) }
                    <Link to="/cart">
                        <Button style={{ width: "95%", margin: "0 10px"}}>
                          Go To Cart
                        </Button>
                    </Link>
                      </>
                    ) : (
                    <span style={{ padding: 10 }}>Cart is Empty</span>
                    )
                }
              
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
