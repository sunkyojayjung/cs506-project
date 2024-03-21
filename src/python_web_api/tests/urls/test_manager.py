import functools
import json
import models
import random
import requests
import unittest
from tests.urls.url_test_utils import Server

parse = functools.partial(json.loads, cls=models.ModelDecoder)


class TestManager(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = Server(host='0.0.0.0', port=5000)
        cls.server.start()

        while True:
            with requests.get('http://127.0.0.1:5000/', timeout=5) as resp:
                if resp.ok:
                    break

    @classmethod
    def tearDownClass(cls):
        cls.server.stop()

    def test_manager_get(self):
        with requests.get('http://127.0.0.1:5000/manager') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            src = resp.text

        try:
            decoded_models = parse(src)
        except Exception:
            self.fail(msg='Could not parse JSON Data as a Manager')

        self.assertIsNotNone(decoded_models)
        self.assertIsInstance(decoded_models, list)
        self.assertGreaterEqual(len(decoded_models), 1)

        for model in decoded_models:
            self.assertIsInstance(model, models.Manager)
            for key, value in model.__annotations__.items():
                self.assertIsNotNone(getattr(model, key, None))
                self.assertIsInstance(getattr(model, key), value)

            self.assertGreaterEqual(model.ID, int(1e6))

    def test_manager_get_with_id(self):
        x = random.randint(1, 10000)
        with requests.get(f'http://127.0.0.1:5000/manager/{x}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            src = resp.text

        try:
            model = parse(src)
        except Exception:
            self.fail(msg='Could not parse JSON Data as a Manager')

        self.assertIsNotNone(model)
        self.assertIsInstance(model, models.Manager)

        for key, value in model.__annotations__.items():
            self.assertIsNotNone(getattr(model, key, None))
            self.assertIsInstance(getattr(model, key), value)

        self.assertEqual(model.ID, x)

    def test_manager_post(self):
        with requests.post('http://127.0.0.1:5000/manager') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\s+on\s+"/manager"\s+with\s+method\s+post'
            self.assertRegex(text, expected_msg)

    def test_manager_post_with_id(self):
        x = random.randint(1, 10000)
        with requests.post(f'http://127.0.0.1:5000/manager/{x}') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 405)

    def test_manager_put(self):
        with requests.put('http://127.0.0.1:5000/manager') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 405)

    def test_manager_put_with_id(self):
        x = random.randint(1, 10000)
        with requests.put(f'http://127.0.0.1:5000/manager/{x}') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 405)

    def test_manager_delete(self):
        with requests.delete(f'http://127.0.0.1:5000/manager') as resp:
            self.assertFalse(resp.ok)
            self.assertEqual(resp.status_code, 405)

    def test_manager_delete_with_id(self):
        x = random.randint(1, 10000)
        with requests.delete(f'http://127.0.0.1:5000/manager/{x}') as resp:
            self.assertTrue(resp.ok)
            self.assertEqual(resp.status_code, 200)

            text = resp.text.lower()

            expected_msg = r'success\s+on\s+"/manager/[{]id[}]"\s+with\s+method\s+delete'
            self.assertRegex(text, expected_msg)

            expected_id = f'manager_id\\s+=\\s+{x}'
            self.assertRegex(text, expected_id)


if __name__ == '__main__':
    unittest.main()
