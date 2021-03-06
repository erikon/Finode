$(function(){
	var categories = [],
	stockData = {},
	sectorData = {},
	stockDataByDate = {},
	stockCount = 0,
	sectorCount = 0,
	loadedCount = 0,
	loaded = {},
	colorCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	stockColors = {},
	loadingStocks = 0,
	inGame = false

	getCategories = function(){
		$.ajax({
			url: '/api/category/all'
		}).done(function(data){
			data = JSON.parse(data);
			sectorCount = data.length;

			categories = [];
			for(var i = 0; i < data.length; i++){
				categories.push(data[i][0]);
			}
		
			for(var i = 0; i < categories.length; i++){
				if(categories[i] != null && categories[i] != 'Sector' && categories[i] != 'n/a'){
					$('select', '.modal-body').append('<option value="'+categories[i]+'">'+categories[i]+'</option>');
					$('ul', '.categories').append('<li class="category-entry" data-category="'+categories[i]+'"><span class="category-text">'+categories[i]+' <span class="category-count"></span></span><span class="add-category"></span></li>');
				}
				if(categories[i] == null) categories[i] = 'null';
				getStocksByCategory(categories[i]);

				$('.add-category', '.category-entry[data-category="'+categories[i]+'"]').click(function(){
					if(!inGame){
						var obj = $(this).closest('.category-entry');
						if(obj.hasClass('active')){
							obj.removeClass('active');
							$(this).removeClass('selected');
							filterStocks('none');
						}
						else{
							$('.category-entry').removeClass('active');
							obj.addClass('active');
							$(this).addClass('selected');
							filterStocks(obj.data('category'));
						}
						var category = obj.data('category');
					}
				});
			}
		});
	}
	getStocksByCategory = function(category){
		if(category == 'n/a') category = 'na';
		$.ajax({
			url: '/api/category/'+category
		}).done(function(data){
			data = JSON.parse(data);

			for(var i = 0; i < data.length; i++){
				delete data[i].adrtso;
				delete data[i].lastsale;
				delete data[i].quotelink;
			}

			sectorData[category] = data;
			stockCount += data.length;
			$('li[data-category="all"]').html('All (' + stockCount + ')');
			var entry = $('li[data-category="'+category+'"]');
			$('.category-count', entry).html('('+data.length+')');
			$(entry).addClass('loaded');
		}).fail(function(data){
			console.log("In the fail section.");
		});
	}
	getStock = function(symbol){
		if(stockData[symbol.toLowerCase()]){
			return stockData[symbol.toLowerCase()];
		}
		loadingStocks++;
		$.ajax({
			url: '/api/price/'+symbol
		}).done(function(data){
			data = JSON.parse(data);
			console.log(data);
			var key = symbol.toLowerCase();
			stockDataByDate[key] = {};
			for(var i = 0; i < data.length; i++){
				delete data[i].adj_close_p;
				delete data[i].high_p;
				delete data[i].low_p;
				delete data[i].open_p;
				delete data[i].symbol;
				stockDataByDate[key][data[i].date_ex] = data[i].close_p;
			}
			stockData[symbol.toLowerCase()] = data;
			loadingStocks--;
			if(loadingStocks == 0){
				drawGraph();
			}
		});
	}
	compareStocks = function(a, b){
		if(a.symbol < b.symbol){
			return -1;
		}
		if(a.symbol > b.symbol){
			return 1;
		}
		return 0;
	}
	toActive = function(stock){
		var obj = $('.stock-entry[data-symbol="'+stock+'"]');
		var activeObj = obj.clone(true);
		$('.add-stock', activeObj).attr('onclick', 'addToGraph(\''+stock+'\')');
		$(activeObj).append('<span class="remove-stock" onclick="removeFromActive(\''+stock+'\')">X</span>');
		$('ul', '.active-stocks').append(activeObj);
		$(obj).addClass('hide');
	}
	removeFromActive = function(stock){
		$('.stock-entry[data-symbol="'+stock+'"]', '.active-stocks').remove();
		$('.stock-entry[data-symbol="'+stock+'"]', '.stocks').removeClass('hide');
		colorCount[stockColors[stock]]--;
		drawGraph();
	}
	pickNextColor = function(){
		var maxUses = 1<<30, loc = -1;
		for(var i = 0; i < colors.length; i++){
			if(colorCount[i] < maxUses){
				maxUses = colorCount[i];
				loc = i;
			}
		}
		colorCount[loc]++;
		return loc;
	}
	addToGraph = function(stock){
		var obj = $(".stock-entry[data-symbol='"+stock+"']", '.active-stocks');
		var circle = $('.add-stock', $(obj));

		if(obj.hasClass('selected')){
			obj.removeClass('selected');

			circle.removeClass('color'+stockColors[stock]);
			colorCount[stockColors[stock]]--;
		}
		else{
			getStock(stock);
			obj.addClass('selected');

			var nextColor = pickNextColor();
			circle.addClass('color'+nextColor);
			stockColors[stock] = nextColor;
		}
		drawGraph();
	}
	drawGraph = function(){
		var data = [], colors = [];
		$('.stock-entry.selected', '.active-stocks').each(function(){
			var stock = $(this).data('symbol');
			data.push(getStock(stock));
			colors.push(stockColors[stock]);
		});
		console.log(data);
		generateGraph(data, colors);
	}
	filterStocks = function(category){
		$('.stock-entry', '.stocks').addClass('hide');
		if(category != 'none') {
			var categoryEntry = $('.category-entry[data-category="'+category+'"]');
			if($(categoryEntry).hasClass('loaded')){
				var stocks = sectorData[category];
				stocks.sort(compareStocks);
				for(var i = 0; i < stocks.length; i++){
					var stock = stocks[i].symbol;
					if(stock.indexOf('^') != -1) continue;
					if($('li[data-symbol="'+stock+'"]').length == 0){
						$('ul', '.stocks').append('<li class="stock-entry" data-symbol="'+stock+'"><span class="stock-symbol">'+stock+'</span><span class="add-stock" onclick="toActive(\''+stock+'\')"></span></li>');
					}
					else {
						$('li[data-symbol="'+stock+'"]').removeClass('hide');
					}
				}
			}
		}
	}
	bindActions = function(){

	}
	getCategories();
	bindActions();
});
