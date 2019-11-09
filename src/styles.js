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
    padding-top: 14%;
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
    align-items: center;
    justify-content: center;
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
        padding: 1rem 2rem;
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
    padding-right: 4rem;
    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
        font-family: 'Sarala', sans-serif;
        font-weight: bold;
    }
`;

export const DisplayHeader = styled.div`
    display: flex;
    flex-grow: 1 2;
    justify-content: space-between;
    align-items: flex-end;
`;

export const CurrentTemp = styled.div`
    border-left: 4px solid ${props => props.tempColor};
    padding-left: 3rem;
    margin: 0 5rem 0 0;
    p {
        text-transform: uppercase;
        font-family: sans-serif;
    }
    h1 {
        text-transform: uppercase;
        font-family: 'Sarala', sans-serif;
        font-weight: bold;
        font-size: 3rem;
        color: ${props => props.tempColor};
    }
`;

export const DisplayTitle = styled.div`
    margin: 4rem 0 0 5rem;
    color: #282828;
    text-transform: uppercase;
    font-family: 'Sarala', sans-serif;
    font-weight: bold;
    h1 {
        font-size: 3rem;   
    }
    h2 {
        font-size: 2.5rem;
    }
    .location-title {
        color: ${props => props.tempColor};
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

export const DataInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5.5rem;
    padding: 3rem;
    background: rgba(1, 139, 177, .2);
    text-align: center;
    p {
        font-family: 'Sarala', sans-serif;
        font-weight: bold;
        color: #282828;
        font-size: 1.4rem;
        margin-left: 1.4rem;
    }
`;

export const GraphDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-right: 2.5rem;
`;

export const Dolores = styled.h1`
    font-size: 3rem;
    color: #018bb1;
    text-transform: uppercase;
    font-family: 'Sarala', sans-serif;
    font-weight: bold;
    text-align: center;
    margin-top: 6rem;
`;

export const Hr = styled.hr`
    border: .2rem solid #CB8589;
    margin: 4rem 6rem;
`;
