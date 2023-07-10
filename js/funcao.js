function voltarURL(){
    history.go(-1);  // voltar para a URL anterior.
  }

function InputMinusculo(e) {
    var ss = e.target.selectionStart;
    var se = e.target.selectionEnd;
    e.target.value = e.target.value.toLowerCase();
    e.target.selectionStart = ss;
    e.target.selectionEnd = se;
 }

 function InputMaiusculo(e) {
  var ss = e.target.selectionStart;
  var se = e.target.selectionEnd;
  e.target.value = e.target.value.toUpperCase();
  e.target.selectionStart = ss;
  e.target.selectionEnd = se;
}

function mascaraMoeda(event) {
  const onlyDigits = event.target.value
    .split("")
    .filter(s => /\d/.test(s))
    .join("")
    .padStart(3, "0")
  const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
  event.target.value = maskCurrency(digitsFloat)
}

function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  }).format(valor)
}  

function formatarData(e){
  var v=e.target.value.replace(/\D/g,"");
  v=v.replace(/(\d{2})(\d)/,"$1/$2") 
  v=v.replace(/(\d{2})(\d)/,"$1/$2") 
  e.target.value = v;    
}
