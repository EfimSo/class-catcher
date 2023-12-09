from dotenv import load_dotenv
import requests
import os
import pandas as pd
# import AUTH key variable
load_dotenv()
key = os.getenv("GMAPS_AUTH_KEY")

full_url =\
f"""
https://maps.googleapis.com/maps/api/distancematrix/json
  ?destinations=New%20York%20City%2C%20NY
  &origins=Washington%2C%20DC%7CBoston
  &units=imperial
  &key={key}
"""
url = "https://maps.googleapis.com/maps/api/distancematrix/json"
def search_location(address, course_address):
    params = {
        "units": "imperial",
        "origins": address, # 02215
        "destinations": course_address,
        "travelmode": "transit",
        "key": key
    }
    # For address in passed addresses 
    # 1. Get address, request API
    # If the address is a range, pick one value
    resp = requests.get(url, params)
    try:
        resp = resp.json()
    except:
        print(f"Error with response code: {resp.status_code}, {resp.reason}")
        return None
    # 2. Check if the response is ok, if so, get duration value
    # print(resp)
    if resp["status"] == "OK":
        return (resp["rows"][0]["elements"][0]["distance"]["text"], # distance 
               resp["rows"][0]["elements"][0]["duration"]["text"])  #duration
    # Pick the address with the minimum duration



address = "140 Bay State Rd, Boston, MA"
course_address = "871 Commonwealth Ave, Boston, MA"
# print(search_location(address, course_address))

if os.getcwd().endswith("class-catcher"):
    buildings = pd.read_csv("./class-catcher-backend/data/building_addresses.csv")
else:
    buildings = pd.read_csv("./data/building_addresses.csv")
            

# Returns address of a BU building by looking it up in ./data/building_addresses.csv
# Pulled from https://www.bu.edu/summer/summer-sessions/life-at-bu/campus-resources/building-codes/
def search_building_code(code):
    if len(code) != 3:
        return None
    row = buildings[buildings["Abbreviation"] == code]
    if row.shape[0] == 0:
        return None
    return row["Address"].to_string()

# print(search_building_code("HAR"))

def process_building(s):
    if "–" in s:
        num, *rest = s.split(" ")[0]
        firstnum = num.split("–")[0]
        return firstnum + " ".join(rest)
    else:
        return s
# buildings["Address"] = buildings["Address"].apply(process_building)
# print(buildings["Address"])
# print(buildings[buildings["Abbreviation"] == "ENG"])