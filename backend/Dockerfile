# use official python image
FROM python:3.11-slim

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# set working directory
WORKDIR /app

# install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# copy project files
COPY . .

# expose port
EXPOSE 8000

# run django dev server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
