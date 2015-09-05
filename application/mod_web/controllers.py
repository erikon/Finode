from flask import Flask, render_template, Blueprint

mod_web = Blueprint('web', __name__, url_prefix='')

@mod_web.route('/')
def index():	
	return render_template('index.html');
