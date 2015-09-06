$(function() {
  var freeCash = 100000,
  portfolioValue = 0,
  time = new Date (1995, 0, 1),
  portfolio = {};

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
    if(portfolio[symbol] == null){
      addPair(symbol, quantity);
    } else {
      portfolio[symbol] += quantity;
    }
    var cost = updateValue(length, symbol, quantity);
    freeCash -= cost;
  }

  function sell (symbol, quantity) {
    var length = Object.keys(portfolio).length;
    var totalStock = getValue(symbol);
    if(quantity === totalStock){
        delete portfolio[symbol];
    } else {
      portfolio[symbol] -= quantity;
    }
    var cost = updateValue(length, symbol, quantity);
    freeCash += cost;
  }
});
