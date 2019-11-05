import React, { useState } from 'react';
import { LandingContainer } from '../styles';

export default function Landing() {

    return (
        <LandingContainer>
            <h1>Weather.</h1>
            <p>Enter your zip to get a 5-day forecast for your area.</p>
            <form className="landing-form">
                <input type="text" name="zip"></input>
                <button>Submit</button>
            </form>
        </LandingContainer>
    )
}
