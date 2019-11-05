import styled, { createGlobalStyle } from 'styled-components';
import Background from './assets/background.jpg';

createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Sarala:400,700&display=swap');
`

export const LandingContainer = styled.div`
    height: 100vh;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 16%;
    background: url(${Background}) no-repeat center center fixed; 
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;;
    overflow: hidden;
    background-repeat: no-repeat;
    h1 {
        font-size: 8rem;
        color: white;
        font-family: 'Sarala', sans-serif;
    }
    p {
        font-size: 2rem;
        color: white;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
`;

export const LandingForm = styled.form`
    display: flex; 
    flex-direction: column;
    input {
        margin: 2rem;
        border: none;
        height: 3rem;
        width: 15rem;
        padding: .5rem 1rem;
        font-size: 1.3rem;
        color: grey;
    }
    button {
        border: none;
        width: 50%;
        align-self: center;
        padding: 1rem 0;
        color: white;
        background: coral;
        text-transform: uppercase;
        font-size: 1.25rem;
        font-family: 'Sarala', sans-serif;
        font-weight: bold;
    }
    button:hover {
        cursor: pointer;
    }
`;
