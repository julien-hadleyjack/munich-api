# -*- coding: utf-8 -*-

from pathlib import PurePath

import scrapy
import yaml

from scraper import PROJECT_PATH
from scraper.items import Museum, FirebaseItem


class LocalSpider(scrapy.Spider):
    name = "local"
    start_urls = [
        (PurePath(PROJECT_PATH) / "data" / "data.yml").as_uri()
    ]

    def parse(self, response):
        data = yaml.load(response.text)
        for museum in data["museums"]:
            yield self.parse_museum(museum)

    def parse_museum(self, museum):
        # return FirebaseItem.to_item(museum, Museum)
        return Museum(**{key: value for key, value in museum.items() if key in Museum.fields})
