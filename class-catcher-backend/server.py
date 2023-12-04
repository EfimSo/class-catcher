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
# import requests
import random
basedir = os.path.abspath(os.path.dirname(__file__))


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


CORS(app) 

db = SQLAlchemy(app)


@app.route('/search', methods = ['POST'])
def search():
    request_data = json.loads(request.data)
    # task = Class.query.filter_by(class_name=request_data['name']).first() # search for class in db
    ret_list = [Class(class_name = request_data["name"], class_time = "MWF 10:10 am-11:00 am",
                      class_building="CGS", class_distance=f"{random.randint(1, 20)} mi",
                      class_commute_length = f"{random.randint(5, 30)} min",
                      class_professor = "Perry Dohnam")
                for _ in range(5)]
    return jsonify([*map(class_serialize, ret_list)])

class Class(db.Model):
    __tablename__ = 'class'
    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.Text)
    class_time = db.Column(db.Text)
    class_building = db.Column(db.Text)
    class_distance = db.Column(db.Text)
    class_commute_length = db.Column(db.Text)
    class_professor = db.Column(db.Text)
    
    def __str__(self):
        return f'{self.class_name}'


def class_serialize(cl):
    return {
        'name': cl.class_name,
        'time': cl.class_time,
        'building': cl.class_building,
        'distance': cl.class_distance,
        'commute_length': cl.class_commute_length,
        'professor': cl.class_professor,
    }

@app.route('/')
def sample():
    return '<h1>Testing Flask</h1>'

if __name__ == '__main__':
    app.run(debug=True)