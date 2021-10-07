import React, { useState } from "react";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import { createType } from "../../http/productApi";

const AddType = ({show, onHide}) => {
  const [value, setValue] = useState()
  const addType = () => {
        createType({name: value}).then(data => setValue(''))
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
        Add type
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <FormControl
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={"Add type"}
            />
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-secondary" onClick={onHide}>Close</Button>
      <Button variant="outline-success" onClick={addType}>Add</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default AddType;