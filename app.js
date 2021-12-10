// -----------------SIDEBAR-----------------------------------------------
let btn = document.querySelector("#btn-menu");
let sidebar = document.querySelector(".sidebar");

btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});
// -----------------------------------------------------------------------

// ------------------ASIGNACIÓN DE VARIABLES------------------------------

let conversionElegida = "divisas";

let primerSelect = document.querySelector("#primerSelect");
let $primerSelect = $("#primerSelect");

let segundoSelect = document.querySelector("#segundoSelect");
let $segundoSelect = $("#segundoSelect");

// -----------------------------------------------------------------------

// -----------------ARMADO DE OPCIONES DEL SELECT ------------------------

// fetch(`./${conversionElegida}.json`)
//   .then((res) => res.json())
//   .then((data) => {
//     let misDatos = data;
//     let contador = 0;
//     for (const dato of misDatos) {
//       primerSelect.innerHTML(`
//                                   <option id="optionPrimerSelect${contador}" value="${contador}">
//                                     <h1>${dato.code}</h1>  ||  <p>${dato.currency}</p>
//                                   </option>
//       `);
//       segundoSelect.innerHTML(`
//                                   <option id="optionSegundoSelect${contador}" value="${contador}">
//                                     <h1>${dato.code}</h1>  ||  <p>${dato.currency}</p>
//                                   </option>
//       `);
//       contador++;
//     }
//   });

$("#sidebarLongitud").click((e) => {
  e.preventDefault();
  conversionElegida = "longitud";
  $(".opciones").remove();
  longitudPeso();
});

$("#sidebarDivisa").click((e) => {
  e.preventDefault();
  conversionElegida = "divisas";
  $(".opciones").remove();
  divisas();
});

$("#sidebarPeso").click((e) => {
  e.preventDefault();
  conversionElegida = "peso";
  $(".opciones").remove();
  longitudPeso();
});

function longitudPeso() {
  $.getJSON(`./${conversionElegida}.json`, function (res, estado) {
    if (estado === "success") {
      let misDatos = res;
      let contador = 0;
      for (const dato of misDatos) {
        $primerSelect.append(`
                                    <option class="opciones" id="optionPrimerSelect${contador}" value="${contador}">
                                      <h1>${dato.code}</h1>
                                    </option>
        `);
        $segundoSelect.append(`
                                    <option class="opciones" id="optionSegundoSelect${contador}" value="${contador}">
                                      <h1>${dato.code}</h1>
                                    </option>
        `);
        contador++;
      }
    }
  });
}

function divisas() {
  $.getJSON(`./divisas.json`, function (res, estado) {
    if (estado === "success") {
      let misDatos = res;
      let contador = 0;
      for (const dato of misDatos) {
        $primerSelect.append(`
                                    <option class="opciones" id="optionPrimerSelect${contador}" value="${contador}">
                                      <h1>${dato.code}</h1>  ||  <p>${dato.currency}</p>
                                    </option>
        `);
        $segundoSelect.append(`
                                    <option class="opciones" id="optionSegundoSelect${contador}" value="${contador}">
                                      <h1>${dato.code}</h1>  ||  <p>${dato.currency}</p>
                                    </option>
        `);
        contador++;
      }
    }
  });
}

// ------------------------------------------------------------------------------------------------

// -------------------BOTÓN DE INVERTIR------------------------------------------------------------

// $("#btnInvertir").click((e) => {
//   e.preventDefault();
//   let aux = $primerSelect.val();
//   $primerSelect.val() = $segundoSelect.val();
//   $segundoSelect.val() = aux;
// });

document.querySelector("#btnInvertir").addEventListener("click", (e) => {
  e.preventDefault();
  let aux = primerSelect.value;
  primerSelect.value = segundoSelect.value;
  segundoSelect.value = aux;
  convertir(e);
  almacenarSelect1();
  almacenarSelect2();
});
// -------------------------------------------------------------------------------------------------
// -----REALIZAR LA FUNCIÓN EN CUANTO SE CAMBIA EL SELECT-------------------------------------------
$primerSelect.on("change DOMContentLoaded", (e) => {
  convertir(e);
  almacenarSelect1();
});

// primerSelect.addEventListener("DOMContentLoaded", () => {
//   convertir;
// });

// $primerSelect.on("change DOMContentLoaded", () => {
//   console.log("cargado");
//   convertir;
// });

// NO FUNCIONA JS
// segundoSelect.addEventListener("change DOMContentLoaded", convertir);
$segundoSelect.on("change DOMContentLoaded", (e) => {
  convertir(e);
  almacenarSelect2();
});
// --------------------------------------------------------------------------------------------------

// -----CONVERTIR EN CUANTO SE ESCRIBA EN EL INPUT---------------------------------------------------

// /* document
//   .querySelector("#valorDe")
//   .addEventListener("change textinput input DOMContentLoaded", convertir); */      NO FUNCIONA JS

$("#valorDe").on("textinput input DOMContentLoaded", convertir);
// ---------------------------------------------------------------------------------------------------

// --------------FUNCIÓN CONVERTIR--------------------------------------------------------------------

function convertir() {
  let valorDe = document.querySelector("#valorDe").value;
  let de = primerSelect.value;
  let a = segundoSelect.value;
  if (isNaN(de) == false && isNaN(a) == false) {
    fetch(`./${conversionElegida}.json`)
      .then((res) => res.json())
      .then((data) => {
        let rateBase = data[de].rate;
        let rateDestino = data[a].rate;
        let convertido = (valorDe * rateDestino) / rateBase;
        document.querySelector("#inputConvertido").value =
          convertido.toFixed(3);
        $(".textoConversion").remove();
        if (conversionElegida == "divisas") {
          $("#texto").append(`<h2 class="textoConversion">
          De ${valorDe} ${data[de].currency} a ${data[a].currency}
        </h2>`);
          $("#texto").animate({ opacity: "0.5" });
        }
      })
      .catch((err) =>
        console.log(`Hubo un problema en la petición Fetch: ${err.message}`)
      );
  }
}

// ----------------------------------------------------------------------------------------------------

// function almacenarIngresos(ingreso1, ingreso2) {
//   localStorage.setItem("ultimaSeleccion1", ingreso1);
//   localStorage.setItem("ultimaSeleccion2", ingreso2);
//   ultimaSeleccion1 = localStorage.getItem("ultimaSeleccion1");
//   ultimaSeleccion2 = localStorage.getItem("ultimaSeleccion2");
// }

window.addEventListener("DOMContentLoaded", (e) => {
  divisas();
  almacenarSelect1(e);
  let ultimaSeleccion1 = localStorage.getItem("ultimaSeleccion1");
  primerSelect.value = ultimaSeleccion1;
  let ultimaSeleccion2 = localStorage.getItem("ultimaSeleccion2");
  segundoSelect.value = ultimaSeleccion2;
  console.log(segundoSelect.value);
});

function almacenarSelect1() {
  fetch(`./${conversionElegida}.json`)
    .then((res) => res.json())
    .then((data) => {
      let de = primerSelect.value;
      localStorage.setItem("ultimaSeleccion1", data[de].id);
    });
}

function almacenarSelect2() {
  fetch(`./${conversionElegida}.json`)
    .then((res) => res.json())
    .then((data) => {
      let a = segundoSelect.value;
      localStorage.setItem("ultimaSeleccion2", data[a].id);
    });
}
