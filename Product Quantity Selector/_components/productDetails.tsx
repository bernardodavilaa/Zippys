import React, { useState } from 'react';
import Image from 'next/image';
import noProductImage from '@/img/no-product-image.svg';
import CollapseText from '@/shared/components/collapsedText';
import useExternalImage from '@/shared/hooks/useExternalImage';

interface Props {
  title: string;
  description: string | null;
  image: IgniteOrderingAPIResponses.Schemas.Image | undefined;
}

export default function ProductDetails({ title, description, image }: Props) {
  const [hasImageError, setHasImageError] = useState(false);
  const { imageLoader, pathname } = useExternalImage(image?.url);
  return (
    <div id='productDetails' className='relative flex flex-col'>
      <Image
        id='productDetailsImage'
        loader={!hasImageError ? imageLoader : undefined}
        onError={() => {
          setHasImageError(true);
        }}
        src={!hasImageError ? pathname : noProductImage} // TODO: noProductImage is a temporary image. We are awaiting approval of the final image.
        alt={image?.description ?? ''}
        width={1000}
        height={644}
        className='rounded-2xl shadow-image'
      />
      <h2
        id='productDetailsTitle'
        className='pt-3 font-din text-[34px] font-medium leading-none text-primary-darkOrange'
      >
        {title}
      </h2>
      <div className='pt-2'>
        <div className='hidden md:block'>
          <p
            id='productDetailsDescription'
            className='text-base leading-[19px] text-supporting-darkBrown'
          >
            {description}
          </p>
        </div>
        <div className='block md:hidden'>
          <CollapseText
            id='productDetailsCollapsedDescription'
            className='text-base leading-[19px] text-supporting-darkBrown'
            lineHeight={19}
          >
            {description}
          </CollapseText>
        </div>
      </div>
    </div>
  );
}
