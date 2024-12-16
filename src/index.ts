/**
 * A more flexible version of `FileList` which includes extra utilities for
 * manipulating the list of contained files.
 */
export class FileListExt implements Iterable<File> {
  /** @ignore */
  private _length = 0;

  /**
   * Create a new `FileListExt` instance using a `FileList` object as the basis.
   *
   * @param {FileList} files The standard `FileList` object to build the new
   * instance from.
   * @returns A new `FileListExt` instance containing the `File` objects within
   * the original `FileList`.
   *
   * @example
   * const fileList = document.getElementById('input').files;
   * const fileListExt = FileListExt.fromFileList(fileList);
   */
  static fromFileList(files: FileList): FileListExt {
    return new FileListExt(files);
  }

  /**
   * Create a new `FileListExt` instance using an `Array` of `File` objects as
   * the basis.
   *
   * @param {File[]} files The `File[]` reference to build the new instance
   * from.
   * @returns A new `FileListExt` instance containing the `File` objects within
   * the original `Array`.
   *
   * @example
   * const file1 = new File(['Hello'], 'example-1.txt', { type: 'text/plain' });
   * const file2 = new File(['World'], 'example-2.txt', { type: 'text/plain' });
   *
   * const files = [file1, file2];
   *
   * const fileListExt = FileListExt.fromArray(files);
   */
  static fromArray(files: File[]): FileListExt {
    return new FileListExt(files);
  }

  constructor(...files: (FileList | File | File[])[]) {
    files.forEach((item) => {
      if (item instanceof FileList) {
        for (let i = 0; i < item.length; i++) {
          const file = item.item(i);
          if (!file) continue;
          this.push(file);
        }
      } else if (item instanceof File) {
        this.push(item);
      } else {
        this.push(...item);
      }
    });
  }

