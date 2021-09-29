import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

function App() {
	const [cuisine, setCuisine] = useState('');
	const [ingredients, setIngredients] = useState('');
	const [exclusions, setExclusions] = useState('');

	const [recipes, setRecipes] = useState([]);
	const [alert, setAlert] = useState('');

	const API_KEY = process.env.REACT_APP_API_KEY;
	const url = `https://api.spoonacular.com/recipes/search?query=${cuisine}&excludeIngredients=${exclusions}&includeIngredients=${ingredients}&apiKey=${API_KEY}`;

	const getData = async () => {
		if (cuisine !== '') {
			const result = await Axios.get(url);

			if (!result.products === []) {
				return setAlert('No food with such name');
			}
			setRecipes(result.data.results);
			setCuisine('');
			setIngredients('');
			setExclusions('');
			setAlert('');
		} else {
			setAlert('Please fill the form');
		}
	};

	const onCuisineChange = (e) => setCuisine(e.target.value);
	const onIngredientsChange = (e) => setIngredients(e.target.value);
	const onExclusionChange = (e) => setExclusions(e.target.value);

	const onSubmit = (e) => {
		e.preventDefault();
		getData();
	};

	return (
		<div className='App'>
			<h1>Cuisine Helper {process.env.API_KEY}</h1>
			<form onSubmit={onSubmit} className='search-form'>
				{alert !== '' && <Alert alert={alert} />}
				<div className='inputs-container'>
					<input
						type='text'
						name='cuisine'
						onChange={onCuisineChange}
						value={cuisine}
						autoComplete='off'
						placeholder='Enter a cuisine'
					/>
					<input
						type='text'
						name='cuisine'
						onChange={onIngredientsChange}
						value={ingredients}
						autoComplete='off'
						placeholder='Enter ingredients (commas seperating)'
					/>
					<input
						type='text'
						name='cuisine'
						onChange={onExclusionChange}
						value={exclusions}
						autoComplete='off'
						placeholder='Enter exclusions with (commas seperating)'
					/>
				</div>
				<input type='submit' value='Search' />
			</form>
			<div className='recipes'>
				{recipes !== [] &&
					recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
			</div>
		</div>
	);
}

export default App;
