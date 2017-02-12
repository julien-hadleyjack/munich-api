# -*- coding: utf-8 -*-
import logging
import os
import pprint
from io import BytesIO
from io import StringIO

import arrow
import scrapy
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage

from scraper.items import RawItem


class LeonardiSpider(scrapy.Spider):
    name = "leonardi"
    allowed_domains = ["pdf"]
    start_urls = ["http://www.leonardi-kg.de/foodmenu/?password=" + os.environ.get("LEONARDI_PASSWORD")]

    def __init__(self, *args, **kwargs):
        logging.getLogger('pdfminer.psparser').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfdocument').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfpage').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfinterp').setLevel(logging.WARN)
        logging.getLogger('pdfminer.cmapdb').setLevel(logging.WARN)

        super().__init__(*args, **kwargs)

    def parse(self, response):

        text = self.pdf_to_text(BytesIO(response.body))
        result = self.parse_text(text)
        return RawItem(location="meals/leonardi/" + result["day"], data=result["meals"])

    def pdf_to_text(self, content, pages=None):

        pagenums = set(pages) if pages else set()

        output = StringIO()
        manager = PDFResourceManager()
        converter = TextConverter(manager, output, laparams=LAParams())
        interpreter = PDFPageInterpreter(manager, converter)

        for page in PDFPage.get_pages(content, pagenums):
            interpreter.process_page(page)

        converter.close()
        text = output.getvalue()
        output.close()

        return text

    def parse_text(self, text: str) -> dict:
        text = [line for line in text.split("\n") if line.strip()]

        weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"]
        categories = ["Salatbar", "Salatvariation", "Suppe", "Hauptgerichte", "Dessert"]
        exlude_lines = ["m.pire -", "Alle unsere warmen Gerichte", "Wir reichen Ihnen", "Ihr leonardi Team", "Mehr Informationen"]
        meal_plan = {"day": None, "meals": []}
        meals = []
        prices = []
        category = None
        for line in text:
            words = line.split(" ")
            if not meal_plan["day"] and len(words) > 0 and words[0] in weekdays:
                meal_plan["day"] = arrow.get(line, "DD.MM").replace(year=arrow.now().year).format("YYYY-MM-DD")
            elif meal_plan["day"] and len(words) > 0 and words[0] in categories:
                category = words[0]
            elif any(line.startswith(exclude) for exclude in exlude_lines):
                continue
            elif meal_plan["day"] and "€" in line and len(words) > 0:
                prices.append(words[0].replace(",", "."))
            elif meal_plan["day"] and category:
                meals.append({"name": line.replace(" I ", " | "), "category": category})

        if len(meals) == len(prices):
            for meal, price in zip(meals, prices):
                meal["price"] = price
                meal_plan["meals"].append(meal)
        else:
            self.logger.info("Prices can't be assigned to the corresponding meals.")
            meal_plan["meals"].append(meals)

        return meal_plan


if __name__ == '__main__':

    spider = LeonardiSpider()

    with open("../../data/leonardi-speiseplan.pdf", 'rb') as file:
        text = spider.pdf_to_text(file)

    print(text)
    print("\n\n\n\n")

    result = spider.parse_text(text)

    pprint.pprint(result)
