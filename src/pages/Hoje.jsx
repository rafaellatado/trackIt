import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import { ThreeDots } from 'react-loader-spinner';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'; 
dayjs.locale('pt-br');

const Hoje = ({ token }) => {

  const today = dayjs();
  const formattedDate = today.format('dddd, DD/MM')
    .replace('-feira', '')
    .replace(/^\w/, (c) => c.toUpperCase());

  const navigate = useNavigate();

  const [todayHabits, setTodayHabits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { 
    if (!token) {
      navigate('/');
    }
  }, [token, navigate])

  useEffect(() => {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';

    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get(URL, authHeader)
      .then(res => {
        console.log('Hoje: ', res.data)
        setTodayHabits(res.data);
      })
      .catch(err => console.log(err.response.data))
      .finally(() => setIsLoading(false));
  }, [token])

  const handleCheck = (id) => {
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
  
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    axios.post(URL, {}, authHeader)
      .then(res => {
        console.log(res.data);
        // Update the specific habit in the state
        setTodayHabits(prevHabits => 
          prevHabits.map(habit => 
            habit.id === id 
              ? 
                { 
                  ...habit, 
                  done: true,  
                  currentSequence: habit.currentSequence + 1,
                  highestSequence: habit.currentSequence + 1 > habit.highestSequence 
                  ? habit.currentSequence + 1 
                  : habit.highestSequence
                } 
              : habit
          )
        );
      })
      .catch(err => console.log(err.response.data));
  };
  
  const handleUncheck = (id) => {
    const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
  
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  
    axios.post(URL, {}, authHeader)
      .then(res => {
        console.log(res.data);
        // Update the specific habit in the state
        setTodayHabits(prevHabits => 
          prevHabits.map(habit => 
            habit.id === id 
              ? 
                { 
                  ...habit, 
                  done: false,  
                  currentSequence: habit.currentSequence === 0
                    ? habit.currentSequence
                    : habit.currentSequence - 1,
                  highestSequence: habit.currentSequence === habit.highestSequence 
                  ? habit.currentSequence - 1 
                  : habit.highestSequence
                } 
              : habit
          )
        );
      })
      .catch(err => console.log(err.response.data));
  };
  

  return (
    <>
      <Header />

      <ContentContainer>
        <StyledDate>{formattedDate}</StyledDate>
        {isLoading 
          ? <ThreeDots
            visible={true}
            height="45"
            width="45"
            color="#bebebe"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
            /> 
          : (
            <>
              {todayHabits.length === 0 
                ? <p>Você não tem nenhum hábito agendado para hoje.</p> 
                : (
                  <StyledUl>
                    {todayHabits.map(habit => (
                      <StyledLi key={habit.id}>
                        <div>
                          <h2>{habit.name}</h2>
                          <p>Sequência atual de dias: {habit.currentSequence} dias</p>
                          <p>Seu recorde: {habit.highestSequence} dias</p>
                        </div>
                        {habit.done === false 
                          ? <StyledCheck1 
                              onClick={() => handleCheck(habit.id)}
                            >
                              <CheckIcon />
                            </StyledCheck1> 

                          : <StyledCheck2 
                              onClick={() => handleUncheck(habit.id)}
                            >
                              <CheckIcon />
                            </StyledCheck2>
                        }
                      </StyledLi>
                    ))}
                  </StyledUl>
                )}
            </>
          )}
      </ContentContainer>
      
      <BottomMenu />
    </>
  )
}

export default Hoje;


Hoje.propTypes = {
  token: PropTypes.string.isRequired, 
};

const ContentContainer = styled.div`
  margin: 90px 20px;
`

const StyledDate = styled.h1`
  color: #126BA5;
  font-weight: 400;
`

const StyledUl = styled.ul`
  margin-top: 20px;
`

const StyledLi = styled.li`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 20px;
  height: 90px;
  color: #666666;

  h2 {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 5px;
  }

  p {
    font-size: 14px;
  }
`

const StyledCheck1 = styled.button`
  all: unset;
  cursor: pointer;
  color: white;
  background-color: #e0e0e0;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  svg {
    font-size: 35px;
  }
`

const StyledCheck2 = styled.button`
  all: unset;
  cursor: pointer;
  color: white;
  background-color: #58d64c;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  svg {
    font-size: 35px;
  }
`
