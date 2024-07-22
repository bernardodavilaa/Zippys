import { ComponentProps } from 'react';

interface ProductPriceProps extends ComponentProps<'p'> {
  cost: number;
}

export default function ProductPrice({ cost, ...props }: ProductPriceProps) {
  const formattedCost = cost.toFixed(2);
  return (
    <>
      <p {...props}>{cost !== 0 ? `$${formattedCost}` : '$0.00'}</p>
    </>
  );
}
