import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "../index";
import ProductItem from "./productItem";

const ProductList = observer(() => {
  const { product } = useContext(Context);
  return (
    <Row className="mt-3">
      {product.products.map(product => 
        <ProductItem key={product.id} product={product} />
      )}
    </Row>
  );
});

export default ProductList;
