import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Context } from "../index";
import BrandBar from "../components/brandBar";
import ProductList from "../components/productList";
import TypeBar from "../components/typeBar";
import Pages from "../components/Pages";
import {fetchTypes, fetchBrands, fetchProducts} from "../http/productApi"


const Shop = observer (() => {
  const {product} = useContext(Context)

  useEffect (() =>{
    fetchTypes().then(data => product.setTypes(data))
    fetchBrands().then(data => product.setBrands(data))
    fetchProducts(null, null, 1, 4).then(data =>{ 
      product.setProducts(data.rows)
      product.setTotalCount(data.count)
      })
  }, [])

  useEffect(()=>{
    fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, 4).then(data =>{ 
      product.setProducts(data.rows)
      product.setTotalCount(data.count)
      })
  }, [product.page, product.selectedType, product.selectedBrand])

  return (
    <Container>
      <Row className="mt-3">
        <Col md={3}>
          <TypeBar/>
        </Col>
        <Col md={9}>
          <BrandBar/>
          <ProductList/>
          <Pages/>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
