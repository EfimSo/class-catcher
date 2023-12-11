import datetime as dt
import os.path
import os
from dotenv import load_dotenv
import re
from dateutil import tz

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

load_dotenv()
client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
project_id = os.getenv("PROJECT_ID")

SCOPES = ["https://www.googleapis.com/auth/calendar"]

event_name = "CASCS112"
event_loc = "CGS 129, 871 Commonwealth Avenue"
event_time = "TR 11:00 am-12:15 pm"

weekday_mapping = {'MO': 0, 'TU': 1, 'WE': 2, 'TH': 3, 'FR': 4}

def get_next_weekday(start_date, target_weekdays):
    current_weekday = start_date.weekday()
    days_until_target = (min(target_weekdays) - current_weekday + 7) % 7
    return start_date + dt.timedelta(days_until_target)

def extract_times_and_weekdays(event_time):
    match = re.match(r"([A-Za-z]+) (\d+:\d+ [apm]{2})-(\d+:\d+ [apm]{2})", event_time)
    if match:
        weekdays_str, start_time, end_time = match.groups()
        weekdays_mapping = {'M': 'MO', 'T': 'TU', 'W': 'WE', 'R': 'TH', 'F': 'FR'}
        weekdays = [weekdays_mapping[day] for day in weekdays_str]
        return weekdays, start_time, end_time
    else:
        raise ValueError("Invalid input string format")

def is_week_within_break(start_date, weekdays, break_start_date, break_end_date):
    for day_str in weekdays:
        # Convert weekday string to corresponding integer
        current_day = get_next_weekday(start_date, [weekday_mapping[day_str]])
        if break_start_date <= current_day <= break_end_date:
            return True
    return False

def create_google_calendar_event(class_data):
    creds = None

    eastern_tz = tz.gettz("America/New_York")

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("secrets.json", SCOPES)
            creds = flow.run_local_server(port=0)
 
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("calendar", "v3", credentials=creds)

        # Extract start and end times and weekdays from the input string
        weekdays, start_time, end_time = extract_times_and_weekdays(event_time)

        # Get the current Eastern Time (ET) datetime
        current_et_datetime = dt.datetime.now(tz=tz.gettz("America/New_York"))

        minimum_start_date = dt.datetime(year=current_et_datetime.year + 1, month=1, day=18, tzinfo=tz.gettz("America/New_York"))

        # Calculate the start date for the next specified weekdays from the minimum_start_date
        start_date = minimum_start_date.replace(hour=0, minute=0, second=0, microsecond=0)  # Start from midnight
        weekday_mapping = {'MO': 0, 'TU': 1, 'WE': 2, 'TH': 3, 'FR': 4}
        start_date += dt.timedelta(days=(weekday_mapping[weekdays[0]] - start_date.weekday() + 7) % 7)

        # Adjust start date based on the specified weekdays
        start_date += dt.timedelta(days=(weekday_mapping[weekdays[0]] - start_date.weekday() + 7) % 7)

        # Adjust start date to the next class day after the break (March 9 to March 18)
        break_start_date = dt.datetime(year=current_et_datetime.year, month=3, day=9, tzinfo=eastern_tz)
        break_end_date = dt.datetime(year=current_et_datetime.year, month=3, day=18, tzinfo=eastern_tz)

        if is_week_within_break(start_date, weekdays, break_start_date, break_end_date):
            # If the start date is within the break, move to the next available class day
            start_date = get_next_weekday(break_end_date, weekdays)

        # Convert start and end times to datetime objects
        start_datetime = dt.datetime.strptime(start_time, "%I:%M %p")
        end_datetime = dt.datetime.strptime(end_time, "%I:%M %p")
        
        # Set the start and end times in the script and adjust for Eastern Time (5 hours behind UTC)
        start_date = start_date.replace(hour=start_datetime.hour, minute=start_datetime.minute, tzinfo=eastern_tz)
        end_date = start_date.replace(hour=end_datetime.hour, minute=end_datetime.minute, tzinfo=eastern_tz)

        # Calculate the end date for the recurrence (adjust the number of weeks as needed)
        end_date_recurrence = start_date + dt.timedelta(weeks=15)  # 15 weeks total, including the first week

        event = {
            "summary": event_name,
            "location": event_loc,
            "description": event_time,
            "colorId": 7,
            "start": {
                "dateTime": start_date.isoformat(),
                "timeZone": "America/New_York",
            },
            "end": {
                "dateTime": end_date.isoformat(),
                "timeZone": "America/New_York",  
            },
            "recurrence": [
                "RRULE:FREQ=WEEKLY;BYDAY={};INTERVAL=1;UNTIL={}".format(','.join(weekdays), end_date_recurrence.strftime('%Y%m%dT%H%M%SZ')),
            ],
        }

        event = service.events().insert(calendarId="primary", body=event).execute()

        print("Event Created {}".format(event.get('htmlLink')))

    except HttpError as error:
        print("An Error occurred:", error)
        raise
    except ValueError as error:
        print("Invalid input:", error)
        raise

if __name__ == "__main__":
    create_google_calendar_event()
