'use client';
import React, { useEffect } from 'react';
import ProductDetails from './_components/productDetails';
import QuantitySelector from './_components/productQuantitySelector';
import useProductDetails from './hooks/useProductDetails';

const productDetailsPageText = {
  customizeYourPlate: {
    title: 'CUSTOMIZE YOUR PLATE',
  },
  completeYourMeal: {
    title: 'COMPLETE YOUR MEAL',
  },
};

interface Params {
  params: {
    slug: string;
    chainproductid: string;
  };
}

export default function ProductDetailsPage({ params }: Params) {
  const { productDetails, image, fetchProductData, handleAddToCartClick } =
    useProductDetails(params.slug, params.chainproductid);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return (
    <div id='productDetailsPage' className='relative w-full bg-white'>
      <div className='absolute left-0 top-0 h-[218px] w-full bg-pattern-blue-waves bg-auto bg-[left_top_-28px] bg-repeat md:h-[95px]' />
      {productDetails && (
        <>
          <div className='h-auto w-full'>
            <div className='flex flex-col px-4 md:flex-row md:gap-10 md:px-8 lg:px-64'>
              <div className='mt-8 flex flex-1 md:mt-6'>
                <ProductDetails
                  title={productDetails.name}
                  description={productDetails.description}
                  image={image}
                />
              </div>
              <div className='mt-[93px] hidden w-px flex-none bg-supporting-darkGrey md:block' />
              <div className='mt-8 flex flex-1 md:mt-[93px]'>
                <h3 className='font-din text-2xl leading-none text-supporting-brown md:pt-4'>
                  {productDetailsPageText.customizeYourPlate.title}
                </h3>
              </div>
            </div>
            <div
              id='complete-meal'
              className='mt-10 h-44 w-full bg-supporting-grey'
            >
              <h3 className='pl-5 pt-4 font-din text-2xl leading-none text-supporting-brown md:pl-8 lg:pl-64'>
                {productDetailsPageText.completeYourMeal.title}
              </h3>
            </div>
          </div>
          <QuantitySelector
            productDetails={productDetails}
            handleClickButton={handleAddToCartClick}
          />
        </>
      )}
    </div>
  );
}
