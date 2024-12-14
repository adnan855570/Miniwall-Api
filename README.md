# **MiniWall API**

The MiniWall API is a RESTful API designed for a lightweight social media platform, providing features such as CRUD operations for posts, multimedia uploads (video and audio), user authentication, geolocation, and social media integration.

---

## **Features**
1. **User Authentication**
   - Register and log in users securely using JWT.
   - Token-based authorization for protected routes.

2. **CRUD Operations**
   - Create, read, update, and delete posts.
   - Posts can include multimedia such as videos and audio.

3. **Multimedia Support**
   - Upload and attach video and audio files to posts.

4. **Geolocation & Device Detection**
   - Track user geolocation (latitude, longitude) and detect device type (browser and OS).

5. **User Preferences**
   - Update preferred language and country settings.
   - Save and update links to other social media profiles.

---

## **Technologies Used**
- **Node.js**: Backend framework.
- **Express.js**: Web framework for building the API.
- **MongoDB Atlas**: Cloud-based NoSQL database.
- **JWT**: JSON Web Tokens for authentication.
- **Multer**: Middleware for handling file uploads.
- **useragent**: Device detection for geolocation posts.

---

## **Installation**

### **1. Clone the Repository**
```bash
git clone https://github.com/your-username/miniwall-api.git
cd miniwall-api
```

## **Install Dependencies**
```bash
npm install
```
## **Set Up Environment Variables**
### **Create a .env file in the root of your project with the following variables:**
```bash
PORT=2000
MONGO_URI=<Your MongoDB Connection String>
JWT_SECRET=<Your JWT Secret Key>
```
## **Start the Server**
```bash
node app.js
```

## **Install Dependencies**
### **Authentication**
| Method | Endpoint            | Description                    | Protected |
|--------|---------------------|--------------------------------|-----------|
| POST   | `/api/auth/register` | Register a new user            | No        |
| POST   | `/api/auth/login`    | Authenticate user and get JWT  | No        |


### **Posts**
| Method | Endpoint                  | Description                         | Protected |
|--------|---------------------------|-------------------------------------|-----------|
| POST   | `/api/posts`              | Create a new post                   | Yes       |
| GET    | `/api/posts`              | Retrieve all posts                  | Yes       |
| PUT    | `/api/posts/:id`          | Update an existing post             | Yes       |
| DELETE | `/api/posts/:id`          | Delete a post                       | Yes       |


### **Multimedia**
| Method | Endpoint                  | Description                         | Protected |
|--------|---------------------------|-------------------------------------|-----------|
| POST   | `/api/posts/video`        | Upload a video and create a post    | Yes       |
| POST   | `/api/posts/audio`        | Upload an audio file and create a post | Yes   |


### **User Settings**
| Method | Endpoint                      | Description                         | Protected |
|--------|-------------------------------|-------------------------------------|-----------|
| PUT    | `/api/auth/settings/language` | Update language and country         | Yes       |
| PUT    | `/api/auth/settings/social-media` | Update social media links        | Yes       |


### **Geolocation**
| Method | Endpoint                  | Description                         | Protected |
|--------|---------------------------|-------------------------------------|-----------|
| POST   | `/api/posts/geolocation`  | Create a post with geolocation and device details | Yes |



