# -*- coding: utf-8 -*-
from io import BytesIO
from io import StringIO
from pathlib import PurePath

import arrow
import logging
import scrapy
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage

from scraper import PROJECT_PATH
from scraper.items import RawItem


class LeonardiSpider(scrapy.Spider):
    name = "leonardi"
    allowed_domains = ["pdf"]
    start_urls = [(PurePath(PROJECT_PATH) / "data" / "leonardi-speiseplan.pdf").as_uri()]

    def __init__(self, *args, **kwargs):
        logging.getLogger('pdfminer.psparser').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfdocument').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfpage').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfinterp').setLevel(logging.WARN)
        logging.getLogger('pdfminer.cmapdb').setLevel(logging.WARN)

        super().__init__(*args, **kwargs)

    def parse(self, response):

        text = pdf_to_text(BytesIO(response.body))
        result = parse_text(text)
        return RawItem(location="meals/leonardi/" + result["day"], data=result["meals"])


def pdf_to_text(content, pages=None):

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


def parse_text(text):
    text = [line for line in text.split("\n") if line.strip()]

    weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"]
    categories = ["Salatbar", "Salatvariationen", "Suppe", "Hauptgerichte", "Dessert"]
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
        elif meal_plan["day"] and "€" in line and len(words) > 0:
            prices.append(words[0].replace(",", "."))
        elif meal_plan["day"] and category:
            meals.append({"name": line.replace(" I ", " | "), "category": category})

        if len(meal_plan["meals"]) == len(prices) or True:
            for meal, price in zip(meals, prices):
                meal["price"] = price
                meal_plan["meals"].append(meal)
        else:
            meal_plan["meals"].append(meals)

    return meal_plan


if __name__ == '__main__':

    with open("../../data/leonardi-speiseplan.pdf", 'rb') as file:
        text = pdf_to_text(file)

    print(text)
    print("\n\n\n\n")

    result = parse_text(text)

    print(result)
