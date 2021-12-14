import pandas as pd
import sys
import json
import urllib
import requests


def main(csv_path):
    df = pd.read_csv(csv_path)
    baseurl = 'http://localhost'
    port = 4000
    # conn = http.client.HTTPConnection(baseurl, port)

    # print(data.to_json)
    # print(data)
    for i in range(len(df)):
        row = df.iloc[i]
        # print(row['RecipeName'])
        # headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
        headers = {"Content-type": "application/json", "Accept": "text/plain"}
        params = {'RecipeID': int(row['RecipeID']), 'RecipeName': row['RecipeName'], 'Description': row['Description'],
                  'recipeProcedure': row['recipeProcedure'].strip().split(';'),
                  'PhotoURL': row['PhotoURL'], 'Score': row['Score'],
                  'UserId': int(row['UserId']),
                  'Ingredient': row['Ingredient'].strip().split(';'),
                  'Category': row['Category'].strip().split(';'),
                  'cookTime': int(row['cookTime']),
                  'prepTime': int(row['prepTime'])
                  }
        print(params)
        res = requests.post(baseurl + ":" + str(port) + "/api/recipes", data=json.dumps(params), headers=headers)
        # POST the user
        # conn.request("POST", "/api/recipes", params, headers)
        # conn.request("POST", "/api/recipes", body=params)
        # response = conn.getresponse()
        # data = response.read()
        # d = json.loads(data)
        print("Recipe posted: ", res)


path = 'recipe.csv'
main(path)
