import React from "react";

const RESET_VALUES = {id: '', category: '', price: '', stocked: false, name: ''};

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(e) {
    this.props.onSave(this.state.product);
    // reset the form values to blank after submitting:
    this.setState({
      product: Object.assign({}, RESET_VALUES)
    });
    // prevent the form submit event from triggering an HTTP Post:
    e.preventDefault();
  }

  render() {
    return (
      <form>
        <h3>Enter a new product</h3>
        <p>
          <label>
            Name
            <br />
            <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Category
            <br />
            <input type="text" name="category" />
          </label>
        </p>
        <p>
          <label>
            Price
            <br />
            <input type="text" name="price" />
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="stocked" />
            &nbsp;In stock?
          </label>
        </p>
        <input type="submit" value="Save" onClick={this.handleSave} />
      </form>
    );
  }
}

export default ProductForm;
