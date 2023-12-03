# API Routes
# Database schema
#   1. Previous requests
# Cache for addresses
#   2. Cache for class info
# Hardcoded
#   # List of addresses for dorms
from flask import Flask
from flask import jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
import os.path
from flask_cors import CORS
import requests
basedir = os.path.abspath(os.path.dirname(__file__))


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


CORS(app) 

db = SQLAlchemy(app)


@app.route('./search')
def search():
    pass



class Class(db.Model):
    __tablename__ = 'class'
    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.Text)
    class_building = db.Column(db.Text)
    class_distance = db.Column(db.Integer)
    class_commute_length = db.Column(db.Integer)
    class_professor = db.Column(db.Text)
    
    def __str__(self):
        return f'{self.class_name}'


def class_serialize(cl):
    return {
        'name': cl.name,
        'time': cl.time,
        'building': cl.building,
        'distance': cl.dist,
        'commute_length': cl.comm_length,
        'professor': cl.prof,
    }

@app.route('/')
def sample():
    return '<h1>Testing Flask</h1>'

if __name__ == '__main__':
    app.run(debug=True)