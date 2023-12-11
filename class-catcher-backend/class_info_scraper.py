import requests
from bs4 import BeautifulSoup

#Test case
str_value = "CASCS111"

#
def search_course(str_value):
    #intialize empty arrays to hold specific class information
    prof_list = []
    loc_list = []
    building_list = []
    sec_list = []
    time_list = []
    address_list = []

    #First URL to navigate to
    URL1 = "https://www.bu.edu/phpbin/course-search/section/?t={}&semester=2024-SPRG&return=%2Fphpbin%2Fcourse-search%2Fsearch.php%3Fpage%3Dw0%26pagesize%3D10%26adv%3D1%26nolog%3D%26search_adv_all%3DCAS%2BCS%2B111%26yearsem_adv%3D2024-SPRG%26credits%3D%2A%26pathway%3D%26hub_match%3Dall%26pagesize%3D10".format(str_value)
    page1 = requests.get(URL1)

    soup1 = BeautifulSoup(page1.content, "html.parser")

    tables1 = soup1.find_all("table")

    #Iterate through the table of information
    for table in tables1:
        rows = table.find_all("tr")
        for row in rows:
            cells = row.find_all("td")
            if len(cells) >= 8:
                course_section = cells[0].text.strip()
                professor_name = cells[2].text.strip()
                sec_type = cells[3].text.strip()
                course_location = cells[4].text.strip()
                course_time = cells[5].text.strip()
                # Makes sure there is a valid staff member
                if professor_name != "Staff":
                    # Makes sure only lectures are added
                    if sec_type == "LEC":
                        sec_list.append(course_section)
                        prof_list.append(professor_name)
                        time_list.append(course_time)
                        building_list.append(course_location.split()[0])
                        loc_list.append(course_location)

    #If the course isn't available or invalid
    if len(sec_list) == 0:
        print("Course Not Found.")

    #Second URL to navigate (Gets the actual address of the buildings)
    URL2 = "https://www.bu.edu/summer/summer-sessions/life-at-bu/campus-resources/building-codes/"
    page2 = requests.get(URL2)

    soup = BeautifulSoup(page2.content, "html.parser")

    tables2 = soup.find_all("table")

    #Go through the each building in the list
    for i in building_list:
        # Iterate through the table of buildings and addresses
        for table in tables2:
            rows = table.find_all("tr")
            for row in rows:
                cells = row.find_all("td") 
                if len(cells) >= 3:
                    building = cells[0].text.strip()
                    course_address = cells[2].text.strip()
                    # If the current building in the table matches the one we're searching for
                    if i == building:
                        # Add the actual address of the building to the array
                        address_list.append(course_address)
    # print(sec_list)
    # print(prof_list)
    # print(loc_list)
    # print(time_list)
    # print(address_list)

    # Return all the course information
    return {
        "sections": sec_list,
        "professors": prof_list,
        "locations": loc_list,
        "times": time_list,
        "addresses": address_list
    }
if __name__ == "__main__":
    print(search_course(str_value))