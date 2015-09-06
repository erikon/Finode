from flask import Flask, render_template, Blueprint
from application.mod_api.controllers import *

import json

mod_game = Blueprint('game', __name__, url_prefix='')

@mod_game.route("/game")
def render():
	return render_template('game.html');
