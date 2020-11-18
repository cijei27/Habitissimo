import "./style.css";
import $, { ajax, each } from "jquery";
import { isValueEmpty } from "./util.js";

/** Array que almacena los resultados de búsqueda del servicio */
const stringList = [];
/** Variable que almacena la palabra a buscar del input de búsqueda */
let filter = "";

/**
 * Evento del input de búsqueda, que captura cuando el usuario deja de pulsar un tecla
 */
$("#filter").on("keyup", () => {
  let countWords = 0;
  filter = $("#filter").val();

  if (filter.length == 0) {
    $("#search-result > li").remove();
    $("#search-filter-count").text("");
    $(".card").css("display", "none");
  }

  if (filter.length < 3 && filter.length > 0) {
    $("#search-filter-count").text(
      "Inserte al menos 3 caracteres. Descripción demasiado corta"
    );
  } else {
    $("#search-filter-count").text("");
    if (isValueEmpty(filter)) {
      $("#search-result > li").remove();
      $("#search-filter-count").text("");
    } else {
      try {
        ajax({
          url:
            "http://api.dataatwork.org/v1/jobs/autocomplete?contains=" + filter
        })
          .done(data => {
            $(".search-icon").css("display", "none");
            $(".loading-icon").css("display", "block");

            $("#search-result > li").remove();
            each(data, (i, item) => {
              stringList.push(item.normalized_job_title);
              var optionPrompt =
                "<li id=" +
                item.uuid +
                ' role="option">' +
                item.normalized_job_title +
                "</li>";
              $("#search-result").append(optionPrompt);
            });

            $("#search-result > li").each((i, item) => {
              if (
                stringList[i].toUpperCase().indexOf(filter.toUpperCase()) > -1
              ) {
                // Mostramos los que sean contains.
                $("#search-result li:eq(" + i + ")").css("display", "block");
                countWords++;
              } else {
                $("#search-result li:eq(" + i + ")").css("display", "none");
              }
            });

            $("#search-filter-count").text(countWords + " coincidencia/s");
            $(".search-icon").css("display", "block");
            $(".loading-icon").css("display", "none");
          })
          .fail((jqXHR, textStatus, errorThrown) => {
            $("#search-result > li").remove();

            if (textStatus === "parsererror") {
              $("#search-filter-count").text("Error al procesar la búsqueda");
            } else if (textStatus === "timeout") {
              $("#search-filter-count").text(
                "Error: Tiempo de espera agotado en la solicitud"
              );
            } else if (textStatus === "abort") {
              $("#search-filter-count").text("Error: solicitud rechazada");
            } else if (
              jqXHR.status === 0 ||
              jqXHR.status == 404 ||
              jqXHR.status == 500
            ) {
              if (isValueEmpty(errorThrown)) {
                $("#search-filter-count").text(
                  "En estos momentos no se ha podido realizar la búsqueda"
                );
              } else {
                $("#search-filter-count").text(
                  "En estos momentos no se ha podido realizar la búsqueda. Motivo: " +
                    errorThrown
                );
              }
            }

            throw "Error al realizar la búsqueda";
          });
      } catch (e) {
        $("#search-filter-count").text(
          "En estos momentos no podemos realizar su búsqueda. Pongase en contacto con nuestro soporte técnico. Disculpe las molestias."
        );
      }
    }
  }
});

/**
 * Evento del input de búsqueda, que captura cuando el foco lo tiene el input
 */
$("#filter").on("focus", () => {
  filter = $("#filter").val();

  if (filter.length == 0) {
    $("#search-result > li").remove();
    $("#search-filter-count").text("");
    $(".card").css("display", "none");
  }
});

/**
 * Evento que captura cuando hacemos click en el botón de menu responsive
 */
$(".menu-btn").on("click", () => {
  if ($(".nav-menu").hasClass("show")) {
    $(".nav-menu").removeClass("show");
  } else {
    $(".nav-menu").addClass("show");
  }
});

/**
 * Evento que captura cuando se pincha sobre una opción de búsqueda
 */
$(".search-result-container").on("click", "ul li", function() {
  let ID = "ID: " + $(this).attr("id");
  let ocupation = "Ocupation: " + $(this).text();

  $(".card").css("display", "block");
  $(".card-container h3").text(ID);
  $(".card-container h4").text(ocupation);
});
