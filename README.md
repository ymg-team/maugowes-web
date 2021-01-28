# Mau Gowes Web

![maugowes.com](https://i.ibb.co/H24fYQh/Screen-Shot-2020-11-07-at-13-49-07.png)

## Development

- Please use NPM instead of Yarn
- Replace .env.example to .env
- Config available at https://github.com/ymg-team/config/blob/main/maugowes-web/.env
- install (only for first time)
  ```
  npm install
  ```
- start app with
  ```
  npm run local
  ```

## Tests

### Unit Testing

We are using https://jestjs.io/ , just run

```
npm run test
```

## Documentations

- API Docs : https://documenter.getpostman.com/view/100843/TVRrV4Qg

## Architecture

### FE Architecture

- **Flow**

  Page (Connect Redux / or Not) -> Component

### BE Architecture

- **Flow**

  Endpoint -> Handler -> ( (module a -> model a), (module b -> model a / model b / etc) )

**References :**

- https://redux.js.org/recipes/writing-tests

## Things To Learn

- Next JS 10 : https://nextjs.org/

## Colaborator

- yussan
- zmwildan
