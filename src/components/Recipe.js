import React, { useState, useEffect } from 'react';
import RecipeDetails from './RecipeDetails';
import Axios from 'axios';

const Recipe = ({ recipe }) => {
	const [ingredients, setIngredients] = useState([]);
	const [content, setConent] = useState({ image: '', summary: '' });
	const [showIngredients, setShowIngredients] = useState(false);
	const [showRecipe, setShowRecipe] = useState(false);
	const { title, sourceUrl, id } = recipe;
	const API_KEY = process.env.REACT_APP_API_KEY;

	const url = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${API_KEY}`;

	useEffect(() => {
		const getData = async () => {
			const result = await Axios.get(url);
			setIngredients(result.data.extendedIngredients);
			setConent({
				image: `${result.data.image}`,
				summary: `${result.data.summary}`,
			});
		};
		getData();
	}, [url]);

	return (
		<div className='recipe'>
			<h2>{title}</h2>
			<img src={content.image} alt={title} />
			<a
				href={sourceUrl}
				target='_blank'
				rel='noopener noreferrer'
				className='url-link'>
				URL
			</a>
			<button onClick={() => setShowIngredients(!showIngredients)}>
				Ingredients
			</button>
			{showIngredients && <RecipeDetails ingredients={ingredients} />}

			{showRecipe ? (
				<p
					className='recipe-text'
					dangerouslySetInnerHTML={{ __html: `${content.summary}` }}></p>
			) : (
				<p
					className='recipe-text'
					dangerouslySetInnerHTML={{
						__html: `${content.summary.substr(0, 200)}&nbsp...`,
					}}></p>
			)}
			<button
				className='show-full-text'
				onClick={() => setShowRecipe(!showRecipe)}>
				{showRecipe ? 'show less' : 'show more'}
			</button>
		</div>
	);
};

export default Recipe;
