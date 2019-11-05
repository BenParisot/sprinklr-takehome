import React, { PureComponent } from 'react';
import Header from '../components/global/Header';

export default class DataDisplay extends PureComponent {


    render() {
        return(
            <div className="data-display">
                <Header />
                <section className="display-title">
                    <h1>5-Day Temp for</h1>
                    <h1 className="location-title">Portland, OR</h1>
                </section>
                <section className="display-graph">
                    <p>Line graph here</p>
                </section>
            </div>
        )
    }
}
