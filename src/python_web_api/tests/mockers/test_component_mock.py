import random
import unittest
import types
import models
import mock_data


class TestComponentMocker(unittest.TestCase):
    def test_single(self):
        generator = mock_data.component(1)

        self.assertIsInstance(generator, types.GeneratorType)

        for count, element in enumerate(generator):
            self.assertIsInstance(element, models.Component)
            self.assertLess(count, 1)

    def test_no_params(self):
        generator = mock_data.component()

        self.assertIsInstance(generator, types.GeneratorType)

        for count, element in enumerate(generator):
            self.assertIsInstance(element, models.Component)
            self.assertLess(count, 1)

    def test_negative_param(self):
        n = random.randint(-1000, -1)
        generator = mock_data.component(n)

        self.assertIsInstance(generator, types.GeneratorType)

        for count, element in enumerate(generator):
            self.assertIsInstance(element, models.Component)
            self.assertLess(count, 1)

    def test_multiple(self):
        n = random.randint(1, 1000)
        generator = mock_data.component(n)

        self.assertIsInstance(generator, types.GeneratorType)

        for count, element in enumerate(generator):
            self.assertIsInstance(element, models.Component)
            self.assertLess(count, n)


if __name__ == '__main__':
    unittest.main()
