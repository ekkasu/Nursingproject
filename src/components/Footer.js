import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterWrapper = styled.footer`
  background: #1a8f4c;
  color: #ffffff;
  padding: 60px 0 20px;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #FFD700;
    font-size: 20px;
    margin-bottom: 20px;
    font-weight: 600;
    font-family: 'Playfair Display', serif;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 12px;
  }

  a {
    color: #ffffff;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      color: #FFD700;
      padding-left: 5px;
    }
  }
`;

const ContactInfo = styled.div`
  p {
    margin-bottom: 15px;
    font-size: 14px;
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  a {
    color: #ffffff;
    font-size: 20px;
    transition: all 0.3s ease;

    &:hover {
      color: #FFD700;
      transform: translateY(-3px);
    }
  }
`;

const BottomBar = styled.div`
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>About Us</h3>
            <FooterList>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/news">News & Updates</Link></li>
              <li><Link to="/media-gallery">Media Gallery</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <h3>Resources</h3>
            <FooterList>
              <li><Link to="/clinical-practice">Clinical Practice</Link></li>
              <li><Link to="/education">Education</Link></li>
              <li><Link to="/research">Research</Link></li>
              <li><Link to="/technology">Technology</Link></li>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <h3>Community</h3>
            <FooterList>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/vote">Vote</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Conference Terms & Conditions</Link></li>
            </FooterList>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <p>Nursing Excellence Hub</p>
              <p>Email: contact@nursingexcellence.org</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: 123 Healthcare Ave, Medical District</p>
              <SocialLinks>
                <a href="https://facebook.com/nursingexcellence" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://twitter.com/nursingexcel" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com/nursingexcellence" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://linkedin.com/company/nursing-excellence" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
              </SocialLinks>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <BottomBar>
          <p>&copy; {new Date().getFullYear()} Nursing Excellence Hub. All rights reserved.</p>
        </BottomBar>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer; 