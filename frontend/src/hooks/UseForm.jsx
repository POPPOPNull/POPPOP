import { useState } from 'react';

/**
 * 폼 상태 및 변경 이벤트를 관리하는 커스텀 훅
 * @param {object} initialValues 초기 폼 값
 * @returns {object} 폼 상태, 핸들러 함수
 */
export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    resetForm,
  };
};