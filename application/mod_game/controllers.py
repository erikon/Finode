from flask import Flask, render_template, Blueprint
from application.mod_api.controllers import *

import json

mod_game = Blueprint('game', __name__, url_prefix='/game')

@mod_game.route("/")
def getSectors():
    sec = get_sectors();
    print index;
    return render_template('index.html',
                            sec = sec);

