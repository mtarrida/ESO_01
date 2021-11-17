/**
 * Set chart
 */

export function setChart () {


let trace1 = {
    type: 'scatter',
    // x: [1, 2, 3, 4],
    y: [null],
    mode: 'lines',
    name: 'Red',
    line: {
        color: 'rgba(219, 64, 82,0.7)',
        width: 5,
        opacity: 0.5
    }
};

let trace2 = {
    type: 'scatter',
    // x: [1, 2, 3, 4],
    y: [null],
    mode: 'lines',
    name: 'Blue',
    line: {
        color: 'rgba(55, 128, 191,0.7)',
        width: 5,
    }
};

var layout = {
    width: 700,
    height: 400
};

var data = [trace1, trace2];
Plotly.newPlot('myDiv', data, layout);

}
