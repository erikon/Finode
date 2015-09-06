from flask import Flask, render_template, Blueprint

mod_game = Blueprint('game', __name__, url_prefix='/game')

@mod_game.route('/')
def game():
	return render_template('index.html');
