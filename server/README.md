
<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:saraAhangari/Software-Engineering-Project.git
   ```
2. checkout to appointment branch
   ```sh
   git checkout --track appointment
   ```
3. go to server folder
   ```sh
   cd server
   ```
4. create .env.base folder
   ```sh
   vim .env.base
   ```
5. write your environment variable on .env.base file like this
   ```
   SECRET_KEY='django-insecure-(=0pkdtx@r3ljs)kb*5rzi_8$859iichq!wls5-v)j#=h8@@fy'
   PANEL_API_KEY='pEONMNPPie0_AQ-p5tArzf6fUbdKKzSNafHIfmV61Xw='
   DEBUG_MODE=True
   DB_NAME='hospital_db'
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   DB_HOST=db
   DB_PORT=5432
   REDIS_URI='redis://redis:6379/0'
   ```
6. build the image and run 
   ```sh
   docker compose --env-file ./.env.base up --build
   ```
7. create essential roles   
   ```sh
   python manage.py create_roles
   ```
8. create super user (admin rule)
   ```sh
   python manage.py createsuperuser
   ```

9. create assurance, specialities, roles with django-admin site   

### Usage
#### you can manage the hospital with django-admin site
   ```
   http://127.0.0.1:8000/admin/
   ```

#### swagger-ui
   ```
   http://127.0.0.1:8000/api/schema/swagger-ui
   ```

#### database relationship
   ```
   http://127.0.0.1:8000/schema
   ```