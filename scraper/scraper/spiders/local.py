# -*- coding: utf-8 -*-

from pathlib import PurePath

import scrapy
import yaml

from scraper import PROJECT_PATH
from scraper.items import Museum


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
        return Museum(**museum)
