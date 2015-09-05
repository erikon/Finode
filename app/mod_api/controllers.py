from flask import Flask, render_template, Blueprint

import json
import pymysql

from flask import jsonify

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sqlalchemy.pool import QueuePool

from app.mod_api.models import *

mod_api = Blueprint('api', __name__, url_prefix='/api')

db_url = "mysql+pymysql://root:Johny224Seeds!@45.79.181.233:3306/stocks"

def getSesh():
	engine = create_engine(db_url)
	Session = sessionmaker(bind=engine)
	session = Session()
	return session

def jsonify(query):
	res = []
	for row in query:
		temp = {k: str(v) for (k, v) in vars(row).items() if not k.startswith("_")}
		res.append(temp)
	return json.dumps(res)

@mod_api.route("/price/<string:symbol>")
def get_by_symbol(symbol):
	return jsonify(getSesh().query(Price).filter(Price.symbol == symbol).all())

@mod_api.route("/company/<string:symbol>")
def get_company_name(symbol):
	return jsonify(getSesh().query(Symbol).filter(Symbol.symbol == symbol).all())

@mod_api.route("/category/all")
def get_sectors():
	return json.dumps(getSesh().query(Symbol.sector).distinct().all());

@mod_api.route("/category/<string:sector>")
def get_sector(sector):
	print(sector);
	return jsonify(getSesh().query(Symbol).filter(Symbol.sector == sector).all());