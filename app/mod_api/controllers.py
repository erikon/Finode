from flask import Flask, render_template, Blueprint

import json
import pymysql

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sqlalchemy.pool import QueuePool

from app.mod_api.models import *

mod_api = Blueprint('api', __name__, url_prefix='/api')

@mod_api.route("/<string:symbol>", methods=["GET"])
def get_by_symbol(symbol):
	print(symbol)
	engine = create_engine("mysql+pymysql://root:Johny224Seeds!@45.79.181.223:3306/stocks")
	Session = sessionmaker(bind=engine)
	session = Session()

	query = session.query(models.Price) \
		.filter(models.Price.symbol == symbol) \
		.limit(100)
	print(query);
	res = []
	for row in query:
		temp = {k: v for (k, v) in vars(row).items() if not k.startswith("_")}
		res.append(temp)
	return res

def get_company_name(symbol):
	print(symbol)
	engine = create_engine("mysql+pymysql://root:Johny224Seeds!@45.79.181.223:3306/stocks")
	Session = sessionmaker(bind=engine)
	session = Session()
