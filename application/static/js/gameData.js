
var freeCash = 100000,
portfolioValue = 0,
time = new Date(1995, 0, 1),
portfolio = {},
interval = 1 // month

function updateValue (length, symbol, quantity) {
  var total = data[symbol].close_p * quantity;
  if (Object.keys(portfolio).length > length) {
    portfolioValue += total;
  } else {
    portfolioValue -= total;
  }
  return total;
}

function addPair(key, value){
  portfolio[key] = value;
}

function getValue(key){
  return portfolio[key];
}

function buy (symbol, quantity) {
  var length = Object.keys(portfolio).length;
  var cost = updateValue(length, symbol, quantity);
  if(cost > freeCash){
  	return -1;
  }
  if(portfolio[symbol] == null){
    addPair(symbol, quantity);
  } else {
    portfolio[symbol] += quantity;
  }
  freeCash -= cost;
}

function sell (symbol, quantity) {
  var length = Object.keys(portfolio).length;
  var totalStock = getValue(symbol);
  if(quantity > totalStock){
  	return -1;
  }
  if(quantity === totalStock){
      delete portfolio[symbol];
  }
  else {
    portfolio[symbol] -= quantity;
  }
  var cost = updateValue(length, symbol, quantity);
  freeCash += cost;
}

function updateTime () {
  time.setMonth(time.getMonth() + interval);
  $('.current-date').html(time.getMonth() + 1 + '/' + time.getDate() + '/' + time.getFullYear());
}

function updateDisplay (){
  console.log(freeCash);
  $('.cash-output').append(freeCash);
  $('.current-date').html(time.getMonth() + 1 + '/' + time.getDate() + '/' + time.getFullYear());
  // document.Write(freeCash);
  // document.Write(portfolioValue);
  // document.Write(time);
  // document.Write(interval);
}
bindActions = function(){
    $('.btn-next-turn').click(function(){
      updateTime();
    });
}

bindActions();

