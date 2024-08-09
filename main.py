from flask import Flask

app = Flask(__name__,template_folder='quiz/templates',static_folder='quiz/static')
from quiz.routes import *
if __name__ == '__main__':
    app.run(debug=True)
