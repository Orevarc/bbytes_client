import React from 'react';

class ShoppingListItem extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
    item: React.PropTypes.shape().isRequired,
  };

  renderItem = () => {
    let name = this.props.name;
    let amount = parseFloat(this.props.item.amount).toFixed(2);
    let unit = this.props.item.unit;
    let category = this.props.item.category;
    var item;
    if (category === 'MISC') {
      item = <div className="ingredient">{name}</div>;
    }
    else {
      
      item = <div className="ingredient">{name}: {amount} <span className="unit">{unit}</span></div>;
    }
    return item;

  };

  render() {
    let name = this.props.name;
    let amount = parseFloat(this.props.item.amount).toFixed(2);
    let unit = this.props.item.unit;
    let category = this.props.item.category;
    var unitHtml = <span className="unit">{unit}</span>;
    return (
      <div className="ingredient">
        {name}
        {category != 'MISC' ? [': ',amount,' ',unitHtml] : null}
      </div>
    )
  }
}

export default ShoppingListItem;