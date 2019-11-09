
export const setColorFromCurrentTemp = currentTemp => {
    if(currentTemp < 60 ) return '#6FB5E8';
    else if (currentTemp >= 60 && currentTemp < 80) return '#F78E69';
    else return '#931F1D';
}
