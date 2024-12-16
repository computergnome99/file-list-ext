[![JSR](https://img.shields.io/badge/jsr-f7df43?style=for-the-badge&logo=jsr&logoColor=093343)](https://jsr.io/@calvinbonner/file-list-ext)
[![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://npmjs.org/@calvinbonner/file-list-ext)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/computergnome99/file-list-ext)

# file-list-ext

`file-list-ext` is an atomic library containing only a single class:
`FileListExt`, which seeks to extend the built-in `FileList` class and provide
tools for easier reading and manipulation of `FileLists`, as well as converting
between `File`, `File[]`, and `FileList`.

> [!WARNING]
>
> Obviously, the `FileList` class is read-only for a reason. Mutating or writing
> to a `FileList` _can_ be a security risk in some cases. Please be sure that
> you are using this class carefully and considering the implications of your
> own code.

## Getting Started

To get started using `file-list-ext`, just install the package using your
preferred package manager:

<details>
  <summary>Using <b>JSR</b> Repositories</summary>

```bash
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

```bash
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

Please feel free to open an issue on GitHub or create a PR. When running the
source locally, you can run unit tests using `bun test` or `bun test --watch`.

### To-Do

The following are items on my To-Do list for this project. If you're looking to
contribute, please check this list to see if what you need is already on here.

- [x] JSDoc Coverage
- [ ] Unit Test Coverage
- [ ] Update mutating methods to avoid unnecessary array duplication (mutate
      in-place)
- [ ] Require formatting prior to commit/publish
