from flask import render_template
from main import app
from config import get_db_connection
import mysql.connector


@app.route("/quiz", methods=["GET", "POST"])
def quiz_get():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        cursor.execute('SELECT * FROM salquiz') 
        items = cursor.fetchall()
    except mysql.connector.Error as err:
        print(f"Erro ao consultar a tabela: {err}")
        items = []
    finally:
        cursor.close()
        connection.close()
    
    return render_template("salcity.html", items=items)
