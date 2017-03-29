# decode=gbk
# --*-- coding: utf-8 --*--


# all the imports
from contextlib import closing
import sqlite3
from flask import Flask, request, session, g, redirect,url_for,\
	abort, render_template, flash

#创建init_db函数来初始化数据库


# 1 configuration
DATABASE = '/tmp/flask.db'
DEBUG = True
SECRET_KEY = 'development key'
USERNAME = 'admin'
PASSWORD = 'default'

# 2 create out little application
app = Flask(__name__)
app.config.from_envvar('FLASKR_SETTINGS', silent = True)

# 3 the way of connect database
def connect_db():
	return sqlite3.connect(app.config['DATABASE'])

def init_db():
	with closing(connect_db()) as db:
		with app.open_resource('schema.sql',mode='r') as f:
			db.cursor().executescript(f.read())
		db.commit()

# 4 请求数据库的连接
@app.before_request
def before_request():
	g.db = connect_db()

@app.teardown_request
def teardown_request(exception):
	g.db.close()


if __name__ == '__main__':
	app.run()
	