from flask import Flask, render_template, Blueprint
from application.mod_api.controllers import *

import json

def getSectors():
    data = get_sectors();
    sectors = json.load(data);
    return render_template('index.html',
                            sectors = sectors);
