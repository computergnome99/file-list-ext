function blockRootPublish() {
  console.error(
    'Please do not publish this package using the default "npm publish" command.\n\nInstead, please run the "publish" script (e.g., "bun run publish")',
  );
  process.exit(1);
}

blockRootPublish();
