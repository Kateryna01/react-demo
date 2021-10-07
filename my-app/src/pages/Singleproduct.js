import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Button } from "react-bootstrap";
import bigstar from "../images/bigstar.png"
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "../http/productApi";
import { observer } from "mobx-react-lite";

const SingleProduct = observer(() => {
  const [product, setProduct] = useState({info: []})
  const {id} = useParams()


  useEffect(() => {
    fetchOneProduct(id).then(data => setProduct(data))
  }, [])


  return (
    <Container className="mt-3">
      <Row>
      <Col md={4}>
        <Image width={300} height={300} src={process.env.REACT_APP_API_URL + product.img}/>
      </Col>
      <Col md={4}>
        <Row className="flex-column aline-items-center">
          <h2 className="text-center">{product.name}</h2>
          <div 
          className="d-flex justify-content-center align-items-center"
          style={{backgroundImage: 'url(' + bigstar + ')', backgroundRepeat: 'no-repeat', backgroundSize:'cover', width:280, height:280, fontSize: 64}}>
 
            {product.rating}
          </div>
        </Row>
      </Col>
      <Col md={4}>
        <Card>
          <div className="d-flex flex-column aline-items-center justify-content-around"
          style={{width:300, height: 300, fontSize: 32, border:'5px solid lightgrey'}}>
            <div className="d-flex aline-items-center justify-content-center">
          <h3>From:{product.price}CAD</h3>
            </div>
            <div className="d-flex aline-items-center justify-content-center">
          <Button variant="outline-secondary">Add to Cart</Button>
          </div>
          </div>
        </Card>
      </Col>
      </Row>
      <Row className="flex-column mt-3">
        <h1>Product information</h1>
        {product.info.map((info, index) =>
        <Row className="align-items-center"  key={info.id} style={{height:50, background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding:10}}>
          {info.title}:{info.description}
        </Row>)}
      </Row>
    </Container>

  );
});

export default SingleProduct;
