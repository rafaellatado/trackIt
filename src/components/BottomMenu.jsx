import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomMenu = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const handleButton = (path) => {
    navigate(path);
  }

  return (
    <OuterContainer>

      <LeftSide 
        onClick={() => handleButton('/habitos')}
        $isActive={location.pathname === '/habitos'}
      >
        <CalendarMonthIcon />
        <h3>Hábitos</h3>
      </LeftSide>
      
      <RightSide 
        onClick={() => handleButton('/hoje')}
        $isActive={location.pathname === '/hoje'}
      >
        <EventAvailableIcon />
        <h3>Hoje</h3>
      </RightSide>
      
    </OuterContainer>
  )
}

export default BottomMenu;

const OuterContainer = styled.div`
 display: flex;
 width: 100%;
 height: 65px;
 position: fixed;
 bottom: 0;
 right: 0;
`

const LeftSide = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 50%;
  height: 100%;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? '#52B6FF' : '#FFFFFF')};
  color: ${(props) => (props.$isActive ? '#FFFFFF' : '#D4D4D4')};
`

const RightSide = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 50%;
  height: 100%;
  cursor: pointer;
  background-color: ${(props) => (props.$isActive ? '#52B6FF' : '#FFFFFF')};
  color: ${(props) => (props.$isActive ? '#FFFFFF' : '#D4D4D4')};
`
