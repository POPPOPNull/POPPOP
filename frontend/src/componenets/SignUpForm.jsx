import "./signupform.css"
import React from 'react';
import { useForm } from '../hooks/UseForm'; 
import { useNavigate } from "react-router-dom";
import API from '../api/JwtAPI';

const initialUserValues = {
  id: '',
  password: '',
  confirmPassword: '',
  name: '',
  birthdate: '',
  email: '',
  phone: '',
};

function SignUpComponent() {

    const { values, handleChange, resetForm } = useForm(initialUserValues);
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (values.password !== values.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsSubmitting(true);

    try {
      
      const response = await API.post('/auth/user/join', values);
      
      console.log('사용자 회원가입 정보:', values);
      alert('사용자 회원가입이 성공적으로 완료되었습니다.');
      
      resetForm();

      navigate('/auth/login');

    } catch (err) {
      console.error('회원가입 오류:', err.message);
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

            return(
                <>
                <form className="signupform" onSubmit={handleSubmit}>
                    <h1>회원가입</h1>
                    <div className="id">
                        <input className="inputsignup"
                            type="text"
                            name="id"   
                            placeholder="아이디"
                            value={values.id} 
                            onChange={handleChange} 
                            required
                        />
                        <button className="idcheck">확인</button>
                    </div>
                    <br/>   
                    <input className="inputsignup"
                        type="password"
                        name="password"   
                        placeholder="비밀번호"
                        value={values.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <br/>
                    <input className="inputsignup"
                        type="password"
                        name="confirmPassword"   
                        placeholder="비밀번호확인"
                        value={values.confirmPassword} 
                        onChange={handleChange}
                        required
                    />
                    <br/>
                    <input className="inputsignup"
                        type="text"
                        name="name"   
                        placeholder="이름"
                        value={values.name} 
                        onChange={handleChange} 
                        required
                    />
                    <br/>
                    <input className="inputsignup"
                        type="date"
                        name="birthdate"   
                        placeholder="생년월일"
                        value={values.birthdate} 
                        onChange={handleChange} 
                    />
                    <br/>
                    <input className="inputsignup"
                        type="text"
                        name="email"   
                        placeholder="이메일"
                        value={values.email} 
                        onChange={handleChange} 
                        required
                    />
                    <br/>
                    <input className="inputsignup"
                        type="number"
                        name="phone"   
                        placeholder="전화번호"
                        value={values.phone} 
                        onChange={handleChange} 
                        required
                    />
                    <br/>
                    <button className="btnsignup" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? '가입 처리 중...' : '사용자 계정 생성'}
                    </button>
                </form>
                </>
            );
        }

export default SignUpComponent;