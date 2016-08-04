/**
 * @Author: Edouard Kombo
 *
 * This class will allow you to manage unlimited WebWorkers for XmlHttpRequests purposes only
 *
 * @class XmlHttpRequestWorker
 * @constructor
 * @param Worker Html5 Worker instance
 */
function XmlHttpRequestWorker(Worker) {
    Worker = Worker || window.Worker;
    this.url = this.getWorkerURL();
    this.worker = new Worker(this.url);
}

XmlHttpRequestWorker.prototype = {
    // Get all of our script in a string format
    getWorkerScript: function(){
        var js = '';
        js += '(' + this.workerInit + ')(this);';
        return js;
    },

    // This function really represents the body of our worker script.
    workerInit: function(global) {
        global.onmessage = function(e) {

            var params = '';

            //If params are sent, get them all
            if (typeof e.data.params !== 'undefined') {
                if ((typeof e.data.params === 'object') && Object.keys(e.data.params).length > 0) {

                    params = new FormData();

                    for (myVar in e.data.params) {
                        params.append(myVar, e.data.params[myVar]);
                    }
                }
            }

            var xhr = new XMLHttpRequest();
            xhr.open(e.data.method, e.data.url, true);
            xhr.setRequestHeader('Accept', e.data.requestHeader);
            xhr.onload = function (result) {
                // do something to response
                var response = {
                    'status': result.srcElement.status,
                    'response': result.srcElement.responseText
                };
                global.postMessage(response);
            };
            xhr.send(params);
        };
    },


    // get a blob url for the worker script from the worker script text
    getWorkerURL: function() {
        var blob = new Blob([this.getWorkerScript()], { type: 'text/javascript' });
        return URL.createObjectURL(blob);
    },

    // kill the object.
    kill: function() {
        if(this.worker) {
            this.worker.terminate();
        }
        if(this.url) {
            URL.revokeObjectURL(this.url);
        }
    },

    // Send something to the object
    send: function(msg) {
        if(this.worker) {
            this.worker.postMessage(msg);
        }
    },

    // Listen back for the object
    listen: function(handler) {
        if(this.worker) {
            this.worker.addEventListener('message', function(e) {
                handler(e.data);
            });
        }
    }
};
