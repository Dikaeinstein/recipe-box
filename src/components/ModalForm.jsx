import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.modalDialog = window.$(this.modal);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { recipeName, recipeIngredients } = e.target;
    const recipe = recipeName.value.trim();
    const ingredients = recipeIngredients.value.trim().split(',');
    if (!recipe || !ingredients) {
      return;
    }

    this.props.onSubmit({ recipe, ingredients });
    recipeName.value = '';
    recipeIngredients.value = '';
    this.modalDialog.modal('hide');
  }

  render() {
    return (
      <div
        className="modal fade"
        id={this.props.name}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={this.props.name}
        aria-hidden="true"
        ref={(div) => { this.modal = div; }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${this.props.name}Label`}>{this.props.type} Recipe</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="recipeName" className="col-form-label">Recipe:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={this.props.recipename}
                    id="recipeName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipeIngredients" className="col-form-label">Ingredients:</label>
                  <textarea
                    className="form-control"
                    defaultValue={this.props.ingredients}
                    id="recipeIngredients"
                  />
                </div>
                <button type="submit" className="btn btn-primary mr-2">{this.props.type}</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ModalForm.defaultProps = {
  recipename: '',
  ingredients: [],
};

ModalForm.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  recipename: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
};

export default ModalForm;
