import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DisplayGraph } from '../styles';

export default class DataDisplay extends PureComponent {


    render() {
        return(
            <div className="data-display">
                <Header />
                <DisplayTitle>
                    <h1>5-Day Temp for</h1>
                    <h1 className="location-title">Portland, OR</h1>
                </DisplayTitle>
                <DisplayGraph>
                    <p>Line graph here</p>
                </DisplayGraph>
            </div>
        )
    }
}
