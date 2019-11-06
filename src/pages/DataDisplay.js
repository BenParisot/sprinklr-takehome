import React, { PureComponent } from 'react';
import Header from '../components/global/Header';
import { DisplayTitle, DisplayGraph, DataDetail, DataDescription, DataModal, DataInfo } from '../styles';
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
                    <DataDescription>
                        <h2>Description</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </DataDescription>
                    <DataModal>
                        <h2>Weather Specifics</h2>
                        <DataInfo>
                            <WiRaindrops size="100" />
                            <p>Rain weather specifics rain rain rain rain.</p>
                        </DataInfo>
                        <DataInfo>
                            <WiStrongWind size="100" />
                            <p>Wind weather specifics rwind wind wind wind</p>
                        </DataInfo>
                        <DataInfo>
                            <WiCloudy size="100" />
                            <p>Clouds weather specifics couds ouds louds clouds.</p>
                        </DataInfo>
                    </DataModal>

                </DataDetail>
            </div>
        )
    }
}
