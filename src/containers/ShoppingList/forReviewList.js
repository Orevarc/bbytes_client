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
        <h3 className="text-center">For Review</h3>
        {forReview.map(function(item) {
          return <ForReviewItem key={item.name} item={item} />
        })}
      </div>
    )
  }
}

export default ForReviewList;
        