# -*- coding: utf-8 -*-
from datetime import datetime

import scrapy
from ics import Calendar
from pathlib import Path

from scraper import PROJECT_PATH
from scraper.items import Event


class CalendarSpider(scrapy.Spider):
    name = "calendar"
    start_urls = [file.as_uri() for file in (Path(PROJECT_PATH) / "data").glob("**/*.ics")]

    def parse(self, response):
        c = Calendar(response.text)
        for event in c.events:
            yield self.parse_event(event)

    def parse_event(self, event):
        return Event(
            title=event.name,
            start=event.begin.isoformat(),
            end=event.end.isoformat(),
            all_day=event.all_day,
            location=event.location or None,
            description=event.description or None
        )
