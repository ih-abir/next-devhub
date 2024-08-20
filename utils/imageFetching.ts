import { writeFileSync, readdir, mkdirSync, existsSync, unlink } from "fs";
import * as path from 'path';
import * as http from "http";
import * as https from "https";
import * as stream from "stream";
import fetch from "node-fetch";

import dotenv from "dotenv";
dotenv.config({ path: './.env' });

const url =  process.env.ASSETS_URL;

const Stream = stream.Transform;

const directory = './public/uploads/';

// Check if the directory exists or create
if (!existsSync(directory)) {
  mkdirSync(directory);
}

// Read & Clean Directory
readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    unlink(path.join(directory, file), err => {
      if (err) throw err;
    });
  }
});

// Download Image Helper Function
const downloadImageFromURL = (url: string, filename: string, path: string) => {
  let client: typeof http | typeof https = http;
  if (url.toString().indexOf("https") === 0) {
    client = https;
  }

  client
    .request(url, function (response) {
      let data = new Stream();

      response.on("data", function (chunk) {
        data.push(chunk);
      });

      response.on("end", function () {
        writeFileSync(path + filename, data.read());
      });
    })
    .end();
};

export interface Type {
  data : any;
  url: string;
  hash: string;
  ext: string;
  length: number;
  filter: any;
}

async function getImgData(): Promise<Type> {
  const response = await fetch(
    `${url}/api/upload/files`
  );
  return (await response.json()) as Promise<Type>
}
const data = await getImgData();

// Original images dowmload
for (let i = 0; i < data.length; i++) {

  const link = url + data[i].url;
  const name = data[i].hash + data[i].ext;

  downloadImageFromURL(link, name, directory);
}

// images dowmloader function
function downloadFormats(x){
  const link = url + x.url;
  const name = x.hash + x.ext;

  return downloadImageFromURL(link, name, directory)
}