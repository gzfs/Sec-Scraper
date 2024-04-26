# Scraper

A News website made from Scraping the Data from another News website. You may ask why? I don't know the Reason either. It was good to brush my skills up though.

## Running

```
git clone https://github.com/gzfs/Sec-Scraper
cd Scraper
cd Scraper-Backend
docker build -t scraper-backend ./
cd ..
cd Scraper-Frontend
docker build -t scraper-frontend ./
cd ..
docker compose up
```

```
Now go to localhost:8080 and click on the Black and White Refresh Button and after it stops spinning refresh the Page.
```
