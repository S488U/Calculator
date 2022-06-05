function buttonClick(val){
    document.getElementById("display").value=document.getElementById("display").value+val;
}


function clearDisplay(){
    document.getElementById("display").value=""
}

function equalClick(){
    var text=document.getElementById("display").value
    var result=eval(text)
    document.getElementById("display").value=result
}
function backKey(){
    document.getElementById("display").value=document.getElementById("display").value.slice(0, -1);
   
}