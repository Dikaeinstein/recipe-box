import React from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';

const RecipeList = (props) => {
  const recipeNodes = props.recipes.map(recipe => (
    <Recipe
      key={recipe.id}
      id={recipe.id}
      name={recipe.recipe}
      ingredients={recipe.ingredients}
      onDelete={props.onDelete}
      onUpdate={props.onUpdate}
    />
  ));

  return (
    <div className="accordion">
      {recipeNodes}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecipeList;
