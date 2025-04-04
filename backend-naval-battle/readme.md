# Backend Naval Battle

Esta es una API en Flask para registrar y consultar los puntajes de un juego, junto con información de países.

## Requisitos
Antes de ejecutar la API, debes tener instalado Python. Luego instala las dependencias necesarias con el siguiente comando

```sh
pip install flask flask-cors requests
```

## Archivos principales
- `app.py`: Contiene la implementación de la API.
- `database/scores.json`: Almacena los puntajes de los jugadores.
- `database/countries.json`: Contiene la información de los países.

## Endpoints
### Registrar puntaje
**POST** `/score-recorder`
- Recibe un JSON con `nick_name`, `score` y `country_code`.
- Si el `nick_name` ya existe, suma los puntos. Si no, lo agrega.

Ejemplo de request:
```json
{
    "nick_name": "fbc",
    "score": 15,
    "country_code": "co"
}
```

### Obtener ranking
**GET** `/ranking`
- Retorna la lista de jugadores ordenada por puntaje de mayor a menor.

### Obtener lista de países
**GET** `/countries`
- Devuelve el contenido de `countries.json`.


## Ejecución
Para iniciar la API, ejecuta:
```sh
python app.py
```

La API correrá en `http://127.0.0.1:5000/`. Puedes probarla con herramientas como Postman o cURL.

