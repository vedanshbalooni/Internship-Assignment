from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# OpenWeatherMap API Key (replace with your own)
api_key = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={API key}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_weather', methods=['POST'])
def get_weather():
    city = request.form.get('city')
    
    if city:
        weather_data = fetch_weather(city)
        return jsonify(weather_data)

    return jsonify({'error': 'City not provided'})

def fetch_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:
        weather_info = {
            'city': data['name'],
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon']
        }
        return weather_info
    else:
        return {'error': 'Failed to fetch weather information'}

if __name__ == '__main__':
    app.run(debug=True)