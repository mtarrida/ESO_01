import { loadESO_and_updateChartStatus, activarUpdate } from "./eso_fxs.js";
import { setChart } from "./eso_setChart.js";

//funciona la primera de les rutes
// font
// https://www.youtube.com/watch?v=IOcsKIARacs
// https://www.npmjs.com/package/http-server?activeTab=readme
// need instal node.js
// a l'explorer de la carpeta ,
// barra direccopns CMD
// npm install http-server -g (enter)
// http-server --cors -c1 (enter)
// on --cors fa que es pugui accedir a l'arxiu
// on -c2 fa que el servidor reinicii cada 2 segons

// click event via jQuery
//he hagut de posar script jQuery al html...
$("#esoLoad").click(loadESO_and_updateChartStatus);

//posar localStorage



// $("#input_eso_result1").val(localStorage['input_eso_result1']);

// $("#input_eso_result1").change(() => {
//     localStorage['input_eso_result1'] = $("#input_eso_result1").val();
//     // console.log('localStorage:', localStorage['input_eso_result1'])
// });
// $("#input_eso_result2").change(localStorage['input_eso_result2'] = $("#input_eso_result2").val());
// $("#input_eso").change(localStorage['input_eso'] = $("#input_eso").val());

export function localStorage_manageById(str) {
    $("#" + str).val(localStorage[str]);

    $("#" + str).change(() => {
        localStorage[str] = $("#" + str).val();
        // console.log('localStorage:', localStorage[str])
    });
}

let elementsStoreLocal = [
    'input_eso_result1',
    'input_eso_result2',
    "input_eso"
];

elementsStoreLocal.forEach(Z => localStorage_manageById(Z))



// init fxs
setChart();
activarUpdate();