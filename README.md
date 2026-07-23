# 💬 Random Quote Generator

A responsive quote generator that displays inspirational quotes using an online-first strategy with a local offline fallback to ensure quotes are always available.

## 🚀 Overview

This project consumes public quote APIs while maintaining a local quote database as a fallback whenever internet connectivity is unavailable. It demonstrates asynchronous JavaScript, API consumption, graceful error handling, and progressive enhancement.

## ✨ Features

- Generate random inspirational quotes
- Online API integration
- Offline local quote database
- Automatic API fallback
- Copy quote to clipboard
- Share quotes on Twitter/X
- Loading spinner while fetching data
- Prevents immediate duplicate quotes

## 🛠 Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Fetch API
- Async/Await

## 📦 Installation

1. Clone this repository

```bash
git clone https://github.com/BoiMezie/random-quote-generator.git
```

2. Open the project folder
3. Launch `index.html`

## 📸 Screenshots
<img width="897" height="830" alt="quote-landing-page" src="https://github.com/user-attachments/assets/0768f302-110f-4e02-b18d-069a0e540bc0" />
<img width="897" height="830" alt="generated-quote-and-share-menu" src="https://github.com/user-attachments/assets/7f1e12a6-1868-46e1-9135-8cf3c6350abd" />


## 📚 Lessons Learned

This project strengthened my understanding of:
- Fetch API
- Async/Await
- Promise handling
- Error handling
- Fallback strategiese
- API integration
- DOM manipulation
-  Clipboard API

## 🚀 Future Improvements

- Cache-first architecture with background refresh
- Replace alerts with toast notifications
- Multiple quote providers with parser configuration
- Favorite quotes using LocalStorage
- Search by author
- Filter by category
- Quote history
- Better loading UX
