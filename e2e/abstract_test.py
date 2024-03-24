import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import os

class E2ETest(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        super(E2ETest, self).__init__(*args, **kwargs)
        self.driver = None
        self.root_url = "http://127.0.0.1:8000"

    def setUp(self):
        if self.browser == 'firefox':
            self.driver = webdriver.Firefox()
        elif self.browser == 'chrome':
            self.driver = webdriver.Chrome()
        else:
            raise ValueError(f"Unsupported browser: {self.browser}")

    def tearDown(self):
        self.driver.quit()
