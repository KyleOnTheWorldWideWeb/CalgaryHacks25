# Wild Change  
An interactive map created to raise awareness about the environmental degradation that has occurred in the 20th and 21st century.

## 📂 Contents
- [Installation](#installation)
- [Running the Development Server](#running-the-development-server)
- [Public Folder](#public-folder)
- [Environment Variables](#environment-variables)

---

## Installation
1. **Clone the Repository**  
   ```sh
   git clone https://github.com/KyleOnTheWorldWideWeb/CalgaryHacks25.git
   ```

2. **Navigate to the `frontend` folder and install dependencies**  
   ```sh
   cd frontend
   pnpm install  # or use npm install / yarn install
   ```

---

## Running the Development Server
To start the Vite development server, run:

```sh
pnpm run dev  # or npm run dev / yarn dev
```

By default, the app will be available at:  
**📍 `http://localhost:5173/`** (unless otherwise configured)

---

## Public Folder
Vite serves static assets from the `public` directory.  
To use an asset from `public/`, reference it directly in your code as:

```jsx
<img src="/wildchange-icon.png" alt="Wild Change Logo" />
```

**Key Points:**
- Files in `public/` are **not processed by Vite** and are served as-is.
- Use absolute paths (`/your-file.png`) instead of importing assets.

---

## Environment Variables
Vite uses **`.env` files** for environment variables.

1. Create a **`.env`** file in the `frontend/` directory:
   ```sh
   touch .env
   ```
   
2. Add your environment variables using the `VITE_` prefix:
   ```sh
   VITE_API_URL=https://api.example.com
   VITE_MAPBOX_KEY=your_mapbox_key_here
   ```

3. Access these variables in your React components:
   ```js
   const apiUrl = import.meta.env.VITE_API_URL;
   console.log("API URL:", apiUrl);
   ```

**Important Notes:**
- **NEVER** store sensitive keys (e.g., API secrets) in `.env` files for frontend apps.
- Restart the server (`pnpm run dev`) after updating `.env`.
