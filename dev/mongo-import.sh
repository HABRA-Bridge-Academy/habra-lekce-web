#!/bin/sh

# Check if the collection is empty
if [ $(mongosh mongo:27017/habra --quiet --eval "db.articles.countDocuments({})") -eq 0 ]
then
  # Import the data if the collection is empty
  mongoimport --uri="mongodb://mongo:27017/habra" --collection articles --type json --file /articles.json
  echo "Data imported successfully."
else
  echo "Data already present, skipping import."
fi
