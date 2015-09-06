$(function(){
	var categories = [],
	stockData = {},
	sectorData = {},
	stockCount = 0,
	sectorCount = 0,
	loadedCount = 0,
	loaded = {}

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
					$('ul', '.categories').append('<li class="category-entry" data-category="'+categories[i]+'">'+categories[i]+'</li>');
				}
				if(categories[i] == null) categories[i] = 'null';
				getStocksByCategory(categories[i]);

				$('.category-entry[data-category="'+categories[i]+'"]').click(function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active');
						filterStocks('none');
					}
					else{
						$('.category-entry').removeClass('active');
						$(this).addClass('active');
						filterStocks($(this).data('category'));
					}
					var category = $(this).data('category');
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
			$(entry).html($(entry).html() + ' (' + data.length + ')');
			$(entry).addClass('loaded');
		}).fail(function(data){
			console.log("In the fail section.");
		});
	}
	getStock = function(symbol){
		console.log(symbol);
		if(stockData[symbol.toLowerCase()]){
			console.log("cached");
			console.log(stockData[symbol.toLowerCase()]);
			return stockData[symbol.toLowerCase()];
		}
		$.ajax({
			url: '/api/price/'+symbol
		}).done(function(data){
			data = JSON.parse(data);

			for(var i = 0; i < data.length; i++){
				delete data[i].adj_close_p;
				delete data[i].high_p;
				delete data[i].low_p;
				delete data[i].open_p;
				delete data[i].symbol;
			}
			
			stockData[symbol.toLowerCase()] = data;
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
		getStock(stock);
		var obj = $('.stock-entry[data-symbol="'+stock+'"]');
		var activeObj = obj.clone(true);
		$('.add-stock', activeObj).attr('onclick', 'addToGraph(\''+stock+'\')');	
		$(activeObj).append('<span class="remove-stock" onclick="removeFromActive(\''+stock+'\'">X</span>');
		$('ul', '.active-stocks').append(activeObj);
		$(obj).addClass('hide');
	}
	removeFromActive = function(stock){
		
	}
	addToGraph = function(stock){
		generateGraph(new Array(getStock(stock)));
	}
	updateGraph = function(stock){
		var data = [];
		
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
	getCategories();
});
