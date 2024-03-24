import os
import time
import unittest
import uuid

from selenium import webdriver
from selenium.webdriver import FirefoxOptions
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


class E2ETest(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super(E2ETest, self).__init__(*args, **kwargs)
        self.driver = None
        self.root_url = "http://127.0.0.1:8000"

    def setUp(self):
        options = FirefoxOptions()
        if os.getenv("HEADLESS_SELENIUM") == "true":
            options.add_argument("--headless")
            options.binary("/usr/bin/firefox")
        self.driver = webdriver.Firefox(options)
        self.go_home()

    def tearDown(self):
        self.driver.quit()

    def wait(self, delay=0.2):
        time.sleep(delay)

    @property
    def random_string(self):
        return str(uuid.uuid4())[:8]

    @property
    def url(self):
        return self.driver.current_url

    @property
    def uri(self):
        assert self.root_url in self.url
        return self.url.replace(self.root_url, "")

    @property
    def body(self):
        return self.driver.find_element(By.TAG_NAME, "body")

    @property
    def title(self):
        return self.driver.title

    @property
    def text(self):
        return self.body.text

    def go_to(self, uri="/"):
        self.driver.get(f"{self.root_url}" + uri)
        self.wait()

    def go_home(self):
        self.driver.get(self.root_url)
        self.wait()

    def refresh(self):
        self.driver.refresh()
        self.wait()

    def assertArrayContains(self, array, element):
        if element not in array:
            raise AssertionError(f"Element '{element}' not found in the array.")

    def assertArrayContainsSubset(self, array, subset):
        for element in subset:
            self.assertArrayContains(array, element)

    def assertPageContains(self, text):
        assert text in self.text, f"{text} not found in webpage"
