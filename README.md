<!-- DELETE EVERYTHING ABOVE THIS LINE -->

# Coinserver Description

This package exposes endpoints and provides a web interface to emulate random chance coin flip events in the following ways:

1. Flip one coin - returns result of a coin flip
2. Flip many coins - returns the results of many coin flips with a summary
3. Guess a coin flip and - returns the result of a flip and guess match

# Coinserver Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation
```
node server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help, -h	Return this message and exit.
```

# Coinserver API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flip/
```

#### Response body

```
{"flip":"tails"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 16
ETag: W/"10-N9e0DDykqBPnqphc8f4bzHcjsuM"
Date: Wed, 27 Apr 2022 13:19:47 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flips/:number/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flips/#
curl http://localhost:5000/app/flips/20
```

#### Response body

```
{"raw":["tails","heads","heads","heads","heads","tails","tails","tails","tails","heads","tails","heads","heads","tails","tails","tails","tails","tails","heads","tails"],"summary":{"heads":8,"tails":12}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 202
ETag: W/"ca-Rm514mjAgJk8YLzaMk88KJXtWWo"
Date: Wed, 27 Apr 2022 13:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coin/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/flip/call/:guess/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/flip/call/:(tails|heads)     
```

#### Response body

```
"{ call: 'tails', flip: 'tails', result: 'win' }"
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 49
ETag: W/"31-qrqFbaPN2Vl+EtCfO5BDtd1fDPA"
Date: Wed, 27 Apr 2022 13:28:52 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"text":"heads"}' http://localhost:5000/app/flip/call/
```

#### Response body

```
"{ call: 'heads', flip: 'tails', result: 'lose' }" 
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 17
ETag: W/"11-5UAwMS/28TalFbwwxmM2omgb8bM"
Date: Wed, 27 Apr 2022 13:50:22 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5000/app/flip/coins/

```

#### Response body

```
{"raw":["tails","tails","heads","tails","heads","heads","tails","tails","heads","heads","tails","heads","tails","tails","heads","tails","heads","heads","tails","heads","heads","tails","tails","tails","heads","heads","tails","heads","tails","tails"],"summary":{"heads":14,"tails":16}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-+afuo5o88z+mv6Zuxx3fVWbOQHk"
Date: Wed, 27 Apr 2022 13:54:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```

### /app/log/access/ (GET)

#### Request cURL

```

```

#### Response body

```

```

#### Response headers

```

```
