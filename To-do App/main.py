from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory task list
tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add_task', methods=['POST'])
def add_task():
    task_content = request.form.get('task')
    if task_content:
        tasks.append({'content': task_content, 'completed': False})
    return jsonify({'success': True, 'tasks': tasks})

@app.route('/complete_task/<int:task_index>', methods=['POST'])
def complete_task(task_index):
    if 0 <= task_index < len(tasks):
        tasks[task_index]['completed'] = True
    return jsonify({'success': True, 'tasks': tasks})

@app.route('/delete_task/<int:task_index>', methods=['POST'])
def delete_task(task_index):
    if 0 <= task_index < len(tasks):
        del tasks[task_index]
    return jsonify({'success': True, 'tasks': tasks})

if __name__ == '__main__':
    app.run(debug=True)
