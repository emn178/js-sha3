var imported = false;
onmessage = function(e) {
  if (imported) {
    postMessage(sha3_512(e.data));
    if (typeof exports !== 'undefined') {
      imported = false;
    }
  } else {
    imported = true;
    importScripts(e.data);
  }
}
