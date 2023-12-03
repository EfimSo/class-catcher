interface request {
    name: string,
    address: string,
    transportMode: string
}

const example_request = 
    {
        "name": "CAS CS 350 A1",
        "address": "123 Example St. OR Warren Towers",
        "transportMode": "transit"
    }

interface response {
    name: string,
    time: string,
    building: string,
    distance: number,
    commute_length: number,
    professor: string
}

// will have established units for distrance and commute_length that will be the same every time
const example_response = 
    {
        'name': "CAS CS 350 A1",
        'time': "MWF 10:10 am-11:00 am",
        'building': "CGS",
        'distance': 10,
        'commute_length': 5,
        'professor': "James Johnson"
    }