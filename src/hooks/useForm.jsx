import { useState } from 'react';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [validities, setValidities] = useState({});

  const handleChange = (e) => {
    const { value, name, validity } = e.target;
    setValues((v) => ({ ...values, [name]: value }));
    setValidities((validities) => ({ ...validities, [name]: validity }));
  };

  return {
    values,
    setValues,
    validities,
    handleChange,
  };
}
