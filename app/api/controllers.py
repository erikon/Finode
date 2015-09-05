import json
import pymysql

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from sqlalchemy.pool import QueuePool

from . import models

def get_by_symbol(symbol):
	print(symbol)
	engine = create_engine("mysql+pymysql://root:Johny224Seeds!@45.79.181.223:3306/stocks")
	Session = sessionmaker(bind=engine)
	session = Session()

	query = session.query(models.Price) \
		.filter(models.Price.symbol == symbol) \
		.limit(100)

	res = []
	for row in query:
		temp = {k: v for (k, v) in vars(row).items() if not k.startswith("_")}
		res.append(temp)
	return res
