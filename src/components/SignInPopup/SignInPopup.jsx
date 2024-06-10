import { useState, useRef, useEffect } from 'react';
import './SignInPopup.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { useForm } from '../../hooks/useForm';

const SignInPopup = ({
  onCloseModal,
  onUserSignin,
  onUserSignup,
  onChangeToSignUp,
  onChangeToSignIn,
  actionText,
  isSignUp = false,
  isMobile = false,
}) => {
  const inputCount = isSignUp ? 3 : 2;
  const { values, validities, handleChange } = useForm({});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const userNameInputRef = useRef(null);

  useEffect(() => {
    setSubmitDisabled(
      Object.keys(validities).length < inputCount ||
        Object.values(validities).some((validity) => {
          return !validity.valid;
        })
    );
  }, [validities, inputCount]);

  function handleSubmit(e) {
    e.preventDefault();
    !isSignUp ? onUserSignin(values) : onUserSignup(values);
  }

  function handleSignUp() {
    onChangeToSignUp();
  }

  function handleSignIn() {
    onChangeToSignIn();
  }

  return (
    <PopupWithForm
      title={!isSignUp ? 'Sign in' : 'Sign up'}
      name={!isSignUp ? 'signin' : 'signup'}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      buttonText={!isSignUp ? 'Sign in' : 'Sign up'}
      actionButtonText={actionText}
      buttonTextOnSubmit={!isSignUp ? 'Signing in...' : 'Signing up...'}
      onDoSomeAction={!isSignUp ? handleSignUp : handleSignIn}
      isSubmitDisabled={submitDisabled}
      isMobile={isMobile}
    >
      <label className='popup__label' htmlFor='user-email'>
        Email
      </label>
      <input
        type='email'
        name='email'
        id='user-email'
        className='popup__input'
        placeholder='Enter email'
        required
        value={values.email || ''}
        onChange={handleChange}
        ref={emailInputRef}
      />
      <span className='popup__line'></span>
      <span className='popup__error' id='user-email-error'>
        {!validities['email']?.valid &&
          emailInputRef.current &&
          'Invalid email address'}
      </span>
      <label className='popup__label' htmlFor='user-password'>
        Password
      </label>
      <input
        type='password'
        name='password'
        id='user-password'
        className='popup__input'
        placeholder='Enter password'
        required
        value={values.password || ''}
        onChange={handleChange}
        ref={passwordInputRef}
      />
      <span className='popup__line'></span>
      <span className='popup__error' id='user-password-error'>
        {validities['password'] &&
          !validities['password']?.valid &&
          passwordInputRef.current?.validationMessage}
      </span>
      {isSignUp && (
        <label className='popup__label' htmlFor='user-name'>
          Username
        </label>
      )}
      {isSignUp && (
        <input
          type='text'
          name='name'
          id='user-name'
          className='popup__input'
          placeholder='Enter your username'
          required
          value={values.name || ''}
          onChange={handleChange}
          ref={userNameInputRef}
        />
      )}
      {isSignUp && <span className='popup__line'></span>}
      {isSignUp && (
        <span className='popup__error' id='user-password-error'>
          {validities['name'] &&
            !validities['name']?.valid &&
            userNameInputRef.current?.validationMessage}
        </span>
      )}
    </PopupWithForm>
  );
};

export default SignInPopup;
