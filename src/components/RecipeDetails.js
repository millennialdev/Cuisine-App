import React from 'react';

const RecipeDetails = ({ recipe }) => {
	return (
		<ul className='ingredient-list'>
			<li className='ingredient-text'>
				<p dangerouslySetInnerHTML={{ __html: `${recipe}` }}></p>
			</li>
		</ul>
	);
};

export default RecipeDetails;
