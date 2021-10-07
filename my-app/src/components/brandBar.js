import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {ListGroup,} from "react-bootstrap";
import { Context } from "../index";

const BrandBar = observer(() => {
const { product } = useContext(Context)
  return (  

    <ListGroup horizontal={'md'}>
      {product.brands.map(brand =>

        <ListGroup.Item
        action variant="primary"
        style={{cursor:"pointer"}}
        key={brand.id}
        className="p-3"
        onClick={() => product.setSelectedBrand(brand)} 
        >
            {brand.name}
        </ListGroup.Item>
      )}
    </ListGroup>

  );
});

export default BrandBar;