from flask import Flask, render_template, Blueprint
from application.mod_api.controllers import *

import json

mod_game = Blueprint('game', __name__, url_prefix='/game')

def getSectors():
    data = get_sectors();
    sectors = json.loads(data);
    print sectors;
    return render_template('index.html',
                            sectors = data);
getSectors();
