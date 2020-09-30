# BACKEND - NodeJs + mongoDB 
### Installation
create .env file in root folder  with Database connection (DB_CONNECT) path and Token (TOKEN) example .env file :
```sh
DB_CONNECT = 'mongodb+srv://<UserNAME>:<PASSWORD>@cluster0.c9ed4.mongodb.net/<DATABASE>?retryWrites=true&w=majority'
TOKEN = YOUR_TOKEN
```
#### 
```sh
npm install
npm start
```
### API DEPLOYED to heroku server

you can use below url to your API calls 

https://shrouded-woodland-17864.herokuapp.com



### API END POINT 

####  Register User
```sh
POST /api/user/register



---
(optional)
language - available languages : "english","japanese","chinese","french"
--

{
    "name": "Test",
    "email": "test@gmail.com",
    "password" : "password123"
    "language" : "english"
}
SUCCESSFUL RETURN :
{
    "language": "english",
    "_id": "5f6fa1db555fff57f2065314",
    "name": "Test",
    "email": "TEST@gmail.com",
    "password": "$2a$10$JuZa4Mle9ESchVZ4p5oZJONRYG8y56pxofge4Zhp8H/VEut5PzWIG",
    "date": "2020-09-26T20:17:31.812Z",
    "__v": 0
}
ERROR EXAMPLE:
Email already register
{
    "error": "Email already register"
}
wrong language
{
    "error": "Language not available"
}
Invalid password
{
    "error": "Invalid password"
}

```

####  Login 

```sh
POST /api/user/login

Body: 
{
    "email": "darekjop@gmail.com",
    "password": "darek123"
}
SUCCESSFUL RETURN :
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjZjN2JlNjcyODk3ZjRlMDEwODA3YjYiLCJpYXQiOjE2MDExOTg1ODl9.sWuGwSd2Av79tKbwdbHmc0zhwY1A41MF2Oa71ty8ax8",
    "user": {
        "language": "english",
        "_id": "5f6c7be672897f4e010807b6",
        "name": "Test",
        "email": "darekjop@gmail.com",
        "password": "$2a$10$7Zd4RDi6Qz5Z61fuQt3QiuaSAxT/twu.JDnyJxJJEHmt.6DOw02aa",
        "date": "2020-09-24T10:58:46.704Z",
        "__v": 0
    }
}
ERROR EXAMPLE:
{
    "error": "Invalid password"
}
```
#### GET USER POKEMON
REQUERIED IN HEADER: 
Authorization: TOKEN
```sh
GET /api/pokemon
REQUERIED IN HEADER: 
Authorization: TOKEN

REQUIRED HEADER: 
{
    "Authorization": "TOKEN",
}
SUCCESSFUL RETURN USER POKEMONS:
   [
    {
        "id": 6,
        "name": {
            "english": "Charizard",
            "japanese": "リザードン",
            "chinese": "喷火龙",
            "french": "Dracaufeu"
        },
        "type": [
            "Fire",
            "Flying"
        ],
        "base": {
            "HP": 78,
            "Attack": 84,
            "Defense": 78,
            "Sp. Attack": 109,
            "Sp. Defense": 85,
            "Speed": 100
        }
    }
    ]
ERROR
400  BAD REQUEST:
{
    "error": "Invalid token"
}
401  Access Denied {
Access Denied
}
```

#### GET CATALOG POKEMON from url https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json
REQUERIED IN HEADER: 
Authorization: TOKEN
```sh
GET /api/pokemon/pokedex
REQUERIED IN HEADER: 
Authorization: TOKEN

REQUIRED HEADER: 
{
    "Authorization": "TOKEN",
}
SUCCESSFUL RETURN USER POKEMONS WITH LANGUAGE OF USER REGISTER (default english) AND CHECK  IF USER HAS POKEMON (isUser: boolean):
   {
        "id": 1,
        "name": "Bulbasaur",
        "type": [
            "Grass",
            "Poison"
        ],
        "base": [
            {
                "HP": 45,
                "Attack": 49,
                "Defense": 49,
                "Sp. Attack": 65,
                "Sp. Defense": 65,
                "Speed": 45
            }
        ],
        "isUser": true
    },
ERROR
400  BAD REQUEST:
{
    "error": "Invalid token"
}
401  Access Denied {
Access Denied
}
```
####  ADD POKEMON 
REQUERIED IN HEADER: 
Authorization: TOKEN
```sh
POST api/pokemon/add/:ID_POKEMON
REQUERIED IN HEADER: 
Authorization: TOKEN
REQUIRED HEADER: 
{
    "Authorization": "TOKEN",
}
SUCCESSFUL RETURN :
  {
    "user": [
        "5f6cb7825585490e7e786e6b"
    ],
    "_id": "5f6cb8195585490e7e786e6c",
    "id": "8",
    "date": "2020-09-24T15:15:37.182Z",
    "__v": 0
}
ERROR
400  BAD REQUEST:
{
    "error": "Invalid token"
}
401  Access Denied {
Access Denied
}
```

####  DELETE POKEMON 
REQUERIED IN HEADER: 
Authorization: TOKEN
```sh
DELETE api/pokemon/delete/:ID_POKEMON
REQUERIED IN HEADER: 
Authorization: TOKEN
REQUIRED HEADER: 
{
    "Authorization": "TOKEN",
}
SUCESSFUL RETURN :
  {
    "n": 0,
    "opTime": {
        "ts": "6876706965515403282",
        "t": 3
    },
    "electionId": "7fffffff0000000000000003",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6876706965515403282",
        "signature": {
            "hash": "TQQ2PKr1X+3xvtilloWwEY+NMcw=",
            "keyId": "6875473382188515331"
        }
    },
    "operationTime": "6876706965515403282",
    "deletedCount": 0
}
ERROR
400  BAD REQUEST:
{
    "error": "Invalid token"
}

401  Access Denied {
Access Denied
}
```