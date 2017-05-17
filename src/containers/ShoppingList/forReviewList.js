import React from 'react';

import ForReviewItem from './forReviewItem';

class ForReviewList extends React.Component {

  static propTypes = {
    forReview: React.PropTypes.array.isRequired
  };

  render() {
    let forReview = this.props.forReview;
    return (
      <div>
        <h3 className="text-center">Items For Review:</h3>
        <div className="notepad-paper">
          <div className="notepad-lines"></div>
          <ul className="notepad-list">
          {forReview.map(function(item) {
            return <ForReviewItem key={item.name} item={item} />
          })}
        </ul>
        </div>
      </div>
    )
  }
}

export default ForReviewList;
        