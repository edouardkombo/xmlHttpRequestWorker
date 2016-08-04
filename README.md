=== XmlHttpRequestWorker ===
Author: edouardkombo
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html


== Description ==

Simple class that allows you to create dynamic webworkers for xmlHttpRequest purpose.


== Overview of XmlHttp parameters ==

      //Mandatory
          'method': 'GET', 
          'url':'http://your_url.com',
      
      //Optional
          'requestHeader': {
              'accept': 'application/json, text/javascript'
          },
          'params': {
            //'something': 'toto',
          },
          
          //Use this one if you want to kill the worker on a specific process
          'kill': true


== How to use it ==

Link the script inside your page

    <script src="scripts/XmlHttpRequestWorker.min.js"></script>
    
    
Single request inside a single worker object

    //Data to send to the worker
    var data = {
      'method': 'GET', 
      'url':'http://your_url.com',
      'requestHeader': {
          'accept': 'application/json, text/javascript'
      },
      'kill': true
    };

    //Instantiate the Dynamic worker instance
    var worker = new XmlHttpRequestWorker();
    
    //Send data to the worker
    worker.send(data);

    //Receive the response
    worker.listen(function(response) {
        console.log(response);
      
        //Terminate the connection if the argument was specified inside the parameters
        if (true === response.kill) {
            worker.kill();
        }
    });

    
Multiple requests inside a single worker object

    //Data to send to the worker
    var data = {
      'method': 'GET', 
      'url':'http://your_url.com',
      'requestHeader': {
          'accept': 'application/json, text/javascript'
      }
    };
    
    //We want to terminate the worker after this process
    var data2 = {
      'method': 'GET', 
      'url':'http://your_url_2.com',
      'requestHeader': {
          'accept': 'application/json, text/javascript'
      },
      'kill': true
    };

    //Instantiate the Dynamic worker instance
    var worker = new XmlHttpRequestWorker();
    
    //Send data to the worker
    worker.send(data);
    worker.send(data2);

    //Receive the response
    worker.listen(function(phrase) {
        console.log(phrase);
      
        //Terminate the connection if the argument was specified inside the parameters
        if (true === response.kill) {
            worker.kill();
        }
    });
    
    
Single requests inside separate workers

    function workerPool(data){
      //Instantiate the Dynamic worker instance
      var worker = new XmlHttpRequestWorker();

      //Receive the response
      worker.listen(function(response) {
        console.log(response);

        //We can choose to manually terminate the worker this time
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
        'requestHeader': {
            'accept': 'application/json, text/javascript'
        },
      },
      {
        'method': 'GET',
        'url': 'http://your_url2.com',
        'requestHeader': {
            'accept': 'application/json, text/javascript'
        }
      }
    ];

    for (data in datas) {
      workerPool(datas[data]);
    }
