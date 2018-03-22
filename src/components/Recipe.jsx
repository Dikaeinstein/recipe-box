import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidV1 from 'uuid/v1';
import Button from './Button';
import ModalForm from './ModalForm';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
  }

  handleUpdate(recipe) {
    const updatedRecipe = Object.assign({}, recipe, { id: this.props.id });
    this.props.onUpdate(updatedRecipe);
  }

  renderIngredients() {
    return this.props.ingredients.map(ingredient => (
      <p key={uuidV1()}>{ingredient}</p>
    ));
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <a className="card-link" data-toggle="collapse" href={`#collapse${this.props.name + this.props.id}`} role="button">
            {this.props.name}
          </a>
        </div>
        <div id={`collapse${this.props.name + this.props.id}`} className="collapse" data-parent="#accordion">
          <div className="card-body">
            <p className="text-center font-weight-bold">Ingredients</p>
            {this.renderIngredients()}
            <Button value="Delete" btnClassList="btn btn-danger mr-2" onClick={this.handleDelete} />
            <Button
              value="Edit"
              btnClassList="btn btn-default"
              data-toggle="modal"
              data-target={`#editRecipe${this.props.id}`}
            />
            <ModalForm
              name={`editRecipe${this.props.id}`}
              type="Edit"
              onSubmit={this.handleUpdate}
              onClick={this.handleDelete}
              ingredients={this.props.ingredients}
              recipename={this.props.name}
            />
          </div>
        </div>
      </div>
    );
  }
}

Recipe.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default Recipe;
