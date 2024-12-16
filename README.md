[![JSR](https://img.shields.io/badge/jsr-f7df43?style=for-the-badge&logo=jsr&logoColor=093343)](https://jsr.io/@calvinbonner/file-list-ext)
[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://npmjs.org/@calvinbonner/file-list-ext)

# file-list-ext

`file-list-ext` is an atomic library containing only a single class: `FileListExt`, which seeks to extend the built-in `FileList` class and provide tools for easier reading and manipulation of `FileLists`, as well as converting between `File`, `File[]`, and `FileList`.

## Getting Started

To get started using `file-list-ext`, just install the package using your preferred package manager:

<details>
  <summary>Using <b>JSR</b> Repositories</summary>
  
  ``` bash
  # deno
  deno add jsr:@calvinbonner/file-list-ext --dev

  # npm
  npx jsr add @calvinbonner/file-list-ext --dev

  # pnpm
  pnpm dlx jsr add @calvinbonner/file-list-ext --dev

  # bun
  bunx jsr add @calvinbonner/file-list-ext --dev

  # yarn
  yarn dlx jsr add @calvinbonner/file-list-ext --dev
  ```

  Or, when using Deno, you can import directly from JSR without installing:

  ```ts
  import * as file_list_ext from "jsr:@calvinbonner/file-list-ext";
  ```

</details>

<details>
  <summary>Using <b>NPM</b> Repositories</summary>

  ``` bash
  # npm
  npm install @calvinbonner/file-list-ext --save-dev

  # pnpm
  pnpm add @calvinbonner/file-list-ext --save-dev

  # bun
  bun add @calvinbonner/file-list-ext --dev

  # yarn
  yarn add @calvinbonner/file-list-ext --dev
  ```
</details>

## Contributing

Please feel free to open an issue on GitHub or create a PR. When running the source locally, you can run unit tests using `bun test` or `bun test --watch`.
