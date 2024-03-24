from .abstract_test import E2ETest


class RegistrationTest(E2ETest):

    def test_registration(self):
        self.driver.get(self.root_url)
        user_field = self.driver.find_element(By.ID, "registration_user_field")
        user_field.send_keys("John Doe")
        