import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredients } from '../../services/slices/ingredientsSlices';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredients = useSelector(getIngredients);
  const ingredientData = ingredients.find((ing) => ing._id === params.id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
