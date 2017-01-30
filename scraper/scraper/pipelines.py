# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: http://doc.scrapy.org/en/latest/topics/item-pipeline.html
import pyrebase

from scraper.items import Movie


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
        self.firebase = pyrebase.initialize_app(config).database()
        # self.firebase.child('movies').remove()

    def process_item(self, item, spider):
        if isinstance(item, Movie):
            path = self.firebase.child('movies').child(item['cinema'])
        else:
            return item

        path.push(dict(item.to_firebase()))
        return item


if __name__ == '__main__':
    firebase = FirebasePipeline()
    print(firebase.firebase.child('movies').child("city_kino").get().val().values())
