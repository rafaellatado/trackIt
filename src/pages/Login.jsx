import styled from "styled-components";
import {/*  useEffect, */ useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { ThreeDots } from 'react-loader-spinner';

const Login = ({/*  token, */ setToken, setImage }) => {

  const navigate = useNavigate();

  // Se existir token, o usuário é automaticamente direcionado para a página inicial ('/hoje')
/*   useEffect(() => {
    if (token) {
      return navigate('/hoje')
    }
  }, []) */

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const [isDisabled, setIsDisabled] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setLoginInfo(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
    setIsDisabled(true);

    axios.post(URL, loginInfo)

      .then((res) => {
        console.log(res.data);
        setToken(res.data.token);
        setImage(res.data.image);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('image', res.data.image);
        navigate('/hoje')
      })

      .catch((err) => {
        console.log(err.response.data);
        alert('Ocorreu um erro no login')
        clearForm();
        setIsDisabled(false);
      })
  }

  const clearForm = () => {
    setLoginInfo({
      email: '',
      password: ''
    })
  }

  // Testing out disabled inputs and button
/*   const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true); 

    setTimeout(() => {
      setIsDisabled(false);
    }, 5000)
  } */

  return(
    <OuterContainer>
      <StyledLogo>
        <img src="public/logo.png" alt="Logo" />
      </StyledLogo>

      <StyledForm onSubmit={handleSubmit}>
        <StyledInput 
          type='text' 
          placeholder='Email' 
          required
          name='email'
          value={loginInfo.email}
          onChange={handleInputs}
          disabled={isDisabled}
          $disabled={isDisabled}
        />
        <StyledInput 
          type='password' 
          placeholder='Senha' 
          required
          name='password'
          value={loginInfo.password}
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
            : <p>Entrar</p>
          }
        </StyledFormButton>
      </StyledForm>

      <RegisterButtonContainer>
        <StyledRegisterButton
          onClick={() => navigate('/cadastro')}
          disabled={isDisabled}
          $disabled={isDisabled}
        >
          Não tem uma conta? Cadastre-se!
        </StyledRegisterButton>
      </RegisterButtonContainer>
    </OuterContainer>
  )
}

export default Login;

Login.propTypes = {
  setToken: PropTypes.func.isRequired, 
  setImage: PropTypes.func.isRequired,
};

const OuterContainer = styled.div`
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
  border-radius: 5px;
  height: 40px;
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
  border-radius: 5px;
  height: 40px;
  cursor: ${props => props.disabled ? 'default' : 'pointer'};
`

const RegisterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const StyledRegisterButton = styled.button`
  all: unset;
  color: #52B6FF;
  border-bottom: solid 1px #52B6FF;
  cursor: ${props => props.disabled ? 'default' : 'pointer'}
`
