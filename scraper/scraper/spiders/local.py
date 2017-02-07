# -*- coding: utf-8 -*-

from pathlib import Path

import scrapy
import yaml

from scraper import PROJECT_PATH
from scraper.items import Museum


class LocalSpider(scrapy.Spider):
    name = "local"
    start_urls = [file.as_uri() for file in (Path(PROJECT_PATH) / "data").glob("**/*.yml")]

    custom_settings = {'ROBOTSTXT_OBEY': False}

    def parse(self, response):
        data = yaml.load(response.text)
        for museum in data.get("museums", []):
            yield self.parse_museum(museum)

    def parse_museum(self, museum):
        # return FirebaseItem.to_item(museum, Museum)
        return Museum(**{key: value for key, value in museum.items() if key in Museum.fields})
