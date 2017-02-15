# -*- coding: utf-8 -*-
from io import BytesIO, StringIO

import logging

import re
import scrapy
import arrow
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage

from scraper.items import Meal


class FunkSpider(scrapy.Spider):
    name = "funk"
    allowed_domains = ["lecker-mittagessen.com", "www.dropbox.com"]
    start_urls = ['http://lecker-mittagessen.com/lecker-mittagessen-in-muenchen/funk-casino-im-idg-verlag//']

    weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"]
    categories = ["Beilagen", "Aktionsgericht"]

    def __init__(self, *args, **kwargs):
        logging.getLogger('pdfminer.psparser').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfparser').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfdocument').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfpage').setLevel(logging.WARN)
        logging.getLogger('pdfminer.pdfinterp').setLevel(logging.WARN)
        logging.getLogger('pdfminer.cmapdb').setLevel(logging.WARN)

    def parse(self, response):
        pdf_link = response.xpath('//a[contains(@href, "dropbox")]/@href').extract_first().replace("dl=0", "dl=1")
        yield scrapy.Request(pdf_link, callback=self.pdf_to_text)

    def pdf_to_text(self, response, pages=None):

        pagenums = set(pages) if pages else set()

        output = StringIO()
        manager = PDFResourceManager()
        converter = TextConverter(manager, output, laparams=LAParams())
        interpreter = PDFPageInterpreter(manager, converter)

        for page in PDFPage.get_pages(BytesIO(response.body), pagenums):
            interpreter.process_page(page)

        converter.close()
        text = output.getvalue()
        output.close()

        for meal in self.parse_text(text):
            yield meal

    def parse_text(self, text):

        day = None
        name = ""
        category = None

        for line in text.split("\n"):
            words = line.split(" ")
            if len(words) > 0 and words[0] in self.weekdays:
                day = arrow.get(line, "DD.MM.YYYY").format("YYYY-MM-DD")
                continue
            elif day is None:
                continue

            if len(words) > 0 and words[0] == "(A)":
                break

            if name != "" and line.strip() == "":
                name = re.sub("\s*(\|\s*)+", " | ", name)
                yield Meal(restaurant=self.name, day=day, name=name, category=category or "Hauptgericht")
                name = ""
            elif ":" in line or any(line.startswith(category_item) for category_item in self.categories):
                category = line.strip().strip(":")
            elif "€" not in line and line.strip() != "":
                line = re.sub("[A-Z,\d\s]+$", "", line)
                name = name + " " + line if name != "" else line

