import mysql.connector
import json
import os

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="quiz"
    )

def fetch_random_items(limit=5):
    connection = get_db_connection()
    cursor = connection.cursor()
    
    query = f"SELECT * FROM salquiz ORDER BY RAND() LIMIT {limit}"
    cursor.execute(query)
    rows = cursor.fetchall()
    
    cursor.close()
    connection.close()
    
    return rows

def convert_to_array_of_arrays(data):
    return [list(row) for row in data]

def save_to_json(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

if __name__ == "__main__":
    file_path = os.path.join('quiz', 'static', 'question.json')
    items = fetch_random_items()
    array_of_arrays = convert_to_array_of_arrays(items)
    save_to_json(array_of_arrays, file_path)
    print(f"Data saved to {file_path}")
