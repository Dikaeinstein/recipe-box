import React, { Component } from 'react';
import uuidV1 from 'uuid/v1';
import Title from './Title';
import RecipeList from './RecipeList';
import Button from './Button';
import ModalForm from './ModalForm';
import storageAvailable from '../lib/storageAvailable';

class RecipeBox extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
    };
    this.getRecipes = this.getRecipes.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.updateRecipe = this.updateRecipe.bind(this);
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    if (storageAvailable('localStorage')) {
      const recipes = JSON.parse(localStorage.getItem('_dikaeinstein_recipes')) || [];
      this.setState({ recipes });
    }
  }

  addRecipe(recipe) {
    if (storageAvailable('localStorage')) {
      const recipes = this.state.recipes.map(rec => rec.recipe);
      if (!recipes.includes(recipe.recipe)) {
        recipes.push(Object.assign({}, recipe, { id: uuidV1() }));
        this.setState({ recipes });
        localStorage.setItem('_dikaeinstein_recipes', JSON.stringify(recipes));
      }
    }
  }

  updateRecipe(recipe) {
    if (storageAvailable('localStorage')) {
      const { recipes } = this.state;
      const index = recipes.findIndex(oldRecipe => oldRecipe.id === recipe.id);
      recipes.splice(index, 1, recipe);
      this.setState({ recipes });
      localStorage.setItem('_dikaeinstein_recipes', JSON.stringify(recipes));
    }
  }

  deleteRecipe(id) {
    if (storageAvailable('localStorage')) {
      const filteredRecipes = this.state.recipes.filter(recipe => (
        recipe.id !== id
      ));
      this.setState({ recipes: filteredRecipes });
      localStorage.setItem('_dikaeinstein_recipes', JSON.stringify(filteredRecipes));
    }
  }

  render() {
    return (
      <div>
        <Title title="Recipe Box" />
        <main className="container">
          <h2 className="m-3">A box of recipes :)</h2>
          <RecipeList
            recipes={this.state.recipes}
            onDelete={this.deleteRecipe}
            onUpdate={this.updateRecipe}
          />
          <Button
            value="Add Recipe"
            btnClassList="btn btn-primary mt-4"
            data-toggle="modal"
            data-target="#addRecipe"
          />
          <ModalForm name="addRecipe" type="Add" onSubmit={this.addRecipe} />
        </main>
      </div>
    );
  }
}

export default RecipeBox;
