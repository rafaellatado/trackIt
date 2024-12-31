import styled from "styled-components";
import { useContext } from "react";
import UserInfoContext from "../contexts/UserInfoContext";

const Header = () => {
  const { image } = useContext(UserInfoContext);

  return (
    <OuterContainer>
      <h1>TrackIt</h1>
      <div>
        <img 
          src={image}
          alt="Foto de Perfil" 
        />
      </div>
    </OuterContainer>
  )
}

export default Header;

const OuterContainer = styled.div`
  position: fixed;
  top: 0;
  background-color: #126BA5;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  h1 {
    font-family: "Playball", serif;
    color: white;
    font-weight: 400;
    font-size: 40px;
  }

  div {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`
