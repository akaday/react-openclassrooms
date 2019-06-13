import React from "react";

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => {
      prevState.product[name] = value;
      return { product: prevState.product };
    });
  }

  render() {
    return (
      <form>
        <p>
          <label>
            Name
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
            Category
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
            Price
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
      </form>
    );
  }
}

export default Filters;
