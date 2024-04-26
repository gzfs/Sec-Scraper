FROM python:3.12
WORKDIR /usr/local/app

COPY Main.py ./
COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

RUN useradd app
USER app

CMD ["uvicorn", "Main:scraperApp", "--host", "0.0.0.0", "--port", "8000"]
