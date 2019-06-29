import React from "react";
import "./ProductForm.css";

const RESET_VALUES = {
  id: "",
  category: "",
  price: "",
  stocked: false,
  name: ""
};

const RESET_ERROR = {
  category: "",
  price: "",
  name: ""
};

class ProductForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.clearState = this.clearState.bind(this);
    this.cancelSave = this.cancelSave.bind(this);
    this.validation = this.validation.bind(this);
    this.setError = this.setError.bind(this);

    this.state = {
      product: { ...RESET_VALUES },
      errors: { ...RESET_ERROR }
    };
  }

  componentDidUpdate = (prevProps, prevState) => {
    // console.log("componentDidUpdate", this.props.product, prevProps.product);
    if (this.props.product !== prevProps.product) {
      this.setProduct(this.props.product);
    }
    // console.log("product : ", this.state.product);
  };

  setProduct(dataEdit) {
    this.setState(prevState => {
      prevState.product = dataEdit;
      return { prevState };
    });
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => {
      console.log("0", prevState);
      prevState.product[name] = value;
      console.log("1", this.state);
      return { product: prevState.product };
    });
  }

  // do Save data
  // send data to Products commponent
  // end Products Component will save it to its object
  handleSave(e) {
    this.setError("reset", "");
    if (this.validation()) {
      this.props.onSave({ ...this.state.product });
      this.clearState();
    }
    console.log(this.state.product);
    e.preventDefault();
  }

  validation() {
    let product = this.state.product;
    if (product.name === "") {
      this.setError("name", "(can't be empty)");
      return false;
    } else if (product.category === "") {
      this.setError("category", "(can't be empty)");
      return false;
    } else if (product.price === "") {
      this.setError("price", "(can't be empty)");
      return false;
    } else if (isNaN(product.price)) {
      this.setError("price", "(must be number)");
      return false;
    }
    return true;
  }

  setError(field, errorText) {
    if (field === "reset") {
      this.setState(prevState => {
        prevState.errors = { ...RESET_ERROR };
        return { prevState };
      });
    } else {
      this.setState(prevState => {
        prevState.errors[field] = errorText;
        return { prevState };
      });
    }
  }

  cancelSave() {
    this.clearState();
    this.props.cancelEdit();
  }

  clearState() {
    this.setState({
      product: { ...RESET_VALUES },
      errors: { ...RESET_ERROR }
    });
  }

  render() {
    return (
      <form>
        <p>
          <label>
            Name <span className="error">{this.state.errors.name}</span>
            <br />
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.product.name}
            />
          </label>
        </p>
        <p>
          <label>
            Category <span className="error">{this.state.errors.category}</span>
            <br />
            <input
              type="text"
              name="category"
              onChange={this.handleChange}
              value={this.state.product.category}
            />
          </label>
        </p>
        <p>
          <label>
            Price <span className="error">{this.state.errors.price}</span>
            <br />
            <input
              type="text"
              name="price"
              onChange={this.handleChange}
              value={this.state.product.price}
            />
          </label>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              name="stocked"
              onChange={this.handleChange}
              checked={this.state.product.stocked}
            />
            &nbsp;In stock?
          </label>
        </p>
        <input type="submit" value="Save" onClick={this.handleSave} />
        {this.state.product.id !== "" ? (
          <input type="button" value="Cancel" onClick={this.cancelSave} />
        ) : (
          <input type="button" value="Clear" onClick={this.clearState} />
        )}
      </form>
    );
  }
}

export default ProductForm;
