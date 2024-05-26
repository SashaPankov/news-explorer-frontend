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
  user,
  isSignUp = false,
  isMobile = false,
}) => {
  const inputCount = isSignUp ? 3 : 2;
  const { values, setValues, validities, handleChange } = useForm({});
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
  }, [validities]);

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

  const getErrorClassName = () => {
    return !isMobile ? 'popup__error' : 'popup__error popup__error_mobile';
  };

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
      <label className='popup__label'>
        Email
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
        <span className={getErrorClassName()} id='user-email-error'>
          {!validities['email']?.valid &&
            emailInputRef.current?.validationMessage}
        </span>
      </label>
      <label className='popup__label'>
        Password
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
        <span className={getErrorClassName()} id='user-password-error'>
          {validities['password'] &&
            !validities['password']?.valid &&
            passwordInputRef.current?.validationMessage}
        </span>
      </label>
      {isSignUp && (
        <label className='popup__label'>
          Username
          <input
            type='text'
            name='userName'
            id='user-name'
            className='popup__input'
            placeholder='Enter your username'
            required
            value={values.userName || ''}
            onChange={handleChange}
            ref={userNameInputRef}
          />
          <span className={getErrorClassName()} id='user-password-error'>
            {validities['userName'] &&
              !validities['userName']?.valid &&
              userNameInputRef.current?.validationMessage}
          </span>
        </label>
      )}
    </PopupWithForm>
  );
};

export default SignInPopup;