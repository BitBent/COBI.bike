let logDiv, messageQueue =[];

window.addEventListener('load', function(){
    // assign the log element
    logDiv = document.getElementById('logs');
    if(messageQueue.length){
        // print your preload errors
        messageQueue.forEach(([type,text])=>addToLogDiv(type,text))
    }
})

var addToLogDiv = function (type, text) {
  if(logDiv){
    var node = document.createElement('p')
    node.className = type
    var content = document.createTextNode(type + ': ' + text)
    node.appendChild(content)
    logDiv.appendChild(node)
  }else{
    // before logDiv defined store any errors
    messageQueue.push([type, text]) 
  } 
}

// define a new console
var console = (function (oldCons) {
    return {
      log: function (text) {
        oldCons.log(text)
        addToLogDiv('log', text)
      },
      info: function (text) {
        oldCons.info(text)
        addToLogDiv('info', text)
      },
      warn: function (text) {
        oldCons.warn(text)
        addToLogDiv('warn', text)
      },
      error: function (text) {
        oldCons.error(text)
        addToLogDiv('error', text)
      }
    }
  })(window.console)

//Then redefine the old console
window.console = console
// after new console created
window.addEventListener('error', function(e){
  console.log(e.message)
})


// source; https://stackoverflow.com/questions/67184346/overriding-console-log-etc-to-display-inside-html-view