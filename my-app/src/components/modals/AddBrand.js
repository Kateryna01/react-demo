import React, {useState} from "react";
import { Modal, Form, FormControl, Button } from "react-bootstrap";
import { createBrand } from "../../http/productApi";

const AddBrand = ({show, onHide}) => {
  const [value, setValue] = useState()
  const addBrand = () => {
        createBrand({name: value}).then(data => setValue(''))
        onHide()
  }

  return (
    <Modal
    show={show}
    onHide={onHide}
    size="lg"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Add brand
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <FormControl
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Add brand"}
            />
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={onHide}>Close</Button>
      <Button variant="outline-success" onClick={addBrand}>Add</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default AddBrand;