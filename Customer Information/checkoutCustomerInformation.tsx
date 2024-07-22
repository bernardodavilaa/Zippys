'use client';
import React, { useContext, useEffect } from 'react';
import { useAppSelector } from '@/app/_redux';
import PhoneInput from '@/shared/components/inputs/phoneInput';
import TextAreaInput from '@/shared/components/inputs/textAreaInput';
import TextInput from '@/shared/components/inputs/textInput';
import CheckoutContext from '@/shared/contexts/CheckoutContext';
import useCheckoutForm from '@/shared/hooks/validators/useCheckoutForm';
import { DeliveryMode } from '@/shared/types/enums/orderEnums';

interface Props {
  checkoutCustomerTextData: {
    customerTitle: string;
  };
}

const CheckoutCustomerInformation = ({ checkoutCustomerTextData }: Props) => {
  const { state, handleChangeCustomerInformation } =
    useContext(CheckoutContext);

  const {
    formValidator,
    checkoutConfig,
    hasError,
    validateName,
    validateLastName,
    validateEmail,
    validatePhone,
    validateAddress,
    removeValidation,
  } = useCheckoutForm();

  const { customerInformation } = checkoutConfig;
  const orderInfo = useAppSelector((state) => state.qsrkit.cart.orderInfo);
  const isPickup = orderInfo.orderType === DeliveryMode.Pickup;
  const currentLocation = useAppSelector(
    (state) => state.qsrkit.user.currentLocation
  );

  useEffect(() => {
    handleChangeCustomerInformation(
      customerInformation.address.propertyName,
      currentLocation.formattedAddress
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (propertyName: string, value: unknown) => {
    handleChangeCustomerInformation(propertyName, value);
    removeValidation(propertyName);
  };

  return (
    <div className='w-full'>
      <p
        id='checkoutCustomerTitle'
        className='mb-3 text-left font-din text-4xl text-supporting-darkBrown'
      >
        {checkoutCustomerTextData.customerTitle}
      </p>
      <div className='mb-6 grid w-full grid-cols-2 gap-7'>
        <TextInput
          id='firstNameCustomerForm'
          labelText={customerInformation.name.label}
          autoComplete='given-name'
          value={state.customerInformation?.name || ''}
          onChange={(event) =>
            handleChange(
              customerInformation.name.propertyName,
              event.target.value
            )
          }
          onBlur={() => validateName()}
          hasError={hasError(customerInformation.name.propertyName)}
          errorText={formValidator.name?.helperText}
        />
        {!isPickup && (
          <TextInput
            id='addressCustomerForm'
            labelText={customerInformation.address.label}
            value={state.customerInformation?.address || ''}
            onChange={(event) =>
              handleChange(
                customerInformation.address.propertyName,
                event.target.value
              )
            }
            onBlur={() => validateAddress()}
            hasError={hasError(customerInformation.address.propertyName)}
            errorText={formValidator.address?.helperText}
          />
        )}
        <TextInput
          id='lastNameCustomerForm'
          labelText={customerInformation.lastName.label}
          autoComplete='family-name'
          value={state.customerInformation?.lastName || ''}
          onChange={(event) =>
            handleChange(
              customerInformation.lastName.propertyName,
              event.target.value
            )
          }
          onBlur={() => validateLastName()}
          hasError={hasError(customerInformation.lastName.propertyName)}
          errorText={formValidator.lastName?.helperText}
        />
        {!isPickup && (
          <div className='row-span-3'>
            <TextAreaInput
              id='deliveryInstructionsCustomerForm'
              labelText={customerInformation.instruction.label}
              value={state.customerInformation?.instruction || ''}
              maxLength={128}
              onChange={(event) =>
                handleChange(
                  customerInformation.instruction.propertyName,
                  event.target.value
                )
              }
            />
          </div>
        )}
        <TextInput
          id='emailCustomerForm'
          labelText={customerInformation.email.label}
          autoComplete='email'
          value={state.customerInformation?.email || ''}
          onChange={(event) =>
            handleChange(
              customerInformation.email.propertyName,
              event.target.value
            )
          }
          onBlur={() => validateEmail()}
          hasError={hasError(customerInformation.email.propertyName)}
          errorText={formValidator.email?.helperText}
        />
        <PhoneInput
          id='phoneCustomerForm'
          labelText={customerInformation.phone.label}
          autoComplete='tel'
          value={state.customerInformation?.phone || ''}
          maxLength={12}
          onChange={(event) =>
            handleChange(
              customerInformation.phone.propertyName,
              event.target.value
            )
          }
          onBlur={() => validatePhone()}
          hasError={hasError(customerInformation.phone.propertyName)}
          errorText={formValidator.phone?.helperText}
        />
      </div>
      <p className='relative my-10 w-full border-t' />
    </div>
  );
};

export default CheckoutCustomerInformation;
