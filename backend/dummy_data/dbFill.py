import pandas as pd
import sys
import json
import urllib
import http.client


def main(csv_path):
    df = pd.read_csv(csv_path)
    baseurl = 'localhost'
    port = 4000
    conn = http.client.HTTPConnection(baseurl, port)

    # print(data.to_json)
    # print(data)
    for i in range(len(df)):
        row = df.iloc[i]
        # print(row['RecipeName'])
        headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
        params = urllib.parse.urlencode(
            {'RecipeID': row['RecipeID'], 'RecipeName': row['RecipeName'], 'Description': row['Description'], 'recipeProcedure': row['recipeProcedure'], 'PhotoURL': row['PhotoURL'], 'Score': row['Score'], 'UserId': row['UserId'],
             'Ingredient': row['Ingredient'].strip().split(';'),
             'Category': row['Category'].strip().split(';'),
             'cookTime': row['cookTime'],
             'prepTime': row['prepTime'],
             })

        # POST the user
        conn.request("POST", "/api/recipes", params, headers)
        # conn.request("POST", "/api/recipes", body=params)
        response = conn.getresponse()
        data = response.read()
        d = json.loads(data)
        print("Recipe posted: ", d)


path = 'recipe.csv'
main(path)
