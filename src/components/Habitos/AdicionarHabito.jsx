import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import UserInfoContext from "../../contexts/UserInfoContext";
import NewHabitContext from "../../contexts/NewHabitContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import { ThreeDots } from 'react-loader-spinner';

const AdicionarHabito = ({ setShowAddHabit }) => {

  const { token } = useContext(UserInfoContext);
  const { setNewHabit } = useContext(NewHabitContext);

  const weekdays = [
    { letter: 'D', id: 0 }, 
    { letter: 'S', id: 1 }, 
    { letter: 'T', id: 2 }, 
    { letter: 'Q', id: 3 }, 
    { letter: 'Q', id: 4 }, 
    { letter: 'S', id: 5 }, 
    { letter: 'S', id: 6 }  
  ];

  const [habitName, setHabitName] = useState('');
  const [daysSelected, setDaysSelected] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleDaysSelected = (dayId) => {
    if (!daysSelected.includes(dayId)) {
      setDaysSelected(prev => [...prev, dayId]);
    } else {
      setDaysSelected(prev => prev.filter(item => item !== dayId));
    }
  };

  const handleNewHabit = () => {
    setIsDisabled(true);

    if (!habitName || daysSelected.length === 0) {
      alert('Preencha o nome do hábito e selecione os dias!');
      setIsDisabled(false);
      return;
    }
  
    const newHabitData = {
      name: habitName,
      days: daysSelected.sort((a, b) => a - b),
    };
  
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    axios
      .post(URL, newHabitData, authHeader)
      .then((res) => {
        console.log(res.data);
        setNewHabit(newHabitData);
        clearForm(); 
        setShowAddHabit(false); 
      })
      .catch((err) => {
        console.error(err.response.data);
        setIsDisabled(false);
        alert('Ocorreu um erro ao criar o hábito');
      })
      .finally(() => setIsDisabled(false));
  };
  

  const clearForm = () => {
    setHabitName('');
    setDaysSelected([]);
  }

  // Testing out disabled inputs and buttons
/*   const handleNewHabit = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    setTimeout(() => {
      setIsDisabled(false);
    }, 5000)
  } */
  
  return (
    <OuterContainer>
      <ContentContainer>
        <form>
          <input 
            type='text' 
            placeholder='Nome do hábito' 
            disabled={isDisabled}
            value={habitName}
            onChange={e => setHabitName(e.target.value)}
          />
        </form>
        <WeeksDaysContainer>
          {weekdays.map(day => 
            <WeekDayButton 
              key={day.id}
              onClick={() => handleDaysSelected(day.id)}
              disabled={isDisabled}
              $daysSelected={daysSelected}
              $dayId={day.id}
            >
              {day.letter}
            </WeekDayButton>)}
        </WeeksDaysContainer>

        <CancelSaveContainer>
          <CancelButton onClick={() => setShowAddHabit(false)}>Cancelar</CancelButton>
          <SaveButton onClick={handleNewHabit}>
            {isDisabled 
              ? <ThreeDots
                visible={true}
                height="35"
                width="35"
                color="#ffffff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
              : <p>Salvar</p>
            }
          </SaveButton>
        </CancelSaveContainer>
        
      </ContentContainer>
    </OuterContainer>
  )
}

export default AdicionarHabito;

AdicionarHabito.propTypes = {
  setShowAddHabit: PropTypes.func.isRequired, 
};

const OuterContainer = styled.div`
  margin-top: 20px;
`

const ContentContainer = styled.div`
background-color: #FFFFFF;
border-radius: 5px;
padding: 20px;

  form {
    input {
      width: 100%;
      border: solid 1px #D4D4D4;
      padding-left: 10px;
      height: 45px;
      border-radius: 5px;
      color: #666666; 
      font-size: 18px;
    }

    input::placeholder {
      color: #666666; 
      font-size: 18px;
    }
  }
`

const WeeksDaysContainer = styled.div`
  display: flex;
  gap: 5px;
  margin: 10px 0;
`

const WeekDayButton = styled.button`
  all: unset;
  cursor: pointer;
  border: solid 1px #D4D4D4;
  height: 30px;
  width: 30px;
  font-size: 17px;
  text-align: center;
  border-radius: 5px;
  color: ${props => props.$daysSelected.includes(props.$dayId) ? '#FFFFFF' : '#bebebe'};
  background-color: ${props => props.$daysSelected.includes(props.$dayId) ? '#bebebe' : '#FFFFFF'};
`

const CancelSaveContainer = styled.div`
/*   width: fit-content;
  height: fit-content; */
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`

const CancelButton = styled.button`
  all: unset;
  cursor: pointer;
  color: #52B6FF;
  font-size: 16px;
`

const SaveButton = styled.button`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #52B6FF;
  color: white;
  font-size: 16px;
  height: 35px;
  width: 80px;
  text-align: center;
  border-radius: 5px;
`
