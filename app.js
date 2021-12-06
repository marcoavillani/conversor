// $.getJSON("moneda2.json", function (res, estado) {
//   if (estado === "success") {
//     let misDatos = res;
//     for (const dato of misDatos) {
//       $("#primerSelect").append(`
//                                   <option selected value="${dato.baseid}">
//                                     <h1>${dato.basecode}</h1>
//                                   </option>
//       `);
//       $("#segundoSelect").append(`
//                                   <option selected value="${dato.baseid}">
//                                     <h1>${dato.basecode}</h1>
//                                   </option>
//       `);
//     }
//   }
// });
let botonElegido = 0;
let conversionElegida = "divisas";

$("#btn1").on("click", function (e) {
  e.preventDefault();
  botonElegido = 1;
  conversionElegida = "divisas";
  console.log(conversionElegida);
});

$("#btn2").on("click", function (e) {
  e.preventDefault();
  botonElegido = 2;
  conversionElegida = "longitud";
  console.log(conversionElegida);
});

const texto = $("#texto");

console.log(`./${conversionElegida}.json`);

$.getJSON(`./${conversionElegida}.json`, function (res, estado) {
  if (estado === "success") {
    let misDatos = res;
    for (const dato of misDatos) {
      $("#primerSelect").append(`
                                  <option value="${dato.id}">
                                    <h1>${dato.code}</h1>
                                  </option>
      `);
      $("#segundoSelect").append(`
                                  <option value="${dato.id}">
                                    <h1>${dato.code}</h1>
                                  </option>
      `);
    }
  }
});

$("#primerSelect").on("change DOMContentLoaded", convertir);

// $("#segundoSelect").on("change", function () {
//   const car2 = $("#segundoSelect").find(":selected").val();
//   // console.log(car2);
// });

$("#segundoSelect").on("change DOMContentLoaded", convertir);

// $("#myForm").on("change textInput input", (e) => {
//   let valIngresado = e.target.value;
//   const nuevoValor = valIngresado * 10;
//   $("#textoConvertido")[0].value = nuevoValor;
// });

$("#myForm").on("change textInput input DOMContentLoaded", convertir);

// function convertir() {
//   let de = document.querySelector("#primerSelect").value;
//   let valorDe = document.querySelector("#valorDe").value;
//   let a = document.querySelector("#segundoSelect").value;
//   fetch("./moneda2.json")
//     .then((response) => response.json())
//     .then((data) => {
//       let rates = data[de - 1].rates;
//       let convertido = valorDe * rates.USD;
//       document.querySelector("#textoConvertido").value = convertido;
//     });
// }

function convertir() {
  let de = document.querySelector("#primerSelect").value;
  let valorDe = document.querySelector("#valorDe").value;
  let a = document.querySelector("#segundoSelect").value;
  fetch(`./${conversionElegida}.json`)
    .then((response) => response.json())
    .then((data) => {
      let rateBase = data[de - 1].rate;
      let rateDestino = data[a - 1].rate;
      let convertido = (valorDe * rateDestino) / rateBase;
      document.querySelector("#textoConvertido").value = convertido.toFixed(3);

      $(".hola").remove();
      texto.append(
        `<h2 class="hola">
        De ${valorDe} ${data[de - 1].code} a ${data[a - 1].code}
        </h2>`
      );
    })
    .catch((error) =>
      console.log(`Hubo un problema en la petición Fetch: ${error.message}`)
    );
}
