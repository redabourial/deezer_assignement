import time

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from abstract_test import E2ETest


class RouterTest(E2ETest):

    def test_get_home(self):
        self.assertEqual(self.title, "Deezer assignement")

    def test_get_random_page(self):
        self.go_to(f"/{self.random_string}")
        self.assertEqual(self.title, "Deezer assignement")
        self.assertEqual(self.text, "Page does not exist")

    def test_get_random_subpage(self):
        self.go_to(f"/{self.random_string}/{self.random_string}")
        self.assertEqual(self.title, "Deezer assignement")
        self.assertEqual(self.text, "Page does not exist")
