# Para iniciar o backend

### `cd backend`
### `yarn`
### `yarn run build`
### `docker-compose up`


Para cadastrar clientes, fazer requisião POST para `http://localhost:3333/customer` e  enviar no corpo da requição
```JSON
{
	"name": "Fulano"
}
```
o retorno deve ser algo como
```JSON
{
  "name": "Fulano",
  "created_at": "2020-09-24T00:19:12.221Z",
  "updated_at": "2020-09-24T00:19:12.221Z",
  "id": "5f6be6004ba8ce436a65d6bd"
}
```


Para cadastrar os débitos de um cliente fazer solicitação POST para `http://localhost:3333//debt` e enviar no corpo da requisição
```JSON
{
	"date": "2020-09-21",
	"customerId": "5f6be6004ba8ce436a65d6bd",
	"items": [
		{
			"value": 900
		},
		{
			"value": 200
		},
		{
			"value": 199
		}
	]
}
```
o retorno deve ser algo como
```JSON
{
  "date": "2020-09-21",
  "customer": {
    "id": "5f6be6004ba8ce436a65d6bd",
    "name": "Fulano",
    "created_at": "2020-09-24T00:19:12.221Z",
    "updated_at": "2020-09-24T00:19:12.221Z"
  },
  "items": [
    {
      "value": 900
    },
    {
      "value": 200
    },
    {
      "value": 199
    }
  ],
  "created_at": "2020-09-24T00:23:30.913Z",
  "updated_at": "2020-09-24T00:23:30.913Z",
  "id": "5f6be7024ba8ceb45f65d6be"
}
```

# Para iniciar o frontend

### `cd frontend`
### `yarn`
### `yarn start`

Acessar em `http://localhost:3000`.