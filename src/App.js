import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

function App() {
	const [query, setQuery] = useState('');
	const [ingredients, setIngredients] = useState('yogurt');
	const [exclusions, setExclusions] = useState('ginger');
	const [recipes, setRecipes] = useState([]);
	const [alert, setAlert] = useState('');

	const API_KEY = process.env.REACT_APP_API_KEY;
	const url = `https://api.spoonacular.com/recipes/search?query=${query}&excludeIngredients=${exclusions}&includeIngredients=${ingredients}&apiKey=${API_KEY}`;

	const getData = async () => {
		if (query !== '') {
			const result = await Axios.get(url);

			if (!result.products === []) {
				return setAlert('No food with such name');
			}
			setRecipes(result.data.results);
			setQuery('');
			setAlert('');
		} else {
			setAlert('Please fill the form');
		}
	};

	const onChange = (e) => setQuery(e.target.value);

	const onSubmit = (e) => {
		e.preventDefault();
		getData();
	};

	return (
		<div className='App'>
			<h1>Cuisine Helper {process.env.API_KEY}</h1>
			<form onSubmit={onSubmit} className='search-form'>
				{alert !== '' && <Alert alert={alert} />}
				<input
					type='text'
					name='query'
					onChange={onChange}
					value={query}
					autoComplete='off'
					placeholder='Enter a cuisine'
				/>
				<input type='submit' value='Search' />
			</form>
			<div className='recipes'>
				{recipes !== [] &&
					recipes.map((recipe) => (
						<Recipe key={recipe.id} recipe={recipe} API_KEY={API_KEY} />
					))}
			</div>
		</div>
	);
}

export default App;
