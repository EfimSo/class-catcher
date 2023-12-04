interface request {
    name: string,
    address: string,
    transportMode: string
}

// Name is a string with the College, Course Department and Course number fields

const example_request = 
    {
        "name": "CAS CS 350",
        "address": "123 Example St", // OR "Warren Towers", will have hardcoded values for big dorms
        "transportMode": "transit"
    }

interface response {
    name: string,
    time: string,
    building: string,
    distance: string,
    commute_length: string,
    professor: string
}

const example_response = 
    {
        'name': "CAS CS 350",
        'time': "MWF 10:10 am-11:00 am",
        'building': "CGS",
        'distance': "10 miles",
        'commute_length': "5 min",
        'professor': "James Johnson"
    }