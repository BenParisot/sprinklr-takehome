import React, { useState } from 'react';
import { LandingContainer, LandingForm } from '../styles';

export default function Landing() {

    return (
        <LandingContainer>
            <h1>Weather.</h1>
            <p>Enter your zip to get a 5-day forecast for your area.</p>
            <LandingForm>
                <input type="text" name="zip" autoComplete="off"></input>
                <button>Submit</button>
            </LandingForm>
        </LandingContainer>
    )
}
