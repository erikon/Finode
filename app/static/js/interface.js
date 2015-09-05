$(function(){
	var categories = [],
	sectorData = {},
	stockCount = 0,
	sectorCount = 0,
	loaded = 0

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
				if(categories[i] != null && categories[i] != 'n/a' && categories[i] != 'Sector'){
					$('ul', '.categories').append('<li data-category="'+categories[i]+'">'+categories[i]+'</li>');
				}
				if(categories[i] == null) categories[i] = 'null';
				getStocksByCategory(categories[i]);
			}
		});
	}
	getStocksByCategory = function(category){
		$.ajax({
			url: '/api/category/'+category
		}).done(function(data){	
			data = JSON.parse(data);	
			sectorData[category] = data;
			stockCount += data.length;
			$('li[data-category="all"]').html('All (' + stockCount + ')');
			var entry = $('li[data-category="'+category+'"]');
			$(entry).html($(entry).html() + ' (' + data.length + ')');
		});
	}
	bindActions = function(){
		
	}
	getCategories();
});
