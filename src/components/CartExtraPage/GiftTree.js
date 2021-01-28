import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../CartContext";
import { ProductContext } from "../../ProductContext";
import { Container, Card, Col, Row, Button, Form  } from 'react-bootstrap';
import './GiftTree.css'

function GiftTree() {
      const { getOrders, orders, setOrders} = useContext(CartContext);
      const { setGiftcardTrees, giftcardTrees, setRecipientName, recipientName, setGiftMessage, giftMessage} = useContext(ProductContext);
      const [generated, setGenerated] = useState(0)



 useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   const addToGiftcard = (e) => {
       orders.forEach((item, index) => {
           if(item.tree_id === e.tree_id) {
               orders.splice(index, 1)
           }
       })
       setOrders(orders)
     setGiftcardTrees([...giftcardTrees, {...e}])
   }


   const addToCustomersTrees = (e) => {
       giftcardTrees.forEach((item, index) => {
           if(item.tree_id === e.tree_id) {
               giftcardTrees.splice(index, 1)
           }
       })
       setGiftcardTrees(giftcardTrees);
       setOrders([...orders, {...e}])
   }

//   if (!orders || orders.length < 1) {
//     return <div id='gift-tree-error'>
//     <h4>You don't have any trees to give :(</h4>
//         </div>
//   }

  const ListCustomersTrees = (props) => {
        if(orders) {
         return orders.map((obj) => {
        return (
            <Col md={4} xs={12} key={obj.tree_id} className="FarmerTreeCard" onClick={(e) => addToGiftcard(obj)}>
              <Card className="TreeCard">

                <Card.Img
                  variant="top"
                  src={obj.tree_img}
                  id="pic"
                  alt="tree" 
                />
                <div className="Treeshadow"></div>
                <Card.Body>
                <Card.Title> <h2>{obj.tree_name}</h2></Card.Title>
                <span>Quantity: {obj.count}</span>
                <Card.Text>
                  CO<sub>2</sub>: -{obj.co2}kg
                </Card.Text>
                </Card.Body>
              </Card>
            </Col>
        );
      });
        } else {
          return null
        }
      };

      const ListGiftTrees = (props) => {
        if(orders) {
         return giftcardTrees.map((obj) => {
        return (
            <Col md={4} xs={12} key={obj.tree_id} className="FarmerTreeCard" onClick={(e) => addToCustomersTrees(obj)}>
              <Card className="TreeCard">

                <Card.Img
                  variant="top"
                  src={obj.tree_img}
                  id="pic"
                  alt="tree" 
                />
                <div className="Treeshadow"></div>
                <Card.Body>
                <Card.Title> <h2>{obj.tree_name}</h2></Card.Title>
                <span>Quantity: {obj.count}</span>
                <Card.Text>
                  CO<sub>2</sub>: -{obj.co2}kg
                </Card.Text>
                </Card.Body>
              </Card>
            </Col>
        );
      });
        } else {
          return null
        }
      };

    const elo = (e) => {
        e.preventDefault()
        setGenerated(1)
    }

    return (
        <div id='gift-tree-container'>
        <h4>Choose trees to make a gift card!</h4>
        <hr />
        <Container>
        <h3>Your trees:</h3>
        <Row className="giftCenteredContent">
              <ListCustomersTrees />
            </Row>
        <h3>Trees to give:</h3>
        <Row className="giftCenteredContent">
              <ListGiftTrees />
            </Row>
            <Form id="gift-contactForm" onSubmit={elo}>
      <Row>
        <Col>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Name of recipient</Form.Label>
            <Form.Control required type="text" placeholder="Jane" onChange={(e) => setRecipientName(e.target.value) } />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>E-mail address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="jane.doe@mail.com"
            />
          </Form.Group>
        </Col>
      </Row>
       <Row>
        <Col>
          <Form.Group controlId="validationCustom03">
            <Form.Label>Your Message</Form.Label>
            <Form.Control
              required
              as="textarea"
              placeholder="Let's save the planet together!"
              rows={3}
              onChange={(e) => setGiftMessage(e.target.value)}
            />
            <Form.Control.Feedback>Great!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Drop us a line!
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Button variant="primary" type="submit" id='generate-gift-btn'>
        Generate giftcard!
      </Button>
    </Form>
        </Container>
        </div>
    )
}

export default GiftTree