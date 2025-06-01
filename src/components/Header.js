import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ConferenceLogo from './ConferenceLogo';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    height: 60px;
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 30px;
  height: 80px;

  @media (max-width: 768px) {
    grid-template-columns: auto auto;
    gap: 10px;
    height: 60px;
    padding: 5px 15px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1;
  padding: 4px;
  border-radius: 4px;
  height: 70px;

  @media (max-width: 768px) {
    height: 50px;
    padding: 2px;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0;
  transition: all 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 2;
  border-radius: 4px;
  padding: 4px;
  height: 48px;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    background: white;
    height: auto;
    flex-direction: column;
    padding: 10px;
    transform: translateY(${props => props.isOpen ? '0' : '-100%'});
    opacity: ${props => props.isOpen ? '1' : '0'};
    visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #1a8f4c;
  font-weight: 700;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 1px;
  padding: 8px 16px;
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    height: 40px;
    width: 100%;
    justify-content: center;
    font-size: 14px;
    padding: 8px;
    margin: 2px 0;
    border-radius: 4px;

    &:hover {
      color: #FFD700;
      background-color: rgba(255, 215, 0, 0.1);
    }

    &:not(:last-child)::after {
      display: none;
    }
  }

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 24px;
    width: 1px;
    background-color: rgba(26, 143, 76, 0.2);
  }

  &:hover {
    color: #FFD700;
    background-color: rgba(255, 215, 0, 0.1);
  }

  &.active {
    color: #FFD700;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  grid-column: 3;
  align-items: center;
  border-radius: 4px;
  padding: 4px;
  height: 48px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileActionButtons = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 5px;
    padding: 5px 10px 10px;
  }
`;

const ButtonSeparator = styled.div`
  height: 24px;
  width: 1px;
  background-color: rgba(26, 143, 76, 0.3);
  margin: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled(Link)`
  padding: 8px 16px;
  background-color: transparent;
  color: #1a8f4c;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    height: 40px;
    width: 100%;
    border-radius: 4px;
    background-color: rgba(26, 143, 76, 0.1);
  }

  &:hover {
    color: #FFD700;
    background-color: rgba(255, 215, 0, 0.1);
  }
`;

const RegisterButton = styled(Link)`
  padding: 8px 16px;
  background-color: #1a8f4c;
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 4px;

  @media (max-width: 768px) {
    justify-content: center;
    height: 40px;
    width: 100%;
  }

  &:hover {
    background-color: #156e3a;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  grid-column: 3;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 24px;
    width: 30px;
  }

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: #1a8f4c;
    transition: all 0.3s ease;

    &:nth-child(1) {
      transform: ${props => props.isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${props => props.isOpen ? '0' : '1'};
    }

    &:nth-child(3) {
      transform: ${props => props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
    }
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <Nav>
        <LogoContainer>
          <Logo to="/">
            <ConferenceLogo 
              height="45px"
              mobileHeight="35px"
              showText={false}
            />
          </Logo>
        </LogoContainer>

        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/nomination">Nomination</NavLink>
          <NavLink to="/vote">Vote</NavLink>
          <NavLink to="/news">News</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <MobileActionButtons>
            <LoginButton to="/login">Login</LoginButton>
            <RegisterButton to="/tickets">Register Now</RegisterButton>
          </MobileActionButtons>
        </NavLinks>

        <ActionButtons>
          <LoginButton to="/login">Login</LoginButton>
          <ButtonSeparator />
          <RegisterButton to="/tickets">Register Now</RegisterButton>
        </ActionButtons>

        <MenuButton onClick={toggleMenu} isOpen={isMenuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </MenuButton>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;