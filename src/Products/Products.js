import React from "react";
import Filters from "./Filters.js";
import ProductForm from "./ProductForm.js";
import ProductTable from "./ProductTable/ProductTable.js";

let PRODUCTS = {
  "1": {
    id: 1,
    category: "Musical Instruments",
    price: 459.99,
    stocked: true,
    name: "Clarinet"
  },
  "2": {
    id: 2,
    category: "Musical Instruments",
    price: 5000,
    stocked: true,
    name: "Harpsicord"
  },
  "3": {
    id: 3,
    category: "Musical Instruments",
    price: 11000,
    stocked: false,
    name: "Fortepiano"
  },
  "4": {
    id: 4,
    category: "Furniture",
    price: 799,
    stocked: true,
    name: "Chaise Lounge"
  },
  "5": {
    id: 5,
    category: "Furniture",
    price: 1300.99,
    stocked: false,
    name: "Dining Table"
  },
  "6": {
    id: 6,
    category: "Furniture",
    price: 100,
    stocked: true,
    name: "Bean Bag"
  }
};

const DEFAULT_VALUE = {
  id: "",
  category: "",
  price: "",
  stocked: false,
  name: ""
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      inStockOnly: false,
      products: PRODUCTS,
      productEdit: { ...DEFAULT_VALUE },
      editing: false
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.editProduct = this.editProduct.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  handleFilter(filterInput) {
    this.setState(filterInput);
  }

  saveProduct(product) {
    if (!product.id) {
      product.id = new Date().getTime();
    }
    this.setState(prevState => {
      prevState.products[product.id] = product;
      prevState.productEdit = { ...DEFAULT_VALUE };
      prevState.editing = false;
      return { prevState };
    });
  }

  editProduct(productEdit) {
    // this.setState(prevState => {
    //   prevState.productEdit = productEdit;
    //   return { products };
    // });
  }

  handleEdit(product) {
    console.log(product);
    this.setState(() => {
      return { productEdit: { ...product }, editing: true };
    });
  }

  handleDestroy(productId) {
    this.setState(prevState => {
      let products = prevState.products;
      delete products[productId];
      return { products };
    });
  }

  cancelEdit(productId) {
    this.setState(prevState => {
      prevState.productEdit = { ...DEFAULT_VALUE };
      prevState.editing = false;
      return { prevState };
    });
  }

  render() {
    return (
      <div>
        <Filters
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilter={this.handleFilter}
        />
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onEdit={this.handleEdit}
          editing={this.state.editing}
          onDestroy={this.handleDestroy}
        />
        <ProductForm
          product={this.state.productEdit}
          onEdit={this.editProduct}
          cancelEdit={this.cancelEdit}
          onSave={this.saveProduct}
        />
      </div>
    );
  }
}

export default Products;
