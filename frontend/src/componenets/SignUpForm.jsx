import "./SignUpForm.css"
import React from 'react';
import { useForm } from '../hooks/UseForm'; 
import { useNavigate } from "react-router-dom";
import API from '../api/JwtAPI';
import checkIdAvailable from '../api/CheckIdAPI';

const initialUserValues = {
  id: '',
  password: '',
  confirmPassword: '',
  name: '',
  email: '',
  birth6: '',
  genderCode: '',
  birthdate: '',
  gender: '',
  phone: '',
};

function SignUpComponent() {

  const { values, handleChange, resetForm } = useForm(initialUserValues);

  const handleFieldChange = (e) => {
    handleChange(e);

    const { name } = e.target;
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const [submitError, setSubmitError] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [idMessage, setIdMessage] = React.useState('');
  const [isIdAvailable, setIsIdAvailable] = React.useState(false);
  const [isIdChecked, setIsIdChecked] = React.useState(false);

  const navigate = useNavigate();

  // 아이디 중복 확인
  const handleIdCheck = async (e) => {
    e.preventDefault();
    
    if (!values.id.trim()) {

      setIdMessage('아이디를 입력해주세요.');
      setIsIdAvailable(false);
      setIsIdChecked(false);
      return;
    }

    try {
      const data = await checkIdAvailable(values.id); 

      if (data.available) {

        setIdMessage('사용 가능한 아이디입니다.');
        setIsIdAvailable(true);
      } else {

        setIdMessage('이미 사용 중인 아이디입니다.');
        setIsIdAvailable(false);
      }

      setIsIdChecked(true);

    } catch (err) {

      console.error('아이디 중복 확인 오류:', err);

      setIdMessage('아이디 중복 확인 중 오류가 발생했습니다.');
      setIsIdAvailable(false);
      setIsIdChecked(false);
    }
  };


  // 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setErrors({});

    const newErrors = {};

    if (!isIdChecked || !isIdAvailable) {
      newErrors.id = '아이디 사용 가능 여부를 확인해주세요.';
    }

    const isPassword = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(!values.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (!isPassword.test(values.password)) {
      newErrors.password = '비밀번호는 영소문자 + 숫자 포함 8자 이상이어야 합니다.';
    }

    if (!values.confirmPassword.trim()) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
    } else if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    if (!values.email.trim()) {
    newErrors.email = '이메일을 입력해주세요.';
    } else {
      const isEmail = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

      if (!isEmail.test(values.email)) {
        newErrors.email = '올바른 이메일 형식이 아닙니다.';
      }
    }

    if (!values.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    const hasBirthOrGender =
      values.birth6.trim() !== '' || values.genderCode.trim() !== '';

    if (hasBirthOrGender) {

      if (!values.birth6.trim()) {
        newErrors.birth6 = '생년월일(YYMMDD)을 입력해주세요.';
      } else if (!/^\d{6}$/.test(values.birth6)) {
        newErrors.birth6 = '생년월일은 숫자 6자리(YYMMDD)여야 합니다.';
      }

      if (!values.genderCode.trim()) {
        newErrors.genderCode = '성별 코드를 입력해주세요.';
      } else if (!/^[1-4]$/.test(values.genderCode)) {
        newErrors.genderCode = '성별 코드는 1~4 중 하나여야 합니다.';
      }

      if (!newErrors.birth6 && !newErrors.genderCode) {

        const yy = values.birth6.substring(0, 2);
        const mm = values.birth6.substring(2, 4);
        const dd = values.birth6.substring(4, 6);
        const g = values.genderCode;

        let fullYear = null;
        if (g === '1' || g === '2') fullYear = `19${yy}`;
        else if (g === '3' || g === '4') fullYear = `20${yy}`;

        if (!fullYear) {
         newErrors.genderCode = '성별 코드가 올바르지 않습니다.';
        } else {

          const birthString = `${fullYear}-${mm}-${dd}`;
          const dateCheck = new Date(birthString);

          if (isNaN(dateCheck.getTime())) {
            newErrors.birth6 = '유효한 날짜가 아닙니다.';
          }
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      let payload = { ...values };

      if(values.birth6.trim() !== '' || values.genderCode.trim() !== '') {
        const yy = values.birth6.substring(0,2);
        const mm = values.birth6.substring(2,4);
        const dd = values.birth6.substring(4,6);
        const g = values.genderCode;

        let fullYear = '';
        if (g === '1' || g === '2') fullYear = `19${yy}`;
        else if (g === '3' || g === '4') fullYear = `20${yy}`;

        let gender = '';
        if (g === '1' || g === '3') gender = 'M';
        else if (g === '2' || g === '4') gender = 'F';

        payload.birthdate = `${fullYear}-${mm}-${dd}`;
        payload.gender = gender;
      } else {
        payload.birthdate=null;
        payload.gender=null;
      }

      delete payload.birth6;
      delete payload.genderCode;
      
      const response = await API.post('/auth/user/join', payload);
      
      console.log('사용자 회원가입 정보:', payload);
      alert('사용자 회원가입이 성공적으로 완료되었습니다.');
      
      resetForm();

      setIsIdChecked(false);
      setIsIdAvailable(false);
      setIdMessage('');

      navigate('/auth/login');

    } catch (err) {
      console.error('회원가입 오류:', err);
      setSubmitError(err.message ||'알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

            return(
                <>
                  <form className="signupform" onSubmit={handleSubmit} noValidate>

                    <div className="id">
                        <input className="inputsignup"
                            type="text"
                            name="id"   
                            placeholder="아이디"
                            value={values.id} 
                            onChange={(e) => {
                              handleFieldChange(e);
                              setIsIdChecked(false);
                              setIsIdAvailable(false);
                              setIdMessage('');
                            }} 
                            required
                        />
                        <button className="idcheck"
                          type="button"
                          onClick={handleIdCheck}
                          >확인
                        </button>
                    </div>
                    {idMessage && (
                      <p className={
                          isIdAvailable ? 'id-message success' : 'id-message error'}>
                            {idMessage}
                      </p>
                    )}
                    <div className="error-area">
                      {errors.id && <p className="field-error">{errors.id}</p>}
                    </div>

                    <br/>   
                    <input className="inputsignup"
                        type="password"
                        name="password"   
                        placeholder="비밀번호 (영소문자 + 숫자 포함 8자 이상)"
                        value={values.password} 
                        onChange={handleFieldChange} 
                        required 
                    />
                    <div className="error-area">
                      {errors.password && <p className="field-error">{errors.password}</p>}
                    </div>

                    <br/>
                    <input className="inputsignup"
                        type="password"
                        name="confirmPassword"   
                        placeholder="비밀번호확인"
                        value={values.confirmPassword} 
                        onChange={handleFieldChange}
                        required
                    />
                    <div className="error-area">
                      {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
                    </div>

                    <br/>
                    <input className="inputsignup"
                        type="text"
                        name="name"   
                        placeholder="이름"
                        value={values.name} 
                        onChange={handleFieldChange} 
                        required
                    />
                    <div className="error-area">
                      {errors.name && <p className="field-error">{errors.name}</p>}
                    </div>

                    <br/>
                    <div className="birth-gender">
                      <input
                        type="text"
                        name="birth6"
                        placeholder="생년월일(YYMMDD)"
                        maxLength={6}
                        value={values.birth6}
                        onChange={handleFieldChange}
                        required
                        className="inputsignup birth6-input"
                      />
                      <span className="dash">-</span>
                      <input
                        type="text"
                        name="genderCode"
                        placeholder="성별(숫자)"
                        maxLength={1}
                        value={values.genderCode}
                        onChange={handleFieldChange}
                        required
                        className="inputsignup small"
                      />
                    </div>

                    <div className="error-area">
                      {errors.birth6 && <p className="field-error">{errors.birth6}</p>}
                      {errors.genderCode && <p className="field-error">{errors.genderCode}</p>}
                    </div>

                    <br />
                    <input className="inputsignup"
                        type="text"
                        name="email"   
                        placeholder="이메일 (예:example@poppop.com)"
                        value={values.email} 
                        onChange={handleFieldChange} 
                        required
                    />
                    <div className="error-area">
                      {errors.email && <p className="field-error">{errors.email}</p>}
                    </div>

                    <br/>
                    <input className="inputsignup"
                        type="number"
                        name="phone"   
                        placeholder="전화번호"
                        value={values.phone} 
                        onChange={handleFieldChange} 
                        required
                    />
                    <br/>
                    <button className="btnsignup" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? '가입 처리 중..' : '회원가입'}
                    </button>
                  </form>
                </>
            );
        }

export default SignUpComponent;