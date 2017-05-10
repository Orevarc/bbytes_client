import React from 'react';

import FontAwesome from 'react-fontawesome';

class ForReviewItem extends React.Component {

  static propTypes = {
    item: React.PropTypes.shape().isRequired,
  };

  render() {
    let item = this.props.item;
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="col-sm-8">
            <div className='text-left alert'>
              {item.name}
            </div>
          </div>
          <div className="col-sm-4">
            <div className="col-sm-2 pull-right">
              <FontAwesome name='trash-o' />
            </div>
            <div className="pull-right">
              <FontAwesome name='cog' />
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default ForReviewItem;