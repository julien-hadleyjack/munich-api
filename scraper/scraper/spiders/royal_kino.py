# -*- coding: utf-8 -*-
import json

import scrapy

from scraper.items import Movie


class RoyalKinoSpider(scrapy.Spider):
    name = "royal_kino"
    allowed_domains = ["kinoheld.de"]
    start_urls = (
        'https://www.kinoheld.de/kino-muenchen/royal-filmpalast?mode=widget&layout=movies&target=self&rb=1&ref=mobile',
    )

    def parse(self, response):
        result = response.css("script#data-layer").re("dataLayer\.push\((.+?)\);")
        if not result:
            return
        try:
            result = json.loads(result[0])
        except json.JSONDecodeError:
            return
        for movie in result["movies"].values():
            yield self.process_movie(movie)

    def process_movie(self, movie):
        return Movie(title=movie["name"],
                     cinema=self.name,
                     genre=movie["genre"])
