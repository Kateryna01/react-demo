import React, { useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
import AddType from "../components/modals/AddType";
import AddBrand from "../components/modals/AddBrand";
import AddProduct from "../components/modals/AddProduct";
import { observer } from "mobx-react-lite";


const Admin = observer(() => {
  const [productVisible, setProductVisible]= useState(false)
  const [brandVisible, setBrandVisible]= useState(false)
  const [typeVisible, setTypeVisible]= useState(false)
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}>
        <Card 
      style={{ width: 600, height: 300 }} 
      border="secondary"
      className="p-5"
      bg={'info'}
      text={'light'}>
      <Button 
      variant={"secondary"} 
      className={"mt-4 p-10"}
    
      onClick={()=> setTypeVisible(true)}
      >
        Add type
        </Button>
      <Button variant={"secondary"} 
      className={"mt-4 p-10"}
      onClick={()=> setBrandVisible(true)}
      >
        Add Brand
        </Button>
      <Button 
      variant={"secondary"} 
      className={"mt-4 p-10"}
      onClick={()=> setProductVisible(true)}
      >
        Add Product
        </Button>
      <AddType show={typeVisible} onHide={()=> setTypeVisible(false)}/>
      <AddBrand show={brandVisible} onHide={()=> setBrandVisible(false)}/>
      <AddProduct show={productVisible} onHide={()=> setProductVisible(false)}/>
      </Card>
    </Container>
  );
});

export default Admin;
