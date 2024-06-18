FROM python:3.10

WORKDIR .

COPY . .

RUN pip install pipenv 

RUN pipenv install --system --deploy

EXPOSE 8000

CMD ["uvicorn", "main:app"]