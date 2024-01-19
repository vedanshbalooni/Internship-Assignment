from flask import Flask, render_template, request, redirect, url_for
from flask_pymongo import PyMongo
from datetime import datetime

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/expense_tracker'
mongo = PyMongo(app)

@app.route('/')
def index():
    expenses = mongo.db.expenses.find()
    return render_template('index.html', expenses=expenses)

@app.route('/add_expense', methods=['POST'])
def add_expense():
    description = request.form['description']
    category = request.form['category']
    amount = float(request.form['amount'])

    new_expense = {
        'description': description,
        'category': category,
        'amount': amount,
        'date': datetime.utcnow()
    }

    mongo.db.expenses.insert_one(new_expense)

    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)