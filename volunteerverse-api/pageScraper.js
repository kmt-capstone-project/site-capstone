const scraperObject = {
  url: "https://www.democracylab.org/projects",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);

    let urls = await page.$$eval(
      ".ProjectCardContainer.col .ProjectCard-root > a",
      (links) => {
        links = links.map((el) => el.href);
        return links;
      }
    );
    console.log(urls);

    // Loop through each of those links, open a new page instance and get the relevant data from them
    let pagePromise = (link) =>
      new Promise(async (resolve, reject) => {
        let dataObj = {};
        let newPage = await browser.newPage();
        await newPage.goto(link);
        dataObj["projectTitle"] = await newPage.$eval(
          "div.Profile-top-details > h1",
          (el) => el.textContent
        );

        dataObj["problem"] = await newPage.$eval(
            "#AboutProject-tabs-tabpane-proj-details > div.markdown-container >p ",
            (el) => el.textContent
        );
        
        dataObj["technologies"] = await newPage.$eval(
            ".AboutProject-technologies .Profile-pill",
            (el) => el.textContent
        )

        resolve(dataObj);
        await newPage.close();
      });

    for (link in urls) {
      let currentPageData = await pagePromise(urls[link]);
      // scrapedData.push(currentPageData);
      console.log(currentPageData);
    }
  },
};
module.exports = scraperObject;
