import React from "react";

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.destroy = this.destroy.bind(this);
    this.thousandFormat = this.thousandFormat.bind(this);
  }
  edit() {
    this.props.onEdit(this.props.product);
  }
  destroy() {
    this.props.onDestroy(this.props.product.id);
  }
  thousandFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
  render() {
    var name = this.props.product.stocked ? (
      this.props.product.name
    ) : (
      <span style={{ color: "red" }}>{this.props.product.name}</span>
    );
    return (
      <tr>
        <td>{name}</td>
        <td>${this.thousandFormat(this.props.product.price)}</td>
        <td>
        {this.props.editing}
          <button disabled={this.props.editing} onClick={this.edit}>edit</button>
          <button disabled={this.props.editing} onClick={this.destroy}>x</button>
        </td>
      </tr>
    );
  }
}

export default ProductRow;
