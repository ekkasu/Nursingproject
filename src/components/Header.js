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
    height: 70px;
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 40px;
  height: 90px;

  @media (max-width: 768px) {
    grid-template-columns: auto auto;
    gap: 10px;
    height: 70px;
    padding: 5px 15px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  grid-column: 1;
  padding: 4px;
  border-radius: 4px;
  height: 75px;

  @media (max-width: 768px) {
    height: 60px;
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
  height: 60px;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
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
    height: 30px;
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
  height: 60px;
  gap: 15px;

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
  height: 30px;
  width: 1px;
  background-color: rgba(26, 143, 76, 0.3);
  margin: 0 5px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled.a`
  padding: 10px 20px;
  background-color: transparent;
  color: #1a8f4c;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
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
  padding: 10px 20px;
  background-color: #1a8f4c;
  color: white;
  text-decoration: none;
  font-weight: 700;
  font-size: 16px;
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
    height: 36px;
    width: 40px;
    background-color: rgba(26, 143, 76, 0.1);
    border-radius: 6px;
    padding: 8px;
    margin-left: auto;
  }

  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: #1a8f4c;
    transition: all 0.3s ease;
    border-radius: 3px;

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

const DisabledNavLink = styled.span`
  color: #999;
  text-decoration: none;
  padding: 8px 16px;
  position: relative;
  cursor: not-allowed;
  opacity: 0.6;
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover::after {
    content: 'Coming soon';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 10;
  }
`;

const DisabledActionButton = styled.span`
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  background-color: ${props => props.primary ? '#1a8f4c' : 'transparent'};
  color: ${props => props.primary ? 'white' : '#1a8f4c'};
  border: 1px solid ${props => props.primary ? 'transparent' : '#1a8f4c'};
  opacity: 0.6;
  cursor: not-allowed;
  position: relative;
  font-size: 16px;

  &:hover::after {
    content: 'Coming soon';
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 10;
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
              height="55px"
              mobileHeight="50px"
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
            <LoginButton href="https://portal.mohannualcon.com/" target="_blank">Login</LoginButton>
            <RegisterButton to="/registration">Register Now</RegisterButton>
          </MobileActionButtons>
        </NavLinks>

        <ActionButtons>
          <LoginButton href="https://portal.mohannualcon.com/" target="_blank">Login</LoginButton>
          <ButtonSeparator />
          <RegisterButton to="/registration">Register Now</RegisterButton>
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