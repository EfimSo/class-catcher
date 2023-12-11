# Class-Catcher
Application that allows a user to pull information about courses offered at BU and add them to their Google calendar based on distance and commute length from their address.
## Presentation Recording
[Presentation Recording](https://youtu.be/U-xNm0Z-5AQ)

## Tech Stack
- Front-end: TypeScript, React, NextJS
- Back-end: Python, Flask, BeautifulSoup
- Database: SQLite, SQLAlchemy ORM
- External APIs: Google Maps API, Google Calendar API


## Important Files
- [textbox.tsx](class-catcher-frontend/src/app/textbox.tsx) - Creates the user interface of the website, handles input validation
- [login.tsx](class-catcher-frontend/src/app/login.tsx) - Uses OAuth 2.0 to handle user sign in with Google
- [server.py](class-catcher-backend/server.py) - API endpoints, database, makes calls to API wrappers
- [google_maps.py](class-catcher-backend/google_maps.py) - Searches class and addresses in data/ CSVs, calls Google Maps API
- [calendar_api.py](class-catcher-backend/calendar_api.py) - Handles authentication into Google Calendar, calls Google Calendar API
- [class_info_scraper.py](class-catcher-backend/class_info_scraper.py) - Scrapes course information from the BU Course Search website
