from fastapi import FastAPI
from bs4 import BeautifulSoup
import requests
from datetime import datetime
import uuid
from elasticsearch import Elasticsearch, helpers
from fastapi.middleware.cors import CORSMiddleware

es = Elasticsearch(hosts=["http://es01:9200"])


def articleToDictParser(scrapedArticle):
    parsedData = BeautifulSoup(str(scrapedArticle), "html.parser")
    meta_tag = parsedData.find('meta', {'itemprop': 'dateModified'})
    a_tag = parsedData.find('a', {'rel': 'bookmark'})
    h2_tag = parsedData.find('h2', {'class': 'zox-s-title2'})

    if(not meta_tag or not a_tag or not h2_tag): return None

    date_modified = meta_tag['content']
    title = h2_tag.text.strip()
    link = a_tag['href']

    info_dict = {
        '_id': uuid.uuid1(),
        'title': title,
        'link': link,
        'timestamp': datetime.now(),
        'date_modified': date_modified
    }

    return info_dict

def articleGenerator(parsedData):
    recvdTag = parsedData.find("div", class_ = "zox-art-text-cont")
    while recvdTag is not None:
        yield recvdTag
        recvdTag = recvdTag.find_next("div", class_ = "zox-art-text-cont")

def refreshArticles():
    scrapedArticles = []
    shouldBreak = False
    pageCounter = 1

    with requests.Session() as reqSes:
        reqSes.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
            "Accept-Encoding": "gzip, deflate",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en"
        }

        while not shouldBreak:
            if shouldBreak:
                break

            scraperURL = f"https://www.securityweek.com/news/page/{pageCounter}"
            recvRequest = reqSes.get(scraperURL)
            parsedData = BeautifulSoup(recvRequest.text, "html.parser")
            articleGen = articleGenerator(parsedData)

            for scrapedArticle in articleGen:
                parsedArticle = articleToDictParser(scrapedArticle)
                if(parsedArticle):

                    if (datetime.now() - datetime.strptime(parsedArticle['date_modified'], '%Y-%m-%d')).days > 5:
                        shouldBreak = True
                        break

                    articleParser = BeautifulSoup(reqSes.get(parsedArticle["link"]).text, "html.parser")
                    articleData = articleParser.find("div", class_ = "zox-post-body")
                    sanitizedData = "".join(list(filter(lambda x: not x.startswith('Related:'), articleData.get_text().strip(" \t\n\r\xa0").split("\n"))))
                    parsedArticle["content"] = sanitizedData
                    scrapedArticles.append(parsedArticle)

            pageCounter += 1
        
        retrArticles = es.search({
        "sort": [
        {
            "timestamp": {
                "order": "asc"
            }
        }
        ]})

        arrayCounter = 0

        if len(retrArticles["hits"]["hits"]) != 0:
            for scrapedArticle in scrapedArticles:
                if(scrapedArticle["title"] == retrArticles["hits"]["hits"][0]["_source"]["title"]):
                    break
                arrayCounter += 1

        try:
            if len(retrArticles["hits"]["hits"]) != 0:
                helpers.bulk(
                es,
                scrapedArticles[0:arrayCounter],
                index="posts",
                doc_type="_doc"
                )
            else:
                print(len(scrapedArticles))
                helpers.bulk(
                es,
                scrapedArticles,
                index="posts",
                doc_type="_doc",
                )

            return {
                "statusMessage": "Successfully Refreshed"
            }
        except:
            return {
                "statusMessage": "Error Occured"
            }
        finally:
            return {
                "statusMessage": "Successfully Refreshed"
            }


scraperApp = FastAPI()

scraperApp.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@scraperApp.get("/")
def returnArticles():
    retrArticles = es.search(size=1000)
    return retrArticles["hits"]["hits"]

@scraperApp.post("/refresh")
def refreshRoute():
    return refreshArticles()

@scraperApp.get("/search")
def searchArticles(query: str):
    retrArticles = es.search(body={
        "query": {
            "query_string" : {
                "query" : f"{query}",
            }
        }
    }, size=1000)

    return retrArticles["hits"]["hits"]