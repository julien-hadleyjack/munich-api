# -*- coding: utf-8 -*-
import scrapy

from scraper.items import Meal


class MicrosoftKantineSpider(scrapy.Spider):
    name = "microsoft_kantine"
    allowed_domains = ["http://microsoft.signage-server.de/"]
    start_urls = (
        'http://microsoft.signage-server.de//',
    )

    def parse(self, response):
        for meal in response.css("ul.dishes"):
            yield self.parse_meal(meal)

    def parse_meal(self, meal):
        name = meal.css("span.dishDescriptionInner::text").extract_first().strip()
        english_name = meal.css(".dishDescriptionEnUS::text").extract_first()
        price = meal.css(".dishPriceSmallInner::text").re("\d+,\d+")
        price = price[0].replace(",", ".") if price else None
        return Meal(name=name, price=price)
