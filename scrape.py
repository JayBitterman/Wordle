from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
import time


ser = Service(r"Path\geckodriver.exe")
f = open(r'Path\wordBank.txt', 'w')

driver = webdriver.Firefox(service=ser)

driver.get("https://pages.cs.wisc.edu/~o-laughl/csw15.txt")
words = driver.find_element(By.TAG_NAME, "pre").text.split('\n')
time.sleep(1)
for word in words:
    if len(word) == 5:
        f.write(word.lower() + "\n")
driver.quit()
