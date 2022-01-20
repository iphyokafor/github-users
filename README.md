# git-users

Search for GitHub users by the programming language they use in their public repository

## Example request

```
curl -X GET localhost:3030/users/go
```

Limit the results to 20

```
curl -X GET localhost:3030/users/haskell?limit=20
```

### Running the service

```
npm run dev
```

### Run tests

```
npm test
```

The Oath token in the config files can be filled optionally to avoid being rate limited.
