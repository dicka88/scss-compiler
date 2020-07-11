// home page

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".convert-button")
    .forEach((e) => e.addEventListener("click", fetchCss));
});
ace.require("ace/ext/language_tools");

var scsseditor = ace.edit("scss-editor");
scsseditor.setTheme("ace/theme/monokai");
scsseditor.session.setMode("ace/mode/scss");
scsseditor.setOptions({
  enableBasicAutocompletion: false,
  enableSnippets: false,
  enableLiveAutocompletion: true,
  tabSize: 2,
  showPrintMargin: false,
});

/**
 * set value for demo
 */
scsseditor.setValue("// paste your scss script here", 1);

// for beautify
var beautify = ace.require("ace/ext/beautify");

function scssbeautify() {
  beautify.beautify(scsseditor.session);
}

var csseditor = ace.edit("css-editor");
csseditor.setReadOnly(true);
csseditor.setTheme("ace/theme/monokai");
csseditor.session.setMode("ace/mode/css");

// listener
let debFetch = debounce(fetchCss, 1500);
scsseditor.session.on("change", function (delta) {
  debFetch();
});

async function fetchCss() {
  let convertLoading = document.querySelector(".convert-loading");

  const stringScss = scsseditor.getValue();
  if (!stringScss) return;

  convertLoading.classList.toggle("hidden");
  const data = await fetch("/api/scss-css", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      string: stringScss,
    }),
  });
  if (!data) return;
  convertLoading.classList.toggle("hidden");
  const html = await data.text();

  csseditor.setValue(html, 1);
}

function debounce(callback, time) {
  var timeout;
  return function () {
    clearTimeout(timeout);

    timeout = setTimeout(callback, time);
  };
}

// helper
// copy to clipboard from string
const copyClipboard = (string) => {
  var el = document.createElement("textarea");
  el.style.display = "hidden";
  el.value = string;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

// save file
const saveFile = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (data, fileName) {
    var blob = new Blob([data], {
        type: "octet/stream",
      }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
})();

// scss css switcher
function editor_switcher(to) {
  console.log(to);

  let ahref = document.querySelectorAll("#editor-switcher li a");
  ahref.forEach((e) =>
    e.classList.remove("bg-pink-700", "text-white", "font-semibold")
  );

  switch (to) {
    case "css":
      document.querySelector(".css-wrapper").classList.remove("xs:hidden");
      document.querySelector(".scss-wrapper").classList.add("xs:hidden");
      document
        .querySelector("#editor-switcher #editor-switcher_css")
        .classList.add("bg-pink-700", "text-white", "font-semibold");
      csseditor.gotoLine(0, 1);
      break;
    case "scss":
      document.querySelector(".css-wrapper").classList.add("xs:hidden");
      document
        .querySelector("#editor-switcher #editor-switcher_scss")
        .classList.add("bg-pink-700", "text-white", "font-semibold");
      document.querySelector(".scss-wrapper").classList.remove("xs:hidden");
      break;
    case "demo":
      break;
    default:
  }
}

// navbar toggler
function navbarToggle() {
  document.querySelector(".navbar-item").classList.toggle("xs:hidden");
}

// scss toolbar
const scssFullscreen = () =>
  !document.fullscreen
    ? document.querySelector(".scss-wrapper").requestFullscreen()
    : document.exitFullscreen();
const scssCopyClipboard = () => copyClipboard(scsseditor.getValue());
const scssSaveFile = () => saveFile(scsseditor.getValue(), "scssdownload.scss");

const cssFullscreen = () =>
  !document.fullscreen
    ? document.querySelector(".css-wrapper").requestFullscreen()
    : document.exitFullscreen();
const cssCopyClipboard = () => copyClipboard(csseditor.getValue());
const cssSaveFile = () => saveFile(csseditor.getValue(), "cssdownload.css");
