import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import NurseLoginIllustration from '../components/NurseLoginIllustration';
import LoadingSpinner from '../components/LoadingSpinner';
import ConferenceLogo from '../components/ConferenceLogo';
import loginBg from '../assets/images/LOGIN/loginimage.png';

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  background: #fff;
  overflow: hidden;
`;

const LoginSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  min-width: 50%;
  overflow-y: auto;
  background: #1a8f4c;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const ScrollContainer = styled.div`
  max-height: 100vh;
  padding: 20px 0;
`;

const IllustrationSection = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 50%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url(${loginBg});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Cloud = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  width: 100px;
  height: 40px;
  z-index: 2;

  &:nth-child(1) { top: 10%; left: 10%; }
  &:nth-child(2) { top: 30%; right: 15%; }
  &:nth-child(3) { bottom: 20%; left: 20%; }
  &:nth-child(4) { bottom: 40%; right: 25%; }
`;

const StyledNurseIllustration = styled(NurseLoginIllustration)`
  position: relative;
  z-index: 2;
  width: 80%;
  height: auto;
`;

const Title = styled.div`
  margin-bottom: 40px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: #ffffff;
    margin-bottom: 8px;
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.1rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);
  color: white;

  &:focus {
    outline: none;
    border-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const RememberMeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -8px;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;

  input {
    width: 16px;
    height: 16px;
    accent-color: #ffffff;
  }
`;

const ForgotPassword = styled.a`
  color: #ffffff;
  text-decoration: none;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background: #ffffff;
  color: #1a8f4c;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.5);
    color: rgba(26, 143, 76, 0.5);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SignUpPrompt = styled.p`
  text-align: center;
  margin-top: 24px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.span`
  color: #FFD700;
  font-size: 0.875rem;
  margin-top: -16px;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;

  svg {
    fill: #ffffff;
  }
`;

const LogoLink = styled(Link)`
  display: inline-block;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/');
    } catch (error) {
      setErrors({ submit: 'Failed to login. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (isPageLoading) {
    return <LoadingSpinner text="Loading NMCON Portal..." fullScreen />;
  }

  if (isLoading) {
    return <LoadingSpinner text="Signing you in..." fullScreen />;
  }

  return (
    <LoginContainer>
      <LoginSection>
        <ScrollContainer>
          <LogoContainer>
            <LogoLink to="/">
              <ConferenceLogo 
                height="50px" 
                mobileHeight="40px" 
                showText={false}
                isWhite={true}
              />
            </LogoLink>
          </LogoContainer>
          
          <Title>
            <h1>Welcome to NMCON<br />Nurse Portal</h1>
            <p>Please sign in to access your account</p>
          </Title>

          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}

            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}

            <RememberMeRow>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </CheckboxContainer>
              <ForgotPassword href="/forgot-password">
                Forgot Password?
              </ForgotPassword>
            </RememberMeRow>

            <Button type="submit">
              Sign In
            </Button>
            
            {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
          </Form>

          <SignUpPrompt>
            Don't have an account?
            <Link to="/registration">Sign up</Link>
          </SignUpPrompt>
        </ScrollContainer>
      </LoginSection>

      <IllustrationSection>
        <Cloud />
        <Cloud />
        <Cloud />
        <Cloud />
        <StyledNurseIllustration />
      </IllustrationSection>
    </LoginContainer>
  );
};

export default Login; 