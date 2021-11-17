
export function linesFormContents(_contents) {
    var lines = _contents
        .split('\n')
        .map(Z => Z.split('\r'))
        .map(Z => Z[0]);
    // console.log('lines:', lines)
    return lines;
}

/****************
FXs 
*****************/

// variables globals necessaries dins aquest js file
export let status = false;

// let resultA = Math.min(document.querySelector("#input_eso_result1").value * 1, document.querySelector("#input_eso_result2").value * 1)
// export let resultA = Math.min($("#input_eso_result1").val() * 1, $("#input_eso_result2").val() * 1)
// export let resultB = Math.max($("#input_eso_result1").val() * 1, $("#input_eso_result2").val() * 1)

export let resultA = () => { return Math.min($("#input_eso_result1").val() * 1, $("#input_eso_result2").val() * 1) }
export let resultB = () => { return Math.max($("#input_eso_result1").val() * 1, $("#input_eso_result2").val() * 1) }


export let lastReadLine = 0;
export let globalLines = [[1, null]];
export let lineCount = -1;

// esta pendent de si es comença a llegir l'ESO
export function activarUpdate() {
    setInterval(function () {
        if (status) {
            uptadeChartWithGlobal();
            status = false;
        }
    }, 1000)
}

// click al boto 
export function loadESO_and_updateChartStatus() {
    status = true;
    caller();
}

async function caller() {

    console.clear();
    var i = 0;
    while (i === 0) {
        let returned = await getJSON(); // command waits until completion
        i = returned[0];
        globalLines = globalLines.concat(returned[1])
    }
    lastReadLine = 0;
    lineCount = -1;
}

// inici de solucio
//https://pretagteam.com/question/web-fetch-api-waiting-the-fetch-to-complete-and-then-executed-the-next-instruction
async function getJSON() {
    return fetch($("#input_eso").val())
        .then((response) => response.text())
        .then((data) => {
            return fx(data)
        });
}

export function fx(data) {
    let lines = linesFormContents(data);
    let newLines = getNewLines(lines);
    return [((lines.at(-3) === 'End of Data') ? 1 : 0), newLines]
}

export function getNewLines(lines) {
    let lilen = lines.length;
    if (lastReadLine < lilen) {
        let newEsoLines = [];
        // si ha ha dades noves
        // agafa el valor de la key desitjada
        for (let i = lastReadLine; i < lilen; i++) {
            let iline = lines[i];
            let splittedLine = iline.split(',');
            let key = splittedLine[0] * 1;

            // let rA = Math.min($("#input_eso_result1").val() * 1, $("#input_eso_result2").val() * 1)
            // let rB = Math.max($("#input_eso_result1").val() * 1, $("#input_eso_result2").val() * 1)

            let rA = resultA();
            let rB = resultB();

            // if (key == resultA) {
            if (key == rA) {
                lineCount++;
                //primera fila de key és titol
                if (lineCount > 0) {

                    let valueA = Math.round(splittedLine[1] * 10) / 10
                    newEsoLines.push([lineCount, valueA]);
                }
            }
            // if (key == resultB) {
            if (key == rB) {
                if (lineCount > 0) {
                    try {
                        let valueB = Math.round(splittedLine[1] * 10) / 10
                        newEsoLines[newEsoLines.length - 1].push(valueB)
                    } catch (error) { }
                }
            }
        }

        //log NO ELIMINAR QUE VA BÉ
        // newEsoLines.forEach(Z => {
        //     console.log(Z[0] + " : ", Z[1] + " , " + Z[2])
        // }
        // );

        lastReadLine = lilen;
        return newEsoLines;
    }
}

export function uptadeChartWithGlobal() {

    let cnt = 0;

    // aquest es la manera de fer un loop cada x segons,
    // que para quan hi ha una condicio
    var refreshIntervalId =
        setInterval(function () {
            let max = globalLines.length
            let results = globalLines[cnt++]
            Plotly.extendTraces('myDiv', { y: [[results[1]], [results[2]]] }, [0, 1]);

            //ample limitat
            if (cnt > 100) {
                Plotly.relayout('myDiv', {
                    xaxis: {
                        range: [cnt - 100, cnt]
                    }
                });
            }
            if (cnt == max) {
                clearInterval(refreshIntervalId)
                status = false;
            };
        }, 1)
}

