import time

from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from abstract_test import E2ETest

class RegistrationTest(E2ETest):

    def register(self,username,email):
        user_field = self.driver.find_element(By.ID, "username")
        user_field.send_keys(username)
        email_field = self.driver.find_element(By.ID, "email")
        email_field.send_keys(email)
        submit_btn = self.driver.find_element(By.CLASS_NAME, "register-form-button")
        submit_btn.click()
        self.wait()

    @property
    def card(self):
        return self.driver.find_element(By.CLASS_NAME, "ant-card-body")

    @property
    def description(self):
        return self.card.text.split("\n")
 
    def assert_registration(self,username,email):
        self.assertArrayContainsSubset(self.description,['Pk', 'Username', 'Email', 'Fib', 'Time to compute fib', 'Time to create', 'Time to query'])
        
        displayed_pk = self.description[3]
        self.assertEqual(self.uri, f"/users/{displayed_pk}")

        displayed_username = self.description[4]
        self.assertEqual(displayed_username,username)

        displayed_email = self.description[5]
        self.assertEqual(displayed_username,username)

        displayed_fib = self.description[9]
        self.assertArrayContains([
            "12586269025",
            "20365011074",
            "32951280099",
            "53316291173",
            "86267571272",
            "139583862445",
        ], displayed_fib)

    def test_registration_for_deezer_domain(self):
        username = self.random_string
        email = f"{self.random_string}@deezer.com"
        self.register(username,email)
        self.assert_registration(username,email)

    def test_registration_for_deezer_subdomain(self):
        username = self.random_string
        email = f"{self.random_string}@some.thing.deezer.com"
        self.register(username,email)
        self.assert_registration(username,email)

    def test_registration_fails_for_other_emails(self):
        username = self.random_string
        email = f"{self.random_string}@notdeezer.com"
        self.register(username,email)
        self.assertEqual(self.uri,"/")
        self.wait()
        self.assertPageContains("Email must end in @deezer.com or @*.deezer.com.")
    
    def test_registration_fails_for_empty_email(self):
        username = self.random_string
        email = ""
        self.register(username,email)
        self.assertEqual(self.uri,"/")
        self.assertPageContains("Please input your Email!")
    
    def test_registration_fails_for_empty_username(self):
        username = ""
        email = f"{self.random_string}@deezer.com"
        self.register(username,email)
        self.assertEqual(self.uri,"/")
        self.assertPageContains("Please input your Name!")

    def test_registration_fails_for_already_existing_user(self):
        username = self.random_string
        email = f"{self.random_string}@deezer.com"
        self.register(username,email)
        self.assert_registration(username,email)
        self.go_home()
        self.register(username,email)
        self.assertEqual(self.uri,"/")
        self.assertPageContains("user with this email already exists.")

    def test_registration_fails_for_uppercase_email(self):
        username = self.random_string
        email = f"Z{self.random_string}@deezer.com"
        self.register(username,email)
        self.assertEqual(self.uri,"/")
        self.assertPageContains("Email must be lower case.")

    def test_registration_persistence(self):
        username = self.random_string
        email = f"{self.random_string}@deezer.com"
        self.register(username,email)
        self.assert_registration(username,email)
        self.refresh()
        self.assertArrayContainsSubset(self.description,['Pk', 'Username', 'Email', 'Fib', 'Time to compute fib'])

        displayed_pk = self.description[3]
        self.assertEqual(self.uri, f"/users/{displayed_pk}")

        displayed_username = self.description[4]
        self.assertEqual(displayed_username,username)

        displayed_email = self.description[5]
        self.assertEqual(displayed_username,username)

        displayed_fib = self.description[8]
        self.assertArrayContains([
            "12586269025",
            "20365011074",
            "32951280099",
            "53316291173",
            "86267571272",
            "139583862445",
        ], displayed_fib)
