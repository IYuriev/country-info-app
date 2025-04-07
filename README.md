# The Country Info App

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IYuriev/country-info-app.git

2. **Install dependencies:**

   ```bash
   npm install
   
3. **Copy it to .env**

   ```bash
    APP_PORT=3000
    COUNTRY_GENERAL_INFO_API_URL='https://date.nager.at/api/v3'
    COUNTRY_SPECIAL_INFO_API_URL='https://countriesnow.space/api/v0.1/countries'

    DATABASE_URL="postgresql://postgres:postgres@db:5432/country-info-app"
    POSTGRES_PASSWORD=postgres
    POSTGRES_USER=postgres
    POSTGRES_DB=country-info-app
    ```
   
4. **Run Docker**

   ```bash
   docker-compose up --build
