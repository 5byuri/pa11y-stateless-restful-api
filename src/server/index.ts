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


import { Method } from "@/api";
import http, { METHODS } from "http";



  //http://localhost?method=sarif&xmlurl=standardservice/xml.de mockup

const server = http.createServer((req, res) => {
//   const config : UrlConfig = { urls : [] }



const url = (`http://localhost:50259/${req.url}`)




  const params = new URL(url)
    .searchParams;
    const scanningMethod: Method  = params.get("scanningMethod") typeof Method;
    console.log(scanningMethod)

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(
      {
        // pathname,
        // query,
        fullUrl: req.url,
      },
      null,
      
    )
  );
});



server.listen(50259, () => {
  console.log("Server running at http://localhost:50259/");
});