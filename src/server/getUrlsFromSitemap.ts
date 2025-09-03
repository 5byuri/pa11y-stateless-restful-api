import { UrlConfig } from "@/api";
import { cheerio } from "cheerio";

export function getUrlsFromSitemap(sitemapUrl: string, config: UrlConfig) {
  return Promise.resolve()
    .then(() => fetch(sitemapUrl))
    .then((response) => response.text())
    .then((body) => {
      const $ = cheerio.load(body, { xmlMode: true });

      const isSitemapIndex = $("sitemapindex").length > 0;
      if (isSitemapIndex) {
        return Promise.all(
          $("sitemap > loc")
            .toArray()
            .map((element: unknown) => {
              return getUrlsFromSitemap($(element).text(), config);
            })
        ).then((configs) => {
          return configs.pop();
        });
      }

      $("url > loc")
        .toArray()
        .forEach((element: unknown) => {
          const url = $(element).text();
          
          //   if (sitemapExclude && url.match(sitemapExclude)) {
          //     return;
          //   }
          //   if (sitemapFind) {
          //     url = url.replace(sitemapFind, sitemapReplace);
          //   }
          config.urls.push(url);
        });

      return config;
    })
    .catch((error) => {
      if (error.stack && error.stack.includes("node-fetch")) {
        // throw new Error(`The sitemap "${sitemapUrl}" could not be loaded`);
        console.log("error")
      }
    //   throw new Error(`The sitemap "${sit emapUrl}" could not be parsed`);
            console.log("error")

    });
}

// return getUrlsFromSitemap(program.sitemap, initialConfig);
