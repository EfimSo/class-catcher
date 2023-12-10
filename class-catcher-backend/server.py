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
from class_info_scraper import search_course
from google_maps import search_building_code, search_location, search_dorm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')


CORS(app) 

db = SQLAlchemy(app)


@app.route('/search', methods = ['POST'])
def search():
    request_data = json.loads(request.data)
    # task = Class.query.filter_by(class_name=request_data['name']).first() # search for class in db
    class_name = request_data["name"] if " " not in request_data["name"] else "".join([s for s in request_data["name"] if s != " "])
    course_info = search_course(class_name)
    if course_info is None:
        return {'415': 'Course name could not be found'}
    ret_list = []
    for i in range(len(course_info["sections"])):
        building_address = search_building_code(course_info["locations"][i][:3])
        if building_address is None:
            class_distance, class_commute_length = ("Could not find address" for _ in [1, 2])
        else:
            dorm_address = search_dorm(request_data["address"])
            if dorm_address is None:
                address = request_data["address"]
            else:
                address = dorm_address
            transport_mode = request_data["transportMode"] if request_data["transportMode"] != "bicycle" else "bicycling"
            distloc = search_location(address, building_address, transport_mode)
            class_distance, class_commute_length = distloc if distloc is not None else "Could not find address"
        ret_list.append(Class(class_name = class_name, class_time = course_info["times"][i],
                      class_building=course_info["locations"][i], class_distance=class_distance,
                      class_commute_length = class_commute_length,
                      class_professor = course_info["professors"][i]))
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