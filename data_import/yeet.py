import requests
import json
import codecs

not_json = open("temporary-data-ingest/csvjson.json")
data = json.load(not_json)
url = "https://api.grantr.app/update"


for entry in data:

  payload = json.dumps({
    "id": entry["name"],
    "name": entry["name"],
    "organization_id": "",
    "status": entry["Status"],
    "min_amount": "",
    "max_amount": "",
    "tags": "",
    "description": entry["Description"],
    "website": entry["Website"],
    "ecosystem": entry["Ecosystem"],
    #"application_uli:entry["Apply Now"],"
    "socials": {
      "Discord": entry["Discord"],
    },
  })
  headers = {
    'Authorization': 'Bearer thissecretisverysecretandyouarereadingthis',
    'Content-Type': 'application/json'
  }

  print(payload)
  # response = requests.request("POST", url, headers=headers, data=payload)

  # print(response.text)
