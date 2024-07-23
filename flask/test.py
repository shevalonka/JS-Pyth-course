import requests

response = requests.post("http://localhost:5000/paste", json={"HOLA": "Is that you?"})
print(response.json())