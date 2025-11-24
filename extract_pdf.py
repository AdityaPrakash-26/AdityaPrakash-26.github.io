import pdfplumber

pdf_path = r'c:\Users\praka\OneDrive\Desktop\Coding\WebDev\temp\AdityaPrakash-26.github.io\assets\AdityaPrakashResume.pdf'

with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        print(page.extract_text())
