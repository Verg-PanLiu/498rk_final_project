import pandas as pd
import sys
import json
import urllib
import requests


def main():
    baseurl = 'http://localhost'
    port = 4000
    # conn = http.client.HTTPConnection(baseurl, port)

    userIDs = []

    user_path = 'users.csv'
    recipe_path = 'recipe.csv'


    # fill users
    user_df = pd.read_csv(user_path)
    for i in range(len(user_df)):
        row = user_df.iloc[i]
        # print(row['RecipeName'])
        # headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
        headers = {"Content-type": "application/json", "Accept": "text/plain"}
        params = {'UserName': row['UserName'], 'UserPassword': row['UserPassword'], 'Gender': row['Gender'],
                  'UserId': int(row['UserId']),
                  'EmailAddress': row['EmailAddress'],
                  'RegistrationDate': row['RegistrationDate'],
                  }
        # print(params)
        res = requests.post(baseurl + ":" + str(port) + "/api/users", data=json.dumps(params), headers=headers)
        print("User posted: ", res.json())
        user_id = res.json()['data']['_id']
        print(user_id)
        userIDs.append(user_id)


    # print(data.to_json)
    # print(data)
    recipe_df = pd.read_csv(recipe_path)
    for i in range(len(recipe_df)):
        row = recipe_df.iloc[i]
        # print(row['RecipeName'])
        # headers = {"Content-type": "application/x-www-form-urlencoded", "Accept": "text/plain"}
        headers = {"Content-type": "application/json", "Accept": "text/plain"}
        params = {'RecipeName': row['RecipeName'], 'Description': row['Description'],
                  'recipeProcedure': row['recipeProcedure'].strip().split(';'),
                  'PhotoURL': row['PhotoURL'], 'Score': row['Score'],
                  'UserId': userIDs[i*i % (len(userIDs))],
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
        print("Recipe posted: ", res.json())


main()
