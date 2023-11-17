from dotenv import load_dotenv
import requests
import os

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

params = {
    "units": "imperial",
    "origins": "140 Bay State Rd, Boston, MA", # 02215
    "destinations": "871 Commonwealth Ave, Boston, MA",
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
# 2. Check if the response is ok, if so, get duration value
print(resp)
if resp["status"] == "OK":
    print(resp["rows"][0]["elements"][0]["duration"])#["text"]) # OR # ["value"]
# Pick the address with the minimum duration



