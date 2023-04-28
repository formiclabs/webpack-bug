# Steps to reproduce

## 1. Install dependencies

`cd books-service && npm install` then `cd gateway && npm install`

## 2. Compile & run books service

``` shell
cd books-service
npm run webpack
node dist/index.js
```

Will bind to port `4000`

## 4. Compile & run gateway

``` shell
cd gateway
npm run webpack
node dist/index.js
```

Will bind to port `4001`

## 5. Hit the mutation on the gateway

Navigate to `http://localhost:4001` and create a mutation against `addBook`.

Alternatively, this curl should do it:

``` shell
curl --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4001/ \
    --data '{"query":"mutation Mutation($book: BookInput!) {\n  addBook(book: $book) {\n    author\n    title\n  }\n}","variables":{"book":{"author":"a","title":"t"}}}' | jq
```

**Expected behavior**: should return a `200` with an empty `data` field like this:

``` json
{
  "data": {
    "addBook": null
  }
}
```

Instead, it errors out with an invalid signature error such as this:

``` json
{
  "errors": [
    {
      "message": "Expected BookInput to be a GraphQL nullable type.",
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "stacktrace": [
          "Error: Expected BookInput to be a GraphQL nullable type.",
          "    at t.devAssert (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:908657)",
          "    at new F (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:936793)",
          "    at e (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:989183)",
          "    at /home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:905991",
          "    at t.getVariableValues (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:906849)",
          "    at /home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:383674",
          "    at e.with (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:579891)",
          "    at e.with (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:580943)",
          "    at e.startActiveSpan (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:583455)",
          "    at e.startActiveSpan (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:583753)",
          "    at T.validateIncomingRequest (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:383521)",
          "    at /home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:370765",
          "    at e.with (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:579891)",
          "    at e.with (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:580943)",
          "    at e.startActiveSpan (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:583455)",
          "    at e.startActiveSpan (/home/luchini/repos/experiments/webpack-bug/gateway/dist/index.js:2:583753)"
        ]
      }
    }
  ]
}
```

---

# Sanity checks

## A) Run same query against books service

Navigate to `http://localhost:4000` and create a mutation against `addBook`.

Alternatively, this curl should do it:

``` shell
curl --request POST \
    --header 'content-type: application/json' \
    --url http://localhost:4000/ \
    --data '{"query":"mutation Mutation($book: BookInput!) {\n  addBook(book: $book) {\n    author\n    title\n  }\n}","variables":{"book":{"author":"a","title":"t"}}}' | jq
```

Books service should work as expected above. This is proof that the underlying
service is working and that the gateway should did not rout the mutation request
to the service.

## B) Run gateway in our development config

Replace step 4 above with:

``` shell
cd gateway
npm run webpack:dev
node dist/index.js
```

Try step 5 above again against the new gateway running on port `4001` and
it will work as expected.