import { observer } from "mobx-react-lite";
import React from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import star from "../images/star.svg"
import { SINGLEPRODUCT_ROUTE } from "../utils/consts";

const ProductItem = observer( ({product}) => {
    const history = useHistory()
  return (
<Col md={3} sm={6} className="mt-3" onClick={()=> history.push(SINGLEPRODUCT_ROUTE + '/' + product.id)}>
    <Card style={{width:150, cursor:'pointer'}} border={'light'}>
        <Image width={150} height={150} src={process.env.REACT_APP_API_URL + product.img}/>
        <div className="text-black-50 mt-2 d-flex justify-content-between align-items-center">
            <div>{product.brand}</div>
            <div className="d-flex justify-content-between align-items-center">
            <div>{product.rating}</div>
            <Image width={15} height={15} src={star}/>
            </div>
        </div>
        <div className="mt-2">{product.name}</div>
    </Card>
</Col>
  );
});

export default ProductItem;