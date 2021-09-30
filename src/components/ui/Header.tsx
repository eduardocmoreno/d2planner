import styled from 'styled-components';
import logo from 'assets/images/d2-logo-header.png';

const StyledHeader = styled.header`
  margin: 2em 0 3em;
  text-align: center;
  img {
    display: inline-block;
  }
`;

const Title = styled.h1`
  margin: 0;
  text-transform: uppercase;
  font-size: 2rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <img src={logo} alt="Diablo 2 Paladin Planner" />
      <Title>Diablo II Planner</Title>
    </StyledHeader>
  )
}

export default Header;