  /** @ignore */
  [Symbol.iterator](): Iterator<File> {
    let index = 0;
    const files = this.toArray();
    return {
      next(): IteratorResult<File> {
        if (index < files.length) {
          return { value: files[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }

  [index: number]: File;

  /**
   * The length or total number of `File` objects contained in this list.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   * console.log(fileList.length);   // 3
   */
  get length(): number {
    return this._length;
  }

  /**
   * Converts this list into a standard `FileList` object for use in native
   * browser APIs and other areas where `FileList` may be the expected type.
   *
   * @returns {FileList} A new `FileList` containing the `File` objects in this
   * list.
   *
   * @example
   * const fileListExt = new FileListExt(...[file1, file2, file3]);
   * const fileList = fileListExt.toFileList();
   * console.log(fileList instanceof FileList);   // true
   */
  toFileList(): FileList {
    const dt = new DataTransfer();
    this.toArray().forEach((file) => dt.items.add(file));
    return dt.files;
  }

  /**
   * Converts this list into an `Array` of `File` objects. Useful when native
   * array utilities are required beyond what is offered within the class
   * directly.
   *
   * @returns {File[]} A new `Array` of `File` objects based on the objects in
   * this list.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   * const array = fileList.toArray();
   * console.log(array instanceof Array);   // true
   */
  toArray(): File[] {
    const files: File[] = [];
    for (let i = 0; i < this._length; i++) {
      files.push(this[i]);
    }

    return files;
  }

  /**
   * Appends new `File` objects to the end of the list, and returns the new
   * length of the list.
   *
   * @param {...File} files A single `File` or multiple `Files`, separated as
   * multiple parameters or passed as an array using the "spread" syntax.
   *
   * @returns {number} The new number of `File` objects within the list.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2]);
   * console.log(fileList.length);   // 2
   *
   * const newLen = fileList.push(file3);
   * console.log(fileList.length, newLen);   // 3, 3
   */
  push(...files: File[]): number {
    files.forEach((file) => {
      this[this._length] = file;
      this._length++;
    });

    new Array().push;

    return this.length;
  }

  /**
   * Removes the last `File` object from the list and returns it. If the list is
   * empty, `undefined` is returned and the list is not modified.
   *
   * @returns {File | void} The removed, last `File` object in the list if
   * available. Otherwise, `undefined`.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   * const lastItem = fileList.pop();
   *
   * console.log(fileList.length);   // 2
   * console.log(lastItem instanceof File);   // true
   */
  pop(): File | void {
    if (this._length === 0) return;

    const lastFile = this[this._length - 1];
    delete this[this._length - 1];
    this._length--;

    return lastFile;
  }

  // TODO: Avoid creating a new array here,
  // consider an implementation more like pop() above.
  /**
   * Removes the first `File` object from the list and returns it. If the list
   * is empty, `undefined` is returned and the list is not modified.
   *
   * @returns {File | void} The removed, first `File` object in the list if
   * available. Otherwise, `undefined`.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   * const firstItem = fileList.shift();
   *
   * console.log(fileList.length);   // 2
   * console.log(firstItem instanceof File);   // true
   */
  shift(): File | void {
    if (this._length === 0) return;

    const arr = this.toArray();
    const firstFile = arr.shift();
    delete this[this._length - 1];
    arr.forEach((file, index) => {
      this[index] = file;
    });
    this._length = arr.length;

    return firstFile;
  }

  /**
   * Inserts new `File` objects at the start of the list, and returns the new
   * length of the list.
   *
   * @param {...File} files A single `File` or multiple `Files`, separated as
   * multiple parameters or passed as an array using the "spread" syntax.
   *
   * @returns {number} The new number of `File` objects within the list.
   *
   * @example
   * const fileList = new FileListExt(...[file2, file3]);
   * const newLen = fileList.unshift(file3);
   *
   * console.log(fileList.length, newLen);   // 3, 3
   */
  unshift(...files: File[]): number {
    const arr = this.toArray();
    const newFiles = arr.unshift(...files);
    arr.forEach((file, index) => {
      this[index] = file;
    });
    this._length = arr.length;

    return newFiles;
  }

  /**
   * Combines two or more lists. This method returns a new list without
   * modifying any existing lists.
   *
   * @param {...FileListExt | File | File[]} items Additional lists and/or
   * `File` objects to add to the end of the array.
   *
   * @returns {FileListExt} A new list including all items or lists combined.
   *
   * @example
   * const fileList1 = new FileListExt(...[file1, file2]);
   * const fileList2 = new FileListExt(...[file3, file4]);
   *
   * const fileList3 = fileList1.concat(fileList2, file5);
   */
  concat(...items: (FileListExt | File | File[])[]): FileListExt {
    const fileArrays: File[][] = [];

    items.forEach((item) => {
      if (item instanceof FileListExt) fileArrays.push(item.toArray());
      if (item instanceof Array) fileArrays.push(item);
      if (item instanceof File) fileArrays.push([item]);
    });

    return FileListExt.fromArray(this.toArray().concat(...fileArrays));
  }

  /**
   * Performs the specified action for each `File` object in the list.
   *
   * @param callbackfn A function that accepts up to three arguments.
   * `forEach()` calls the `callbackfn` function one time for each `File` in the
   * list.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   *
   * fileList.forEach((file, index) => {
   *  console.log(file, index);
   * });
   */
  forEach(
    callbackfn: (file?: File, index?: number, array?: File[]) => void
  ): void {
    this.toArray().forEach(callbackfn);
  }

  /**
   * Returns the `File` objects of the list that meet the condition specified in
   * a callback function.
   *
   * @param predicate A function that accepts up to three arguments. The
   * `filter()` method calls the function one time for each `File` in the list.
   *
   * @returns A new `FileListExt` instance as filtered by the provided function.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   *
   * // standard implementation
   * const filteredList = fileList.filter((file, index) => {
   *  if (file.name.endswith('.txt') || index === 0) {
   *    return true;
   *  } else {
   *    return false;
   *  }
   * });
   *
   * // more shorthand implementation
   * const altFilteredList = fileList.filter((file) => file.name.endswith('.txt'));
   */
  filter(
    predicate: (file?: File, index?: number, array?: File[]) => boolean | void
  ): FileListExt {
    return FileListExt.fromArray(this.toArray().filter(predicate));
  }

  /**
   * Returns the value of the first `File` object in the list where the provided
   * predicate is true, and `undefined` otherwise.
   *
   * @param predicate Called once for each `File` in the list, in ascending
   * order, until the predicate returns `true`. If an element is found, the
   * `File` is immediately returned. Otherwise, `undefined`.
   *
   * @returns {File | void} The first `File` to match the provided predicate, or
   * `undefined` if no such `File` exists.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   *
   * const match = fileList.find((file) => file.name.endswith('.txt'));
   */
  find(
    predicate: (file?: File, index?: number, array?: File[]) => boolean
  ): File | void {
    return this.toArray().find(predicate);
  }

  /**
   * Determines whether the list includes a certain `File`, returning `true` or
   * `false` accordingly.
   *
   * @param {File} file The `File` object to search for.
   *
   * @param {number} fromIndex The position in the list at which to begin
   * searching for the `File`.
   *
   * @returns {boolean} A boolean value; `true` if a matching `File` is found, `false`
   * otherwise.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   *
   * const hasMatch = fileList.includes((file) => file.name.endswith('.txt'));
   */
  includes(file: File, fromIndex?: number): boolean {
    return this.toArray().includes(file, fromIndex);
  }

  /**
   * Returns a copy of a section of the list.
   *
   * _Note: For both `start` and `end`, a negative index can be used to indicate
   * an offset from the end of the list. For example, `-2` refers to the second
   * to last element of the array._
   *
   * @param {number | undefined} start The beginning index of the specified portion of the list. If
   * `start` is `undefined`, then the slice begins at index `0`.
   *
   * @param {number | undefined} end The end index of the specified portion of the list. This is
   * exclusive of the `File` at the index 'end'. If `end` is `undefined`, then
   * the slice extends to the end of the list.
   *
   * @returns {FileListExt} A copied portion of the current list as a new `FileListExt`
   * instance.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3, file4]);
   *
   * const firstHalf = fileList.slice(0, 1);
   * const dropEnds = fileList.slice(1, -1);
   */
  slice(start?: number, end?: number): FileListExt {
    return FileListExt.fromArray(this.toArray().slice(start, end));
  }

  /**
   * Sorts the list in place. This method mutates the list and returns a
   * reference to the same list.
   *
   * @param compareFn Function used to determine the order of the objects. It
   * is expected to return a negative value if the first argument is less than
   * the second argument, zero if they're equal, and a positive value otherwise.
   * If omitted, the `File` objects are sorted in ascending, ASCII character
   * order.
   *
   * @returns {FileListExt} A reference to the same list the method was run on.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   *
   * fileList.sort((a, b) => {
   *  if (a.size === b.size) {
   *    return 0;
   *  } else if (a.size < b.size) {
   *    return -1;
   *  } else {
   *    return 1;
   *  }
   * })
   */
  sort(compareFn?: (a: File, b: File) => number): FileListExt {
    const sortedArray = this.toArray().sort(compareFn);

    sortedArray.forEach((file, index) => {
      this[index] = file;
    });

    return this;
  }

  /**
   * Reverses the elements in an array in place. This method mutates the array
   * and returns a reference to the same array.
   *
   * @returns {FileListExt} A reference to the same list the method was run on.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   *
   * fileList.reverse();
   */
  reverse(): FileListExt {
    const reversedArray = this.toArray().reverse();

    reversedArray.forEach((file, index) => {
      this[index] = file;
    });

    return this;
  }

  /**
   * Returns the index of the first occurrence of a `File` in the list, or -1 if
   * it is not present.
   *
   * @param {File} file The `File` to locate in the list.
   *
   * @returns The index of the first occurrence of the `File`, or -1 if it is
   * not present.
   *
   * @example
   * const fileList = new FileListExt(...[file1, file2, file3]);
   *
   * console.log(fileList.indexOf(file1));   // 0
   */
  indexOf(file: File): number {
    return this.toArray().indexOf(file);
  }
}
