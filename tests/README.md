# Notes on Testing

- `instanceof` checks against `FileList` do not seem to work with the Bun Test
  Runner, even while using `happy-dom`. Avoid using `foo instanceof FileList` in
  tests.
