import { ComponentProps } from 'react';
interface ProductCaloriesProps extends ComponentProps<'p'> {
  baseCalories: string | undefined;
  maxCalories: string | undefined;
  caloriesSeparator: string;
}

export default function ProductCalories({
  baseCalories,
  maxCalories,
  caloriesSeparator = '-',
  ...props
}: ProductCaloriesProps) {
  return (
    <>
      {baseCalories && (
        <p {...props}>
          {baseCalories}
          {maxCalories ? `${caloriesSeparator}${maxCalories}` : ''} Cal
        </p>
      )}
    </>
  );
}
