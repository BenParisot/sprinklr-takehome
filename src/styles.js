import styled, { createGlobalStyle } from 'styled-components';
import Background from './assets/background.jpg';

createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Sarala:400,700&display=swap');
`

export const LandingContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16%;
    background-image: url(${Background});
    h1 {
        font-size: 8rem;
        color: white;
        font-family: 'Sarala';
    }
`;
