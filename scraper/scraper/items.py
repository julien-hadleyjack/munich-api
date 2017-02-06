# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

from scrapy import Item, Field


class FirebaseItem(Item):

    firebase_fields = []

    def to_firebase(self):
        original = dict(self)
        firebase_format = lambda x: x.to_firebase() if isinstance(x, FirebaseItem) else x
        return {key: firebase_format(original[key]) for key in self.firebase_fields if key in original}

    @staticmethod
    def to_item(item, item_class):
        item_class(**{key: value for key, value in item.items() if key in item_class.fields})


class Movie(FirebaseItem):

    title = Field()
    cinema = Field()
    original_language = Field()
    subtitles = Field()
    format_3d = Field()
    genre = Field()

    firebase_fields = ["title", "original_language", "subtitles"]


class Restaurant(FirebaseItem):

    name = Field()
    hours = Field()
    meals = Field()

    firebase_fields = ["name", "meals"]


class Meal(FirebaseItem):

    name = Field()
    price = Field()

    firebase_fields = ["name", "price"]


class Museum(FirebaseItem):

    name = Field()
    address = Field()
    website = Field()
    price = Field()

    firebase_fields = ["name", "address", "website", "price"]
