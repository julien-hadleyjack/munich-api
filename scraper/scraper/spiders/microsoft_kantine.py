# -*- coding: utf-8 -*-
import arrow
import scrapy

from scraper.items import Meal, RawItem


class MicrosoftSpider(scrapy.Spider):
    name = "microsoft"
    allowed_domains = ["http://microsoft.signage-server.de/"]
    start_urls = (
        'http://microsoft.signage-server.de/',
    )

    def parse(self, response):
        for section in response.xpath('//section[contains(@id, "page-menu")]'):
            day = section.xpath("@data-mt-subtitle").extract_first()
            day = arrow.get(day, "DD.MM.YYYY").format("YYYY-MM-DD") if day else None
            for category in section.css("div.FoodCategoryContainer"):
                category_title = category.css("h4.FoodCategoryTitle::text").extract_first()
                for meal in category.css("div.mt-page-link-inner"):
                    yield self.parse_meal(meal, day, category_title)

    def parse_meal(self, meal, day, category):
        name = meal.css("span.dishDescriptionInner::text").extract_first().strip()
        price = meal.css(".dishPriceSmallInner::text").re("\d+,\d+")
        price = price[0].replace(",", ".") if price else None

        return Meal(restaurant="microsoft", day=day, name=name, price=price, category=category)
