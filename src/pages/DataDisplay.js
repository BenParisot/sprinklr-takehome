import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DisplayGraph, DataDetail } from '../styles';
import { WiRaindrops, WiCloudy, WiStrongWind } from 'react-icons/wi';

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
                <DataDetail>
                    <div className="data-description">
                        <h2>Description</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="data-modal">
                        <h2>Weather Specifics</h2>
                        <section className="data-rain">
                            <WiRaindrops />
                            <p>Rain weather specifics rain rain rain rain.</p>
                        </section>
                        <section className="data-wind">
                            <WiStrongWind />
                            <p>Wind weather specifics rwind wind wind wind</p>
                        </section>
                        <section className="data-clouds">
                            <WiCloudy />
                            <p>Clouds weather specifics couds ouds louds clouds.</p>
                        </section>
                    </div>

                </DataDetail>
            </div>
        )
    }
}
