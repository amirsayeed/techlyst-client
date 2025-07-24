## 📌 Project Name

**TechLyst**

## 🎯 Purpose

TechLyst is a MERN Stack web application where users can explore tech products like web apps, mobile apps, AI tools, games, and more. The platform includes authentication, role-based dashboards, voting, reviewing, and a Stripe-integrated membership system for unlocking premium features.

## 🌐 Live Site URL

🔗 [https://techlyst-411bf.web.app/](https://techlyst-411bf.web.app/)

## 🔗 Server URL

🔗 [https://techlyst-server.vercel.app/](https://techlyst-server.vercel.app/)

## 🚀 Key Features

- Firebase authentication with email/password and Google sign-in
- JWT-based secure route protection
- Role-based access: User, Moderator, Admin
- Product CRUD functionality (create, update, delete own products)
- Add and display reviews with ratings per product
- Upvote and report buttons (per product, once per user)
- Moderator can:
  - Review and approve/reject products
  - Mark products as featured
  - Delete reported content
- Admin can:
  - Promote users to Moderator or Admin
  - View platform-wide stats (users, reviews, products)
  - Manage coupons (add, edit, delete)
- Featured and Trending product sections on homepage
- Search products by tag with backend filtering
- Pagination: 6 products per page
- Stripe payment integration for premium subscription
- Coupon slider for active discount codes
- Membership removes product upload limit
- Full responsive design for mobile, tablet, and desktop
- Clean UI built using Tailwind CSS and DaisyUI

## 🛠️ Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase + JWT
- **Payment**: Stripe
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS + DaisyUI
- **Data Fetching**: Axios + TanStack React Query
- **State Management**: React Context API + Custom Hooks
- **Chart**: Recharts (Pie Chart)
- **Deployment**: Firebase (Client), Vercel (Server)

## 📦 NPM Packages Used

- `react-router-dom`
- `@tanstack/react-query`
- `firebase`
- `axios`
- `react-tag-input`
- `react-toastify`
- `sweetalert2`
- `recharts`
- `@stripe/react-stripe-js` & `@stripe/stripe-js`
- `daisyui`
