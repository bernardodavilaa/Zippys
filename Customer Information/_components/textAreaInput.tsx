'use client';
import React, { ComponentProps } from 'react';

export type TextInputProps = ComponentProps<'textarea'> & {
  id: string;
  labelText: string;
};

export default function TextAreaInput({
  id,
  labelText,
  value,
  maxLength,
  ...props
}: TextInputProps) {
  const getNumberOfCharactersRemaining = () =>
    (maxLength ?? 0) - (value?.toString().length ?? 0);

  return (
    <>
      <form className='relative mx-auto size-full'>
        <textarea
          id={id}
          value={value}
          maxLength={maxLength}
          className='peer relative z-20 size-full resize-none items-center rounded-2xl border-2 border-supporting-darkGrey bg-supporting-grey px-4 pt-7 font-sans text-base text-supporting-darkBrown caret-supporting-darkBlue placeholder:text-supporting-darkBrown focus:border-supporting-darkBlue focus:outline-none'
          placeholder=''
          {...props}
        />
        <label
          id={`${id}-label`}
          htmlFor={id}
          className='pointer-events-none absolute start-[18px] top-[22px] z-20 origin-[0] -translate-y-3 scale-75 text-supporting-brown duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75  rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4'
        >
          {labelText}
        </label>
      </form>
      {maxLength && (
        <div
          id={`${id}-textLimit`}
          className='relative px-5 pt-1 font-sans text-s text-supporting-brown'
        >
          {`${getNumberOfCharactersRemaining()} characters max`}
        </div>
      )}
    </>
  );
}
