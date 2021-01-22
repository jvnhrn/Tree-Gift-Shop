import React from "react";
import { CartContext } from "../../CartContext";
import { useContext, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup'


import "./Cart.css";

import { Container } from "react-bootstrap";

function Cartt(props) {
    const {
        cart,
        reduceCount,
        total,
        getTotal,
        saveCart,
        getCart,
        increaseCount,
        showSidebar,
        removeFromCart,
        showMessage,
        resetCart,
    } = useContext(CartContext);

    useEffect(() => {
        setTimeout(() => {
            getCart();
        }, 400);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            saveCart();
        }, 2000);
    }, [total]);

    getTotal();

    return (
        <Container id="cart-container">
            <div className="cart-banner">
                <h2 className="cart-close" onClick={showSidebar}>
                    X
                </h2>
                <h2>Your cart</h2>
                <span>Please complete your purchase</span>
            </div>

            <>
                {cart.map((item) => (
                    <>
                        <ListGroup className="cd-cart-list">
                            <ListGroup.Item className="cd-cart-list-items">
                                <div className="cd-cart-head"> 
                                    <img src={item.tree_img} alt={item.name} width="50px" height="50px" />
                                    <h3>{item.tree_name}</h3>
                                </div>
                                <div id="cd-cart-btn"> 
                                <Button
                                    id="item-button-remove"
                                    value={item.id}
                                    onClick={() => {
                                        reduceCount(item.tree_id);
                                    }}
                                >
                                    -
                                </Button>
                                <span id="cd-cart-count">{item.count}</span>
                                <Button
                                    id="item-button-add"
                                    value={item.id}
                                    onClick={() => {
                                        increaseCount(item.tree_id);
                                    }}
                                >
                                    +
                                </Button>
                                <div id="cd-price">${(item.price * item.count).toFixed(2)}</div>
                                </div>
                                <Button
                                    value={item.id}
                                    onClick={() => {
                                        removeFromCart(item);
                                    }}
                                >
                                    Remove
                                </Button>
                                
                            </ListGroup.Item>
                        </ListGroup>
                    </>
                )
                )}
            </>
            <div className="total">
                {showMessage(cart)}
                <h4>Total:</h4>
                <div className="sum">$ {parseFloat(total).toFixed(2)}</div>
                <div className="checkout-buttons-container">
                    <div>
                        <Button
                            as={Link}
                            to="/checkout"
                            className="checkout-button"
                            onClick={showSidebar}
                        >
                            To checkout
                                </Button>
                    </div>
                    <Button className="checkout-button" onClick={resetCart}>
                        Reset Cart
                            </Button>
                </ div>
            </div>
        </Container>

    )

}

export default withRouter(Cartt)