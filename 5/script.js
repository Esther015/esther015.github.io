function click1() {
  event.preventDefault();
  let f1 = document.getElementsByName("quantity");
  let f2 = document.getElementsByName("product");
  let r = document.getElementById("result");
  let quantity= f1[0].value;
  let product = f2[0].value;
  let price =0;

  if(product = "v1"){
	price= quantity * 500;
  }
  else if(product == "v2"){
	price= quantity * 200;
  }
  else{
	price =quantity * 75;
  }
  
  r.innerHTML = price;
  let s = document.getElementsByName("select1");
  console.log(s[0].value);
  return false;
}

window.addEventListener('DOMContentLoaded', function (event) {
  console.log("DOM fully loaded and parsed");
  let b = document.getElementById("button1");
  b.addEventListener("click", click1);
});
