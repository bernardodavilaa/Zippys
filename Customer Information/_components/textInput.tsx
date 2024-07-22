'use client';
import React, { ComponentProps } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

const input = tv({
  base: 'peer relative z-20 w-full items-center rounded-2xl border-2 bg-supporting-grey px-4 pb-3 pt-7 font-sans text-base text-supporting-darkBrown caret-supporting-darkBlue placeholder:text-supporting-brown focus:outline-none',
  variants: {
    hasError: {
      true: 'border-status-error focus:border-status-error',
      false: 'border-supporting-darkGrey focus:border-supporting-darkBlue',
    },
  },
  defaultVariants: {
    hasError: false,
  },
});

export type TextInputProps = ComponentProps<'input'> &
  VariantProps<typeof input> & {
    id: string;
    labelText: string;
    errorText?: string;
  };

export default function TextInput({
  id,
  labelText,
  hasError,
  errorText = '',
  className,
  ...props
}: TextInputProps) {
  return (
    <>
      <form className='relative'>
        <input
          id={id}
          className={input({ hasError, className })}
          type='text'
          placeholder=''
          {...props}
        />
        <label
          id={`${id}-label`}
          htmlFor={id}
          className='pointer-events-none absolute start-[18px] top-[22px] z-20 origin-[0] -translate-y-3 scale-75 text-supporting-brown duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75  rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
        >
          {labelText}*
        </label>
        {hasError && (
          <div id='name-error-label'>
            <label className='absolute ml-4 mt-0.5 flex font-sans text-s text-status-error transition-all duration-300'>
              {errorText}
            </label>
          </div>
        )}
      </form>
    </>
  );
}
