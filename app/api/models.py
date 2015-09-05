from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import Numeric
from sqlalchemy import Date
from sqlalchemy import BigInteger

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Price(Base):
	__tablename__ = "price"
	symbol = Column(String(10), primary_key=True)
	date_ex = Column(Date)
	open_p = Column(Numeric)
	high_p = Column(Numeric)
	low_p = Column(Numeric)
	close_p = Column(Numeric)
	volume = Column(Integer)
	adj_close_p = Column(Numeric)

class Symbol(Base):
	__tablename__ = "symbol"
	symbol = Column(String(10), primary_key=True)
	company = Column(String(255))
	lastsale = Column(Numeric(10, 4))
	marketcap = Column(BigInteger)
	adrtso = Column(BigInteger)
	ipoyear = Column(Numeric(4, 0))
	sector = Column(String(127))
	industry = Column(String(127))
	quotelink = Column(String(127))

class Sentiment(Base):
	__tablename__ = "sentiment"
	date_ex = Column(Date, primary_key=True)
	# this model isn't finished