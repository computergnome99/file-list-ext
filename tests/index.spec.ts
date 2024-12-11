import { beforeEach, describe, expect, test } from "bun:test";
import { FileListExt } from "../src";

function createNewFile(name: string = "example.txt"): File {
  return new File(["test"], name, { type: "text/plain" });
}

describe("FileListExt", () => {
  describe("Create from an Array of Files", () => {
    let arrayOfFiles: File[];
    let arrayLength: number;

    beforeEach(() => {
      arrayOfFiles = [];
      arrayLength = 1 + Math.floor(Math.random() * 8);

      for (let i = 0; i < arrayLength; i++) {
        arrayOfFiles.push(createNewFile());
      }
    });

    test("Using the constructor", () => {
      const subject = new FileListExt(arrayOfFiles);

      expect(subject.toArray()).toEqual(arrayOfFiles);
      expect(subject.length).toBe(arrayLength);
    });

    test("Using `fromArray()`", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.toArray()).toEqual(arrayOfFiles);
      expect(subject.length).toBe(arrayLength);
    });
  });

  describe("Create from a FileList", () => {
    let listLength: number;
    let fileList: FileList;

    beforeEach(() => {
      const dt = new DataTransfer();
      listLength = 1 + Math.floor(Math.random() * 8);
      for (let i = 0; i < listLength; i++) {
        dt.items.add(createNewFile());
      }

      fileList = dt.files;
    });

    test("Using the constructor", () => {
      const subject = new FileListExt(fileList);

      expect(subject.toFileList()).toEqual(fileList);
      expect(subject.length).toBe(listLength);
    });

    test("Using `fromFileList()`", () => {
      const subject = FileListExt.fromFileList(fileList);

      expect(subject.toFileList()).toEqual(fileList);
      expect(subject.length).toBe(listLength);
    });
  });

  describe("Create from a File", () => {
    test("Using the constructor", () => {
      const file = createNewFile();
      const subject = new FileListExt(file);

      expect(subject.length).toBe(1);
      expect(subject[0]).toEqual(file);
    });
  });

  describe("Convert to an Array of Files", () => {
    let fileList: FileList;
    let arrayOfFiles: File[];
    let listLength: number;

    beforeEach(() => {
      arrayOfFiles = [];
      const dt = new DataTransfer();
      listLength = 1 + Math.floor(Math.random() * 8);
      for (let i = 0; i < listLength; i++) {
        const file = createNewFile();

        arrayOfFiles.push(file);
        dt.items.add(file);
      }

      fileList = dt.files;
    });

    test("From Array using `toArray()`", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.toArray()).toEqual(arrayOfFiles);
    });

    test("From FileList using `toArray()`", () => {
      const subject = FileListExt.fromFileList(fileList);

      expect(subject.toArray()).toEqual(arrayOfFiles);
    });

    test("From File using `toArray()`", () => {
      const file = arrayOfFiles[0];

      const subject = new FileListExt(file);

      expect(subject.toArray()).toEqual([file]);
    });
  });

  describe("Convert to a FileList", () => {
    let fileList: FileList;
    let arrayOfFiles: File[];
    let listLength: number;

    beforeEach(() => {
      arrayOfFiles = [];
      const dt = new DataTransfer();
      listLength = 1 + Math.floor(Math.random() * 8);
      for (let i = 0; i < listLength; i++) {
        const file = createNewFile();

        arrayOfFiles.push(file);
        dt.items.add(file);
      }

      fileList = dt.files;
    });

    test("From Array using `toFileList()`", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.toFileList()).toEqual(fileList);
    });

    test("From FileList using `toFileList()`", () => {
      const subject = FileListExt.fromFileList(fileList);

      expect(subject.toFileList()).toEqual(fileList);
    });

    test("From File using `toFileList()`", () => {
      const file: File = arrayOfFiles[0];

      const subject = new FileListExt(file);

      expect(subject.toFileList().length).toEqual(1);
    });
  });

  describe("Adding files to an existing object", () => {
    let arrayOfFiles: File[];
    let arrayLength: number;
    let additionalFile: File;
    let additionalArrayOfFiles: File[];
    let additionalArrayLength: number;

    beforeEach(() => {
      arrayOfFiles = [];
      additionalArrayOfFiles = [];
      arrayLength = 1 + Math.floor(Math.random() * 8);
      additionalArrayLength = 1 + Math.floor(Math.random() * 8);

      for (let i = 0; i < arrayLength; i++) {
        arrayOfFiles.push(createNewFile());
      }

      for (let i = 0; i < additionalArrayLength; i++) {
        additionalArrayOfFiles.push(createNewFile());
      }

      additionalFile = createNewFile("additional-file.txt");
    });
    test("Using `push()` with a File", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.length).toBe(arrayLength);

      subject.push(additionalFile);

      expect(subject.length).toBe(arrayLength + 1);
      expect(subject[arrayLength]).toEqual(additionalFile);
    });

    test("Using `push()` with multiple Files", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.length).toBe(arrayLength);

      subject.push(additionalFile, additionalFile);

      expect(subject.length).toBe(arrayLength + 2);
      expect(subject[arrayLength]).toEqual(additionalFile);
      expect(subject[arrayLength + 1]).toEqual(additionalFile);
    });

    test("Using `push()` with an Array of Files", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.length).toBe(arrayLength);

      subject.push(...additionalArrayOfFiles);

      expect(subject.length).toBe(arrayLength + additionalArrayLength);
      expect(subject[arrayLength - 1]).toEqual(arrayOfFiles[arrayLength - 1]);
      expect(subject[arrayLength + additionalArrayLength - 1]).toEqual(
        additionalArrayOfFiles[additionalArrayLength - 1],
      );
    });

    test("Using `unshift()` with a File", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.length).toBe(arrayLength);

      subject.unshift(additionalFile);

      expect(subject.length).toBe(arrayLength + 1);
      expect(subject[0]).toEqual(additionalFile);
    });

    test("Using `unshift()` with multiple Files", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.length).toBe(arrayLength);

      subject.unshift(additionalFile, additionalFile);

      expect(subject.length).toBe(arrayLength + 2);
      expect(subject[0]).toEqual(additionalFile);
      expect(subject[1]).toEqual(additionalFile);
    });

    test("Using `unshift()` with an Array of Files", () => {
      const subject = FileListExt.fromArray(arrayOfFiles);

      expect(subject.length).toBe(arrayLength);

      subject.unshift(...additionalArrayOfFiles);

      expect(subject.length).toBe(arrayLength + additionalArrayLength);
      expect(subject[0]).toEqual(additionalArrayOfFiles[0]);
      expect(subject[additionalArrayLength - 1]).toEqual(arrayOfFiles[0]);
    });
  });
});
