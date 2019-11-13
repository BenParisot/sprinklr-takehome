import React, { PureComponent } from 'react';
import { LandingContainer, LandingForm, Button } from '../styles';
import { Link } from 'react-router-dom';

export default class Landing extends PureComponent {
    state = {
        zip: ''
    }

    handleChange = (e) => {
        this.setState({ zip: e.target.value });
    }

    render() {
        const { zip } = this.state;
        const linkUrl = `/${zip}`;
        return (
            <LandingContainer>
                <h1>Weather.</h1>
                <p>Enter your zip to get a 12-hour forecast for your area.</p>
                <LandingForm>
                    <input type="text" name="zip" autoComplete="off" onChange={this.handleChange}></input>
                    <Link to={linkUrl}><Button>Submit</Button></Link>
                </LandingForm>
            </LandingContainer>
        )
    };

}
