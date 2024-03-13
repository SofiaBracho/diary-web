<div align="center">
  <h1 align="center">Mini Diary Web</h1>
</div>
<br/>

<div align="center">

[![made-with-php](https://img.shields.io/badge/Made%20with-PHP-1f425f.svg)](https://www.php.net/)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com)
<br/>
<br/>
<a href="https://www.linkedin.com/in/sofiabrach0/">
![LinkedIn Badge](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=fff&style=for-the-badge)
</a>
<a href="https://github.com/SofiaBracho">
![GitHub Badge](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=fff&style=for-the-badge)
</a>
</div>


A web-based diary application for writing private journal entries. Inspired on MiniDiary desktop app ([by Samuel Meuli](https://github.com/samuelmeuli)).


## ⚙️ Key Features
- **Minimalistic interface**: focus on writing without distractions

- **User registration and login**: keep your journal private and secure 

- **Chronological entry listing**: easily look back on what you've written

- **Entry pagination**: load older entries seamlessly

- **Write new entries via form**: inputing title, date, and text 

- **JSON export**: download your entries as a `.json` file

- **JSON import**: restore entries from backup


## 🖥️ Demo

![Diary Demo GIF](https://github.com/SofiaBracho/diary-web/blob/master/img/demo.gif)


## 📱 User Experience

- Intuitive journaling interface allows quick capture of daily thoughts

- Login keeps entries private, useful for personal reflection

- Pagination and chronological sorting make it easy to look back

- Exporting as JSON provides backup and portability

- Seamless JSON import enables restoring entries if needed

Mini Diary Web provides a straightforward way to journal online with key features for security, portability, and convenience. The minimalist design focuses on writing without distractions. An excellent web-based companion to the MiniDiary desktop application.



## 🖇️ Views
This application uses only three views, wich are described next:

- **Home page**: Has a form to compose your journal entries, an export and logout button on the top of the page, and a listing of the latest entries using a pagination.

![Login view](https://github.com/SofiaBracho/diary-web/blob/master/img/index.jpg)

- **Login**: Handles user login by checking if provided credentials match those stored in the database and redirects accordingly. If not logged in, shows an alert to the user.

![Login view](https://github.com/SofiaBracho/diary-web/blob/master/img/login.jpg)

- **Register**: Allows to register a new user account with username and password.


## 🛠️ Getting Started

### Prerequisites

Here's what you need to be able to run this App:

- XAMPP (PHP, MySQL)

### 1. Clone the repository
Inside the `C:\xampp\htdocs` folder, execute the following commands:

```shell
git clone https://github.com/SofiaBracho/diary-web
cd diary-web
```

### 2. Export database from `diary.sql` file
Open your MySQL database manager and click export, then select the `diary.sql` file in the project directory.

### 3. Run local server
Open XAMPP control panel and select start PHP and start MySQL, then access localhost on your browser. Finally open the route of the project folder inside the `htdocs` folder.

### 4. Open the App in your local host

```shell
http://localhost/diary-web/
```

### 5. Register and login

Create your user account clicking the register button, then login into the form using the login form.


## 🔀 Contributing

Mini-Diary is an open-source project and anyone from the community is invited to contribute. If you'd like to, fork the repository and make changes. Pull requests are welcome.

### 👥 Author

<a href="https://github.com/SofiaBracho">
  <img src="https://github.com/SofiaBracho/diary-web/blob/master/img/author.png" width="50px" alt="Author"/>
</a>

**Sofia Bracho**
<br>
Web developer