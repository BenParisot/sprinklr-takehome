import styled, { createGlobalStyle } from 'styled-components';
import Background from './assets/background.jpg';
import HeaderBackground from './assets/header-background.jpg';

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

export const StyledHeader = styled.header`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: url(${HeaderBackground});
    height: 7rem;
    padding-right: 2rem;
    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        font-family: 'Sarala', sans-serif;
        font-weight: bold;
    }
`;

export const DisplayTitle = styled.div`
    margin: 4rem 0 0 5rem;
    h1 {
        font-size: 3rem;
        color: #282828;
        text-transform: uppercase;
        font-family: 'Sarala', sans-serif;
        font-weight: bold;
    }
    .location-title {
        color: #018bb1;
    }
`;

export const DisplayGraph = styled.div`
    height: 400px;
    width: 800px;
    background-color: lightgrey;
    border-left: solid 8px black;
    border-bottom: solid 8px black;
    margin: 4rem 0 0 5rem;

`;

export const DataDetail = styled.div`
    display: flex;
    margin: 4rem 0 0 5rem;
    h2 {
        text-transform: uppercase;
        font-family: 'Sarala', sans-serif;
        font-weight: bold;
    }
`;

export const DataDescription = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    padding-right: 2rem;
    h2 {
        margin-bottom: 1rem;
    }
`;

export const DataModal = styled.div`
    padding: 1.5rem;
    background: lightgray;
    h2 {
        margin-bottom: 1rem;
    }

`;

export const DataInfo = styled.div`
    display: flex;
`;
