# Project Guide

## 1. Сервисийг локал дээрээ суулгаж, ажиллуулах заавар

1. Доорх кодыг ажиллуулж prerequisites-ээ татна.

```sh
npm install
```

2. `env.example.txt` файлыг `.env` болго
3. MongoDB Compass ашиглан баазтай холбогдох:

   Compass дээр `mongodb+srv://test_user:tLS8nDi6Zje6dO7z@hospital-main.ai3vw.mongodb.net/` гэсэн connection string оруулж баазтай холбогдох

4. Доорх коммандаар ажиллуулах

```sh
npm install 
npm run dev
```

## 2. Folder Structure

```bash
project-root/
├── node_modules/ # npm install хийсний дараа суух хамааралтай сангууд
├── controller/   # Логик үйлдүүд
├── models/       # Өгөгдлийн сангийн схемүүд
├── routes/       # API endpoint-ууд
├── .gitignore
├── package.json  # Сервисийн dependencies, скриптүүд
├── README.md
└── .env          # Environmental variables
```

## 3. API Endpoints

## Сервисийн ерөнхий

| Method | URL              | Description                             |
| ------ | ---------------- | --------------------------------------- |
| `GET`  | `/api/v1/health` | Just to check if the service is running |

### Auth

| Method | URL                            | Description              |
| ------ | ------------------------------ | ------------------------ |
| `POST` | `/api/v1/signup/medical-staff` | Create new medical staff |

## 4. Зарим тайлбарууд

1. Folder structure болон `auth.controller.js` гэх мэт stylistic choice-ыг сольж болно.
2. helpers, validators нэмье гэж бодож байгаа (дараагаар). Мөн auth middleware бичнэ.

## 5 TestUsers:
Patient
test6@gmail.com
Test1234@

Doctor
jeandoe@gmail.com
123456

Nurse
sumya@gmail.com
123456

Admin
admin@ex.com
Password123%