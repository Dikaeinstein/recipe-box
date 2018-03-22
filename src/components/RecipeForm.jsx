import React from 'react';
import PropTypes from 'prop-types';

const RecipeForm = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const { author, text } = e.target;
    const authorName = author.value.trim();
    const textContent = text.value.trim();
    if (!authorName || !textContent) {
      return;
    }

    props.onSubmit({ author: authorName, text: textContent });
    author.value = '';
    text.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="recipe-name" className="col-form-label">Recipe:</label>
        <input type="text" className="form-control" id="recipe-name" />
      </div>
      <div className="form-group">
        <label htmlFor="recipe-ingredients" className="col-form-label">Ingredients:</label>
        <textarea className="form-control" id="recipe-ingredients" />
      </div>
    </form>
  );
};

RecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RecipeForm;
