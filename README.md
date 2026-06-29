# Shopify Announcement Banner App

A Shopify Embedded App that allows merchants to create and manage a customizable announcement banner displayed on their storefront. The app includes an admin dashboard to update the announcement text, stores the data in MongoDB, and displays it through a Shopify Theme App Extension.

---

## Features

- Shopify Embedded App
- Secure OAuth Authentication
- Save announcement banner text
- MongoDB data persistence
- Theme App Extension
- Live banner displayed on Shopify storefront
- Responsive UI

---

## Tech Stack

### Frontend

- React
- Shopify Polaris
- Remix

### Backend

- Node.js
- Express
- Shopify App API

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Render

---

## Project Structure

````
## Project Structure

```text
announcement-banner-app/
│
├── app/
│   ├── components/
│   ├── routes/
│   │   └── shopify.server.ts
│   ├── lib/
│   │   ├── dbMongo.ts
│   ├── models/
│   │   └── Announcement.model.ts
│   └── root.tsx
│
├── extensions/
│   └── theme-extension/
│       ├── assets/
│       ├── blocks/
│       ├── snippets/
│       └── shopify.extension.toml
│
├── prisma/
│
├── public/
│
├── package.json
├── shopify.app.toml
├── .env
└── README.md
````

````

---

## Environment Variables

Create a `.env` file in the root directory.

```env
SHOPIFY_API_KEY=your_api_key
SHOPIFY_API_SECRET=your_api_secret
SHOPIFY_APP_URL=https://your-render-url.onrender.com

SCOPES=write_products,write_metaobjects,write_metaobject_definitions

MONGODB_URI=your_mongodb_connection_string

SHOPIFY_APP_HANDLE=announcement-banner-app
````

---

## Installation

Clone the repository

```bash
git clone https://github.com/RanjanaRK/announcement-banner-app.git


cd announcement-banner-app
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

---

## Deployment

The application is deployed on Render.

Update the following before deployment:

- SHOPIFY_APP_URL
- Redirect URLs
- MongoDB URI
- Environment variables

After deployment release a new Shopify App Version:

```bash
npm run deploy
```

---

## How to Use

1. Install the app on a Shopify Development Store.
2. Open the embedded app from Shopify Admin.
3. Enter the announcement message.
4. Click **Save**.
5. Enable the Theme App Extension.
6. Visit the storefront to view the banner.

---

## Demo

### Deployed Application

https://announcement-banner-app-roih.onrender.com/

### GitHub Repository

https://github.com/RanjanaRK/announcement-banner-app

### Video Demo

https://youtu.be/-6UIwhSsJxs

---

## Demo Flow

- Open Shopify Admin
- Open Announcement Banner App
- Enter a banner message (e.g. "Sale 50% OFF")
- Save the message
- Show the MongoDB document
- Open the Online Store
- Show the banner displayed live

---

## Screenshots

---

GitHub: https://github.com/your-username
