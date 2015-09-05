from flask import Flask, render_template, Blueprint

import json
import pymysql

from flask import jsonify

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sqlalchemy.pool import QueuePool

from application.mod_api.models import *

mod_api = Blueprint('api', __name__, url_prefix='/api')

db_url = "mysql+pymysql://root:Johny224Seeds!@45.79.181.233:3306/stocks"

def getSesh():
	engine = create_engine(db_url)
	Session = sessionmaker(bind=engine)
	session = Session()
	return session

def objectify(query):
	res = []
	for row in query:
		temp = {k: str(v) for (k, v) in vars(row).items() if not k.startswith("_")}
		res.append(temp)
	return res

def get_by_symbol(symbol):
	return objectify(getSesh().query(Price).filter(Price.symbol == symbol).all())
@mod_api.route("/price/<string:symbol>")
def get_by_symbol_api(symbol):
	return json.dumps(get_by_symbol(symbol))

def get_company_name(symbol):
	return objectify(getSesh().query(Symbol).filter(Symbol.symbol == symbol).all())
@mod_api.route("/company/<string:symbol>")
def get_company_name_api(symbol):
	return json.dumps(get_company_name(symbol))

def get_sectors():
	return getSesh().query(Symbol.sector).distinct().all()
@mod_api.route("/category/all")
def get_sectors_api():
	return json.dumps(get_sectors())

def get_sector(sector):
	if(sector == 'na'):
		sector = 'n/a'
	if(sector != 'null'):
		return objectify(getSesh().query(Symbol).filter(Symbol.sector == sector).all())
	else:
		return objectify(getSesh().query(Symbol).filter(Symbol.sector == None).all())
@mod_api.route("/category/<string:sector>")
def get_sector_api(sector):
	return json.dumps(get_sector(sector));
