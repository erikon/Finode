from . import app
from . import controllers

@app.route("/api/<symbol>", methods=["GET"])
def get_by_symbol(symbol):
	print(symbol)
	return controllers.get_by_symbol(symbol)