// Copyright 2025 larshermges
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


// import { Method } from "@/api";
import http from "http";

// http://localhost:50259/?scanningMethod=sarif&sitemapurl=standardservice

  //http://localhost?method=sarif&xmlurl=standardservice/xml.de mockup

const server = http.createServer((req, res) => {
//   const config : UrlConfig = { urls : [] }






const url = new URL(req.url ?? '/', 'http://localhost:50259');

// const url = new URL(
//   "http://localhost:50259/?scanningMethod=sarif&sitemapurl=standardservice.xml"
// );


const scanningMethodInput = url.searchParams.get('scanningMethod');
const sitemapURL = url.searchParams.get("sitemapurl");


if (
  (scanningMethodInput !== "sarif" && scanningMethodInput !== "json" || sitemapURL === null )
) {
  res.writeHead(400, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      error: "Invalid or missing 'scanningMethod'",
      allowed: ["sarif", "json"],
      got: scanningMethodInput,
      sitemapURL: sitemapURL,
    })
  );
  return;
}

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      scanningMethod: scanningMethodInput,
      sitemapURL: sitemapURL,
    })
  );
});



server.listen(50259, () => {
  console.log("Server running at http://localhost:50259/");
});