from setuptools import setup, find_packages
 
setup(name='cache',
      version='0.1-alpha',
      url='https://github.com/Ulfasaar/cache',
      license='MIT',
      author='Ryan Weyers',
      author_email='weyers.ryan@gmail.com',
      description='A library that makes caching data to improve performance incredibly easy.',
      long_description=open('../README.md').read(),
      packages=['.'],
      zip_safe=True)