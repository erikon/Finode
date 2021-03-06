from flask import Flask, render_template, Blueprint

#Define the WSGI application object
app = Flask(__name__)

#Configurations
app.config.from_pyfile('../config.py')

#Simple Error Handling
@app.errorhandler(404)
def not_found(error):
	return render_template('404.html')

#Import modules
from application.mod_api.controllers import mod_api as api_module
from application.mod_web.controllers import mod_web as web_module
from application.mod_game.controllers import mod_game as game_module

#Register blueprints
app.register_blueprint(api_module)
app.register_blueprint(web_module)
app.register_blueprint(game_module)
