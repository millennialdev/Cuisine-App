import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const RecipeDetails = ({ ingredients }) => {
	return ingredients.map((ingredient) => {
		return (
			<ul key={uuidv4()} className='ingredient-list'>
				<li className='ingredient-text'>{ingredient.name}</li>
				<li className='ingredient-weight'>
					Weight - {ingredient.amount} {ingredient.unit}
				</li>
			</ul>
		);
	});
};

export default RecipeDetails;
