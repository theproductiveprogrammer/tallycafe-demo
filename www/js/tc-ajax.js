// Simple AJAX handler

var get_ajax_obj = function () {
    if (window.ActiveXObject) return new ActiveXObject ('Microsoft.XMLHTTP');
    if (window.XMLHttpRequest) return new XMLHttpRequest ();
    return null;
}

function call_ajax (url, okf, erf) {

    if (!erf) erf = console.error.bind (console);

    var xhr = get_ajax_obj ();

    if (!xhr) return erf ('No XMLHttpRequest available');

    xhr.open ('POST', url);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) return okf (xhr.response);
            return erf ('Error status: ' + xhr.status);
        }
    }
    xhr.send ();
}
