=== XmlHttpRequestWorker ===
Author: edouardkombo
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html


== Description ==

Simple class that allows you to create dynamic webworkers for xmlHttpRequest purpose.


== How to use it ==

Link the script inside your page

    <script src="scripts/XmlHttpRequestWorker.js"></script>
    
Single request inside a single worker object

    //Data to send to the worker
    var data = {
      'method': 'GET',
      'url':'http://your_url.com',
      'requestHeader': 'application/json, text/javascript',
      'params': {
        //'something': 'toto',
      }
    };

    //Instantiate the Dynamic worker instance
    var worker = new XmlHttpRequestWorker();
    
    //Send data to the worker
    worker.send(data);

    //Receive the response
    worker.listen(function(phrase) {
        console.log(phrase);
      
        //Terminate the connectio
        worker.kill();
    });
    
    //Terminate the connection
    worker.kill();

    
Multiple requests inside a single worker object

    //Data to send to the worker
    var data = {
      'method': 'GET',
      'url':'http://your_url.com',
      'requestHeader': 'application/json, text/javascript',
      'params': {
        //'something': 'toto',
      }
    };
    
    var data2 = {
      'method': 'GET',
      'url':'http://your_url_2.com',
      'requestHeader': 'application/json, text/javascript',
      'params': {
        //'something': 'toto',
      }
    };

    //Instantiate the Dynamic worker instance
    var worker = new XmlHttpRequestWorker();
    
    //Send data to the worker
    worker.send(data);
    worker.send(data2);

    //Receive the response
    worker.listen(function(phrase) {
      console.log(phrase);
      
      //Terminate the connection once every call have been made
      //worker.kill();
    });
    
    //Terminate the connection
    worker.kill();
    
    
Single requests inside separate workers

    function workerPool(data){
      //Instantiate the Dynamic worker instance
      var worker = new XmlHttpRequestWorker();

      //Receive the response
      worker.listen(function(phrase) {
        console.log(phrase);

        //Terminate the connection
        worker.kill();
      });

      //Send data to the worker
      worker.send(data);
    }

    //Data to send to the worker
    var datas = [
      {
        'method': 'GET',
        'url': 'http://your_url.com',
        'requestHeader': 'application/json, text/javascript',
        'params': {
          //'something': 'toto',
        }
      },
      {
        'method': 'GET',
        'url': 'http://your_url2.com',
        'requestHeader': 'application/json, text/javascript',
        'params': {
          //'something': 'toto',
        }
      }
    ];

    for (data in datas) {
      workerPool(datas[data]);
    }
