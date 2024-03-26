from abstract_test import E2ETest

class TestProfile(E2ETest):

    def test_registration_fails_for_uppercase_email(self):
        self.go_to(f"/users/{self.random_string}")
        self.assertPageContains("User not found")
