import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import AddIcon from '@mui/icons-material/Add';
import styled from "styled-components";
import BottomMenu from "../components/BottomMenu";
import { useNavigate } from "react-router-dom";
import AdicionarHabito from "../components/Habitos/AdicionarHabito";
import PropTypes from 'prop-types';
import { useContext } from "react";
import NewHabitContext from "../contexts/NewHabitContext";
import { ThreeDots } from 'react-loader-spinner';

const Habitos = ({ token }) => {
  const [habits, setHabits] = useState(null);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const { newHabit } = useContext(NewHabitContext);

  const navigate = useNavigate();

  const weekdays = [
    { letter: 'D', id: 0 }, 
    { letter: 'S', id: 1 }, 
    { letter: 'T', id: 2 }, 
    { letter: 'Q', id: 3 }, 
    { letter: 'Q', id: 4 }, 
    { letter: 'S', id: 5 }, 
    { letter: 'S', id: 6 }  
  ];

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate])

  useEffect(() => {
    setIsDisabled(true)

    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios.get(URL, authHeader)
      .then(res => {
        console.log('Habitos: ', res.data);
        setHabits(res.data);
        setIsDisabled(false)
      })
      .catch(err => console.log(err.response.data), setIsDisabled(false))
      .finally(() => setIsLoading(false), setIsDisabled(false));
  }, [newHabit, token])

  return (
    <>
    <Header />  

    <OuterContainer> 

      <FirstSection>
        <h1>Meus hábitos</h1> 
        <AddIcon onClick={() => setShowAddHabit(true)} disabled={isDisabled} />
      </FirstSection>

      {showAddHabit && <AdicionarHabito setShowAddHabit={setShowAddHabit} />}

      <SecondSection>
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
          : (habits.length === 0 
            ? <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            : <HabitsUl>{habits.map(habit => 
                <HabitLi key={habit.id}>
                  {habit.name}
                  <WeeksDaysContainer>
                    {weekdays.map(day => 
                      <WeekDayButton 
                        key={day.id}
                        $daysSelected={habit.days}
                        $dayId={day.id}
                      >
                        {day.letter}
                      </WeekDayButton>
                    )}
                  </WeeksDaysContainer>
                </HabitLi>
                )}
              </HabitsUl>
                      
          )
        }

      </SecondSection>

    </OuterContainer>

    <BottomMenu />
    </>
  )
}

export default Habitos;

Habitos.propTypes = {
  token: PropTypes.string.isRequired, 
};

const OuterContainer = styled.div`
  margin: 90px 20px;
`

const FirstSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: #126BA5;
    font-weight: 400;
  }

  svg {
    cursor: pointer;
    background-color: #52B6FF;
    color: white;
    border-radius: 5px;
    font-size: 40px;
    padding: 5px;
  }
`

const SecondSection = styled.div`

`

const HabitsUl = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const HabitLi = styled.li`
  all: unset;
  background-color: #FFFFFF;
  border-radius: 5px;
  height: 90px;
  color: #666666;
  font-size: 18px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  gap: 5px;
`

const WeeksDaysContainer = styled.div`
  display: flex;
  gap: 5px;
`

const WeekDayButton = styled.button`
  all: unset;
  border: solid 1px #D4D4D4;
  height: 30px;
  width: 30px;
  font-size: 17px;
  text-align: center;
  border-radius: 5px;
  color: ${props => props.$daysSelected.includes(props.$dayId) ? '#FFFFFF' : '#bebebe'};
  background-color: ${props => props.$daysSelected.includes(props.$dayId) ? '#bebebe' : '#FFFFFF'};
`
