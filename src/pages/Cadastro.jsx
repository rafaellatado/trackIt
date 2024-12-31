import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from 'react-loader-spinner';

const Cadastro = () => {

  const [userInfo, setUserInfo] = useState({
    email: '',
    name: '',
    image: '',
    password: ''
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({...prev, [name]: value}));   
  }

  const handleSubmit = (e) => { 
    e.preventDefault();
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
    setIsDisabled(true);

    axios.post(URL, userInfo)

      .then((res) => {
        console.log('Usuário cadastrado com sucesso: ', res.data);
        navigate('/');
      })

      .catch((err) => {
        console.log('Erro ao cadastrar o usuário: ', err.response.data)
        alert('Ocorreu um erro no cadastro')
        clearForm();
        setIsDisabled(false);
      })
  }

  const clearForm = () => {
    setUserInfo({
      email: '',
      name: '',
      image: '',
      password: ''
    });
  };

  // Testing out disabled inputs and button
/*     const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 5000)
  } */

  return(
    <StyledOuterContainer>
      <StyledLogo>
        <img src="public/logo.png" alt="Logo" />
      </StyledLogo>

      <StyledForm onSubmit={handleSubmit}>
        <StyledInput 
          type='email' 
          placeholder='Email'
          name='email'
          required
          value={userInfo.email}
          onChange={handleInputs}
          disabled={isDisabled}
          $disabled={isDisabled}
        />
        <StyledInput 
          type='password' 
          placeholder='Senha'
          name='password'
          required
          value={userInfo.password}
          onChange={handleInputs}
          disabled={isDisabled}
          $disabled={isDisabled}
        />
        <StyledInput 
          type='text' 
          placeholder='Nome'
          name='name'
          required
          value={userInfo.name}
          onChange={handleInputs}
          disabled={isDisabled}
          $disabled={isDisabled}
        />
        <StyledInput 
          type='text' 
          placeholder='Foto'
          name='image'
          required
          value={userInfo.image}
          onChange={handleInputs}
          disabled={isDisabled}
          $disabled={isDisabled}
        />

        <StyledFormButton 
          type='submit' 
          disabled={isDisabled}
          $disabled={isDisabled}
        >
          {isDisabled 
            ? <ThreeDots
              visible={true}
              height="45"
              width="45"
              color="#ffffff"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
            : <p>Cadastrar</p>
          }
        </StyledFormButton>
      </StyledForm>

      <LoginButtonContainer>
        <StyledLoginButton 
          onClick={() => navigate('/')}
          disabled={isDisabled}
          $disabled={isDisabled}
        >
          Já tem uma conta? Faça login!
        </StyledLoginButton>
      </LoginButtonContainer>
    </StyledOuterContainer>
  )
}

export default Cadastro;

const StyledOuterContainer = styled.div`
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledLogo = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;

  img {
    width: 180px;
    height: 180px;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const StyledInput = styled.input`
  all: unset;
  border: solid 1px black;
  height: 40px;
  border-radius: 5px;
  padding-left: 10px;
  cursor: ${props => props.disabled ? 'default' : 'text'};
`

const StyledFormButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #52B6FF;
  color: white;
  font-size: 20px;
  text-align: center;
  height: 40px;
  border-radius: 5px; 
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

const LoginButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledLoginButton = styled.button`
  all: unset;
  color: #52B6FF;
  border-bottom: solid 1px #52B6FF;
  text-align: center;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`
