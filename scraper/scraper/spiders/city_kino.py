# -*- coding: utf-8 -*-
import scrapy

from scraper.items import Movie


class CityKinoSpider(scrapy.Spider):
    name = "city_kino"
    allowed_domains = ["city-kinos.de"]
    start_urls = (
        'http://city-kinos.de/wochenprogramm',
    )

    def extract_original_version(self, movie):
        if movie["title"].endswith("OMU"):
            movie["original_language"] = True
            movie["subtitles"] = True
            movie["title"] = movie["title"][:-4]
        elif movie["title"].endswith("OV"):
            movie["original_language"] = True
            movie["title"] = movie["title"][:-3]
        return movie

    def parse(self, response):
        for title in response.css(".performanceName::text").extract():
            yield self.extract_original_version(Movie(title=title, cinema="city_kino"))