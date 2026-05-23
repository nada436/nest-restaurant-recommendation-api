# Restaurant Management & Recommendation API

A robust NestJS-based backend system designed for managing restaurant data, user preferences, and generating intelligent social recommendations. This project features a modular architecture, geospatial search capabilities, and complex MongoDB aggregation pipelines for high-performance data retrieval.

---

## 🚀 Features

- **Restaurant Management**: Full CRUD operations for restaurants with multi-language support (EN/AR).
- **Geospatial Discovery**: Find nearby restaurants using MongoDB's `$near` operator within a specific radius.
- **Social Following System**: Users can follow their favorite restaurants to build a personalized network.
- **Intelligent Recommendations**: A sophisticated engine that suggests restaurants based on:
  - User's favorite cuisines.
  - Restaurants followed by other users with similar tastes (Collaborative filtering).
- **Global Error Handling**: Centralized exception filtering for consistent API responses.
- **Validation & Transformation**: Strict data validation using `class-validator` and `class-transformer`.
- **API Documentation**: Fully integrated Swagger UI for interactive testing.

---

## 🛠 Technologies Used

- **Framework**: [NestJS](https://nestjs.com/) (v11+)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Language**: TypeScript
- **Documentation**: Swagger/OpenAPI
- **Validation**: Class-validator, Class-transformer
- **Deployment/Environment**: Dotenv for configuration management

---


### Modular Design
The project is divided into distinct feature modules (`Restaurant`, `User`, `Follow`, `Recommendation`), each encapsulating its own controllers, services, repositories, and schemas. This ensures a clean separation of concerns and simplifies horizontal scaling.

### Aggregation Pipeline
The recommendation engine leverages MongoDB's powerful aggregation framework. This allows for:
- **Deduplication**: Ensuring a user doesn't get the same restaurant recommendation multiple times.
- **Efficient Joins**: Using `$lookup` to fetch restaurant details across collections in a single database operation.
- **Performance**: Performing data-heavy operations (like grouping and filtering) on the database level rather than in-memory.

---

## 📂 Project Structure

```text
src/
├── common/              # Shared interfaces, filters, and interceptors
├── follow/              # Following system logic
│   ├── dto/             # Data Transfer Objects
│   ├── repository/      # Data access layer
│   ├── schemas/         # Mongoose models
│   └── follow.module.ts
├── recommendation/      # Recommendation engine logic
├── restaurant/          # Restaurant management & geospatial search
├── user/                # User profile & preference management
├── app.module.ts        # Root module
└── main.ts              # Entry point
```

---

## 📡 API Endpoints

### Restaurants
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/restaurant` | Create a new restaurant |
| `GET` | `/restaurant` | List all restaurants (filterable by cuisine) |
| `GET` | `/restaurant/nearby` | Find restaurants by coordinates (`lng`, `lat`) |
| `GET` | `/restaurant/:identifier` | Get restaurant by ID or slug |

### Users & Social
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/user` | Create a user profile with favorite cuisines |
| `POST` | `/follow` | Follow a restaurant |
| `GET` | `/recommendation/:userId` | Get personalized restaurant suggestions |

---

## 📝 Request Examples

### Restaurants

#### Create Restaurant
**POST** `/restaurant`
```json
{
  "name": {
    "en": "The Burger Joint",
    "ar": "برجر جوينت"
  },
  "slug": "the-burger-joint",
  "cuisines": ["Fried", "Asian"],
  "location": {
    "coordinates": [31.2357, 30.0444]
  }
}
```

#### Find Nearby Restaurants
**GET** `/restaurant/nearby?lng=31.2357&lat=30.0444`

#### Get Restaurant by ID/Slug
**GET** `/restaurant/the-burger-joint`

#### List All Restaurants (Filter by Cuisine)
**GET** `/restaurant?cuisine=Asian`

---

### Users & Social

#### Create User Profile
**POST** `/user`
```json
{
  "fullName": "John Doe",
  "favoriteCuisines": ["Fried", "Asian"]
}
```

#### Follow a Restaurant
**POST** `/follow`
```json
{
  "userId": "6a0e6b548ebf4c2edc523cf8",
  "restaurantId": "6a0e6566fdd74bff508b3191"
}
```

#### Get Personalized Recommendations
**GET** `/recommendation/6a0e6b548ebf4c2edc523cf8`

---

## 🛠 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/nada436/nest-restaurant-recommendation-api.git
cd Restaurant_Management_API
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/restaurant_db
```

### 4. Run the application
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### 5. Access Documentation
Once running, visit: `http://localhost:3000/api` for the Swagger UI.

---

## 🛡 Validation & Error Handling

- **Validation**: All incoming requests are validated via `ValidationPipe`. We use `whitelist: true` to strip non-documented properties, ensuring data integrity.
- **Error Handling**: A custom `HttpExceptionFilter` catches all errors and formats them into a standard JSON structure:
  ```json
  {
    "success": false,
    "statusCode": 404,
    "message": "Restaurant not found",
    "path": "/restaurant/non-existent-slug"
  }
  ```

---

## 🔮 Future Improvements

- [ ] **Caching**: Implement Redis to cache frequent recommendation results.
- [ ] **Authentication**: Add JWT-based auth for secure user operations.
- [ ] **Reviews System**: Allow users to rate and review restaurants.
