import React, { useCallback, useState } from 'react';
import ProductCalories from './productCalories';
import ProductPrice from './productPrice';
import Quantity from './productQuantityInput';

interface QuantitySelectorProps {
  productDetails: IgniteOrderingAPIResponses.Schemas.Product;
  handleClickButton: (quantity: number) => void;
}

const productQuantitySelectorTexts = {
  buttonText: {
    addToCart: 'ADD TO CART',
  },
};

export default function QuantitySelector({
  productDetails,
  handleClickButton,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const [cost, setCost] = useState<number>(productDetails.cost);

  const handleQuantityChange = useCallback(
    (newQuantity: number) => {
      if (newQuantity < 1) {
        setQuantity(1);
      } else {
        setQuantity(newQuantity);
        setCost(productDetails.cost * newQuantity);
      }
    },
    [productDetails]
  );

  const handleClick = () => {
    handleClickButton(quantity);
  };

  return (
    <>
      <div id='quantity-selector-mobile' className='md:hidden'>
        <Quantity quantity={quantity} onQuantityChange={handleQuantityChange} />
      </div>
      <div
        id='quantity-selector-sticky'
        className='sticky bottom-0 z-40 h-auto w-full bg-white md:h-auto md:pt-0'
      >
        <div
          id='quantity-selector-container'
          className='order-1 flex h-[82px] w-full justify-between bg-white px-6 opacity-90 shadow-top md:order-2 md:flex-row md:border-none md:px-8 md:shadow-none lg:px-64'
        >
          <div
            id='price-calories'
            className='order-2 flex flex-col py-2 md:order-1 md:px-0'
          >
            <ProductPrice
              cost={cost}
              id='product-cost'
              className='font-din text-2xl text-primary-darkOrange'
            />
            <ProductCalories
              baseCalories={productDetails.baseCalories}
              maxCalories={productDetails.maxCalories}
              caloriesSeparator='-'
              id={`product-calories-${productDetails.chainProductId}`}
              className='mt-1 flex font-din text-2xl font-light leading-6 tracking-tighter text-supporting-brown'
            />
          </div>
          <div
            id='button-quantity-container'
            className='order-2 flex w-auto md:order-1'
          >
            <div
              id='quantity-selector-desktop'
              className='hidden items-center justify-center md:block md:pt-6'
            >
              <Quantity
                quantity={quantity}
                onQuantityChange={handleQuantityChange}
              />
            </div>
            <button
              id='add-to-cart'
              onClick={handleClick}
              className='my-4 mt-auto h-[50px] w-[193px] bg-supporting-darkerBlue px-10 font-din text-2xl text-white'
            >
              {productQuantitySelectorTexts.buttonText.addToCart}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
