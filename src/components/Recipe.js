import React, { useState, useEffect } from 'react';
import RecipeDetails from './RecipeDetails';
import Axios from 'axios';

const Recipe = ({ recipe }) => {
	const [ingredients, setIngredients] = useState([]);
	const [image, setImage] = useState('');
	const [show, setShow] = useState(false);
	const { title, sourceUrl, id } = recipe;
	const API_KEY = process.env.REACT_APP_API_KEY;

	const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY}`;

	useEffect(() => {
		const getData = async () => {
			const result = await Axios.get(url);
			setIngredients(result.data.extendedIngredients);
			setImage(result.data.image);
		};
		getData();
	}, [url]);

	return (
		<div className='recipe'>
			<h2>{title}</h2>
			<img src={image} alt={title} />
			<a
				href={sourceUrl}
				target='_blank'
				rel='noopener noreferrer'
				className='url-link'>
				URL
			</a>
			<button onClick={() => setShow(!show)}>Ingredients</button>
			{show && <RecipeDetails ingredients={ingredients} />}
		</div>
	);
};

export default Recipe;
