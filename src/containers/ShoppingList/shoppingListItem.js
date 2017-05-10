import React from 'react';

class ShoppingListItem extends React.Component {

  static propTypes = {
    name: React.PropTypes.string,
    item: React.PropTypes.shape().isRequired,
  };

  render() {
    let name = this.props.name;
    let amount = this.props.item.amount;
    let unit = this.props.item.unit;
    let category = this.props.item.category;
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className='alert'>
            {name}: {amount}{unit}
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingListItem;