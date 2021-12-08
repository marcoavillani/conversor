let btn = document.querySelector("#btn-menu");
let sidebar = document.querySelector(".sidebar");
let conversionElegida = "divisas";


btn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

$("#btn1").on("click", () => (conversionElegida = "divisas"));

$("#btn2").on("click", () => (conversionElegida = "longitud"));

const texto = $("#texto");

$.getJSON(`./${conversionElegida}.json`, function (res, estado) {
  if (estado === "success") {
    let misDatos = res;
    let contador = 0;
    for (const dato of misDatos) {
      $("#primerSelect").append(`
                                  <option id="optionPrimerSelect${contador}" value="${contador}">
                                    <h1>${dato.code}</h1>
                                  </option>
      `);
      $("#segundoSelect").append(`
                                  <option id="optionSegundoSelect${contador} "value="${contador}">
                                    <h1>${dato.code}</h1>
                                  </option>
      `);
      contador++;
    }
  }
});

document.querySelector("#invertir").addEventListener("click", (e) => {
  e.preventDefault();
  const select = document.querySelector("primerSelect");
  console.log(select);
});

$("#primerSelect").on("change DOMContentLoaded", convertir);

$("#segundoSelect").on("change DOMContentLoaded", convertir);

$("#valorDe").on("change textInput input DOMContentLoaded", convertir);

function convertir() {
  let de = document.querySelector("#primerSelect").value;
  let valorDe = document.querySelector("#valorDe").value;
  let a = document.querySelector("#segundoSelect").value;

  fetch(`./${conversionElegida}.json`)
    .then((response) => response.json())
    .then((data) => {
      let rateBase = data[de].rate;
      let rateDestino = data[a].rate;
      let convertido = (valorDe * rateDestino) / rateBase;
      document.querySelector("#inputConvertido").value = convertido.toFixed(3);

      $(".hola").remove();
      texto.append(
        `<h2 class="hola">
        De ${valorDe} ${data[de].currency} a ${data[a].currency}
        </h2>`
      );
    })
    .catch((error) =>
      console.log(`Hubo un problema en la petición Fetch: ${error.message}`)
    );
}
