import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #1a8f4c;
  }
`;

const TopBar = styled.div`
  background: #1a8f4c;
  padding: 8px 0;
  color: white;
`;

const TopBarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;

  a {
    color: white;
    text-decoration: none;
    font-size: 14px;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Header = () => {
  return (
    <>
      <TopBar>
        <TopBarContent>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </SocialLinks>
        </TopBarContent>
      </TopBar>
      <HeaderContainer>
        <Nav>
          <Logo to="/">Neutek Nursing</Logo>
          <NavLinks>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/registration">Registration</NavLink>
            <NavLink to="/nomination">Nomination</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </NavLinks>
        </Nav>
      </HeaderContainer>
    </>
  );
};

export default Header;