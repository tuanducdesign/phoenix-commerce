import React from 'react';
// import Rating from "./Rating";
import Table from "react-bootstrap/Table";
// import Naira from "react-naira";

const TableStructure = ({product}) => {
    return (
      <div>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Picture Of Product</th>
              <th>brand</th>
              <th>Product Description</th>
              <th>Product Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.brand}</td>
              <td>{product.productDescription}</td>
              <td>{product.productPrice}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
}

export default TableStructure
