import requests
import os

# Cargar API Key desde una variable de entorno o config.py
API_KEY = os.getenv("OPENWEATHER_API_KEY", "9c1645d4330158bf74cdbda6fe570bad")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

def get_weather(city):
    """Obtiene el clima de una ciudad desde OpenWeatherMap."""
    url = f"{BASE_URL}?q={city}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Lanza un error si la respuesta no es 200 OK
        data = response.json()
        
        weather_info = {
            "city": city,
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
            "wind_speed": data["wind"]["speed"],
            "icon": f"https://openweathermap.org/img/wn/{data['weather'][0]['icon']}@2x.png"
        }
        return weather_info
    
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

# Prueba llamando a la función
if __name__ == "__main__":
    print(get_weather("Cali"))
