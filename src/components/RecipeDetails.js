import React from 'react';

const RecipeDetails = ({ ingredients }) => {
	return ingredients.map((ingredient) => {
		return (
			<ul key={ingredient.id} className='ingredient-list'>
				<li className='ingredient-text'>{ingredient.name}</li>
				<li className='ingredient-weight'>
					Weight - {ingredient.amount} {ingredient.unit}
				</li>
			</ul>
		);
	});
};

export default RecipeDetails;
