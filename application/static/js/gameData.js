
var freeCash = 100000,
portfolioValue = 0,
time = new Date(1995, 0, 1),
portfolio = {},
interval = 1,
currIndex = 0 // month

function updateValue (length, symbol, quantity) {
  var total = stockDataByDate[symbol.toLowerCase()][time.getFullYear()+'-'+time.getMonth()+'-'+time.getDate()] * quantity;
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
  quantity = parseInt(quantity);
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
  $('.btn-start-game').click(function(){
    $('div.panel').removeClass('hide');
    $('#play').addClass('hide');
    var category = $('#sectors').val();
    $('.add-category', '.category-entry[data-category="'+category+'"]').trigger('click');
    inGame = true;
    updateDisplay();
  });
  $('.btn-next-turn').click(function(){
    updateTime();
  });

  $('.btn-buy').click(function() {
    buy($('#buy-stock-symbol').val(), $('#buy-shares').val())
  });
}

bindActions();

