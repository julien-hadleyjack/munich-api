# -*- coding: utf-8 -*-
import scrapy

from scraper.items import Meal, RawItem


class MicrosoftSpider(scrapy.Spider):
    name = "microsoft"
    allowed_domains = ["http://microsoft.signage-server.de/"]
    start_urls = (
        'http://microsoft.signage-server.de/',
    )

    def parse(self, response):
        for food_category in response.css(".FoodCategoryContainer"):
            category = food_category.css("h4::text").extract_first()
            for meal in food_category.css("ul.dishes"):
                yield self.parse_meal(meal, category)

    def parse_meal(self, meal, category):
        name = meal.css("span.dishDescriptionInner::text").extract_first().strip()
        price = meal.css(".dishPriceSmallInner::text").re("\d+,\d+")
        price = price[0].replace(",", ".") if price else None
        day = meal.css("a::attr(href)").extract_first()
        day = day.split("-date-")[-1] if day else None
        return Meal(restaurant="microsoft", day=day, name=name, price=price, category=category)
