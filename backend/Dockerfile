FROM python:3.10

WORKDIR .

COPY . .

RUN pip install pipenv 

RUN pipenv install --system --deploy

EXPOSE 8001

CMD ["uvicorn", "main:app", "--port=8001"]
