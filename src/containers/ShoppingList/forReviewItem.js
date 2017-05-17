import React from 'react';

import FontAwesome from 'react-fontawesome';

import IngredientMapping from './ingredientMapping';

class ForReviewItem extends React.Component {

  static propTypes = {
    addingBaseIngredient: React.PropTypes.bool.isRequired,
    addingIngredientMapping: React.PropTypes.bool.isRequired,
    item: React.PropTypes.shape().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
        addingBaseIngredient: false,
        addingIngredientMapping: false
    };
  }

  fetchIngredients = (e) => {
    e.preventDefault();
    const value = this.recipeInputForm.getValue();
    if (value) {
        this.props.actions.slFetchIngredients(value.recipeUrls);
    }
  };

  onAddBaseIngredientClick = (e) => {
    this.setState({addingBaseIngredient: !this.state.addingBaseIngredient });
  };

  onAddIngredientMappingClick = (e) => {
    this.setState({addingIngredientMapping: !this.state.addingIngredientMapping });
  };

  render() {
    let item = this.props.item;
    return (
      <div className="for-review">
        <div onClick={this.onAddIngredientMappingClick}>
          {item.name}
        </div>
        { this.state.addingIngredientMapping ? 
          <IngredientMapping item={item}/>
          : null
        }
      </div>
    )
  }
}

export default ForReviewItem;

//  <div className="for-review">
//   <div className="col-sm-12">
//     <div className="col-sm-8">
//       <div className='text-left'>
        
//       </div>
//     </div>
//     <div className="col-sm-4">
//       <div className="col-sm-2 pull-right">
//         <FontAwesome name='trash-o' />
//       </div>
//       <div className="pull-right" onClick={this.onAddIngredientMappingClick}>
//         <FontAwesome name='pencil' />
//       </div>
//     </div>
  // { this.state.addingIngredientMapping ? 
  //   <IngredientMapping item={item}/>
  //   : null
  // }
//   </div>
// </div>