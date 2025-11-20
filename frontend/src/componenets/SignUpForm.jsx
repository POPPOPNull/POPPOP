import "./signupform.css"
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
  birthdate: '',
  gender: '',
  phone: '',
};

function SignUpComponent() {

  const { values, handleChange, resetForm } = useForm(initialUserValues);
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [idMessage, setIdMessage] = React.useState('');
  const [isIdAvailable, setIsIdAvailable] = React.useState(false);
  const [isIdChecked, setIsIdChecked] = React.useState(false);

  const navigate = useNavigate();

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



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isIdChecked || !isIdAvailable) {
      setError('아이디 중복 확인을 완료해주세요.');
      return;
    }

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

                    {error && <p className="error-text">{error}</p>}

                    <div className="id">
                        <input className="inputsignup"
                            type="text"
                            name="id"   
                            placeholder="아이디"
                            value={values.id} 
                            onChange={(e) => {
                              handleChange(e);
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
                          isIdAvailable ? 'id-message success' : 'id-message error'
                         }
                      >{idMessage}
                      </p>
                    )}
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
                    <div className="gender">
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="M"
                          checked={values.gender === "M"}
                          onChange={handleChange}
                          required
                        />
                        남자
                      </label>
                      
                      <label>
                        <input
                          type="radio"
                          name="gender"
                          value="F"
                          checked={values.gender === "F"}
                          onChange={handleChange}
                          required
                        />
                        여자
                      </label>
                    </div>
                    <br />
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
                        {isSubmitting ? '가입 처리 중..' : '회원가입'}
                    </button>
                </form>
                </>
            );
        }

export default SignUpComponent;