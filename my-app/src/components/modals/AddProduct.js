import React, { useContext, useState, useEffect } from "react";
import { Modal, Button, Form, Dropdown, FormControl, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import {fetchTypes, fetchBrands, createProduct, fetchProducts} from "../../http/productApi"
import { observer } from "mobx-react-lite";

const AddProduct = observer(({ show, onHide }) => {
  const {product} = useContext(Context)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(null)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect (() =>{
    fetchTypes().then(data => product.setTypes(data))
    fetchBrands().then(data => product.setBrands(data))
  }, [])

  const addInfo = () => {
    setInfo([...info, {title:'', description:'', number: Date.now()}])
  }

  const removeInfo = (number) => {
    setInfo(info.filter(i => i.number !== number))
  }

  const changeInfo = (key, value, number) =>{
    setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addProduct = () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', product.selectedBrand.id)
    formData.append('typeId', product.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createProduct(formData).then(data => onHide())
  }

  return (
    <Modal 
    show={show} 
    onHide={onHide} 
    size="lg" 
    centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{product.selectedType.name || "Select type"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {product.types.map (type =>
                <Dropdown.Item 
                onClick={()=> product.setSelectedType(type)}
                key={type.id}>
                  {type.name}
                  </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>{product.selectedBrand.name || "Select brand"}</Dropdown.Toggle>
            <Dropdown.Menu>
              {product.brands.map (brand =>
                <Dropdown.Item 
                onClick={()=> product.setSelectedBrand(brand)}
                key={brand.id}>
                  {brand.name}
                  </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <FormControl
            value={name}
            onChange={e => setName(e.target.value)}
            className="mt-3"
            placeholder="Enter product name"
          />
          <FormControl
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="mt-3"
            placeholder="Enter price of product"
            type="number"
          />
          <FormControl
            className="mt-3"
            type="file"
            onChange={selectFile}
          />
          <hr/>
          <Button 
          variant="outline-secondary"
          onClick={addInfo}
          >
          Add description
          </Button>
          {info.map( i =>
              <Row className="mt-4" key={i.number}>
                <Col md={4}>
                <FormControl
                  value={i.title}
                  onChange = {(e) => changeInfo('title', e.target.value, i.number)}
                  placeholder="Specification"/>
                </Col>
                <Col md={4}>
                  <FormControl
                  value={i.description}
                  onChange = {(e) => changeInfo('description', e.target.value, i.number)}
                  placeholder="Description"/>
                </Col>
                <Col md={4}>
                  <Button 
                  onClick={()=> removeInfo(i.number)}
                  variant={"outline-danger"}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addProduct}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AddProduct;
