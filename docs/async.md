# Async Handling

Callbacks and promises living together... MASS HYSTERIA. Or not! This library handles both of your favorite async strategies.

### Promises

All our library methods return promises, so if you're a promise-fan, just do what you normally do.

```javascript
let client = new SparkPost(key);

client.templates.get(id)
  .then((data) => {
    // this the full API response body
  })
  .catch((err) => {
    // handle the sad error
  });
```

### Callbacks

If you're more of a callbacker, that works too. Pass a callback as the last argument and it'll be handled like a regular, error-first callback.

```javascript
let client = new SparkPost(key);

client.templates.get(id, (err, data) => {
  if (err) {
    // handle the sad error
    return;
  }

  // this is the full API response body
});
```
