window.addEventListener("dragover",function(e){
  e = e || event;
  e.preventDefault();
},false);
window.addEventListener("drop",function(e){
  e = e || event;
  e.preventDefault();
},false);

document.getElementById("dropper").ondrop =  function(ev){
   console.log("Incoming!!!");
   var filePath = (ev.dataTransfer.files[0].path);

  if(filePath.split(".")[1] != "zip"){
       alert("Please place a ZIP file on the flashing platform!");
       return;
   }
    var itemCount = {};
    var zipper = require("./_js/ZipOpener")(filePath, itemCount);
}
