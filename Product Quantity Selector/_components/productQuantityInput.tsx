import React from 'react';
import Image from 'next/image';
import addIcon from '@/icons/add-icon.svg';
import removeIcon from '@/icons/remove-icon.svg';

interface QuantityProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const Quantity: React.FC<QuantityProps> = ({ quantity, onQuantityChange }) => {
  const handleAdd = () => {
    onQuantityChange(quantity + 1);
  };

  const handleRemove = () => {
    onQuantityChange(quantity - 1);
  };

  return (
    <div
      id='quantity-select'
      className='my-6 flex items-center justify-center md:order-2 md:my-0 md:mr-8'
    >
      <button id='removeButton' onClick={handleRemove}>
        <div className='min-h-7 min-w-7'>
          <Image
            id='removeIcon'
            src={removeIcon}
            alt='Remove'
            height={30}
            width={30}
            className='object-contain'
          />
        </div>
      </button>
      <p
        id='quantity-number'
        className='mx-6 flex font-sans text-2xl font-bold text-supporting-brown'
      >
        {quantity}
      </p>
      <button id='addButton' onClick={handleAdd}>
        <div className='min-h-7 min-w-7'>
          <Image
            id='addIcon'
            src={addIcon}
            alt='Add'
            height={30}
            width={30}
            className='object-contain'
          />
        </div>
      </button>
    </div>
  );
};

export default Quantity;
