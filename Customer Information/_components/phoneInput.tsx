'use client';
import React from 'react';
import TextInput, { TextInputProps } from './textInput';

export default function PhoneInput({ value, ...props }: TextInputProps) {
  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <TextInput value={formatPhoneNumber(value?.toString() || '')} {...props} />
  );
}
