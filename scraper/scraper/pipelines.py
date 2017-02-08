# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pyrebase

from scraper.items import Movie, Museum, RawItem
from scraper.spiders.city_kino import CityKinoSpider
from scraper.spiders.local import LocalSpider
from scraper.spiders.royal_kino import RoyalKinoSpider


class ScraperPipeline(object):

    def process_item(self, item, spider):
        return item


class DefaultPipeline(object):

    def process_item(self, item, spider):
        if isinstance(item, Movie):
            item.setdefault('original_language', False)
            item.setdefault('subtitles', False)
            item.setdefault('format_3d', False)
        return item


class FirebasePipeline(object):

    def __init__(self):
        config = {
            "apiKey": "AIzaSyBO5SxZIlHXR0e2UVY6YJXwp7-uN-ymFTo",
            "authDomain": "munichapi.firebaseapp.com",
            "databaseURL": "https://munichapi.firebaseio.com",
            "storageBucket": "munichapi.appspot.com",
            "messagingSenderId": "1047530724009"
        }
        self.firebase = pyrebase.initialize_app(config)

    def open_spider(self, spider):
        if isinstance(spider, (RoyalKinoSpider, CityKinoSpider)):
            self.firebase.database().child('movies').child(spider.name).remove()
        elif isinstance(spider, LocalSpider):
           self.firebase.database().child('museums').remove()

    def process_item(self, item, spider):
        if isinstance(item, Movie):
            path = self.firebase.database().child('movies').child(item['cinema'])
        elif isinstance(item, Museum):
            path = self.firebase.database().child('museums')
        elif isinstance(item, RawItem) and item['location']:
            path = self.firebase.database().child(item['location'])
        else:
            return item

        if isinstance(item, RawItem):
            path.set(item.to_firebase())
        else:
            path.push(item.to_firebase())
        return item

