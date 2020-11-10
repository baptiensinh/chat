<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://en.uit.edu.vn/sites/vi/files/banner_en.png" alt="@onepiecehung"/>
    </a>
</p>

<hr> 

## NodeJS Sharing images powered by <a href="https://github.com/360AnimeTeam">@360AT</a>

#### Member <a href="https://github.com/onepiecehung">@onepiecehung</a>, <a href="https://github.com/ds112">@ds112</a>, <a href="https://github.com/kaitouhung">@kaitouhung</a>, <a href="https://github.com/nganngongongan">@nganngongongan</a>, <a href="https://github.com/baptiensinh">@baptiensinh</a>

[![js-standard-style](https://img.shields.io/badge/Build-1906.19-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Docker Repository on Quay.io](https://quay.io/repository/jzelinskie/chihaya/status "Docker Repository on Quay.io")](https://quay.io/repository/jzelinskie/chihaya)
[![Go Report Card](https://goreportcard.com/badge/github.com/chihaya/chihaya)](https://goreportcard.com/report/github.com/chihaya/chihaya)
[![GoDoc](https://godoc.org/github.com/chihaya/chihaya?status.svg)](https://godoc.org/github.com/chihaya/chihaya)
[![License](https://img.shields.io/badge/license-BSD-blue.svg)](https://en.wikipedia.org/wiki/BSD_licenses#2-clause_license_.28.22Simplified_BSD_License.22_or_.22FreeBSD_License.22.29)
[![IRC Channel](https://img.shields.io/badge/freenode-%233AT-blue.svg "IRC Channel")](http://https://github.com/360AnimeTeam)

<hr>

# Setup and installation 

```
$ git clone https://github.com/daisukiii/nodejs-img.git
```

1. Install <b>Xampp</b> or something else like that <a href="https://www.apachefriends.org">Download xampp</a>

2. Import database

```python
import file `nodejsimages.sql` to your database
```

> #### You can see: <a href="https://paste.ofcode.org/Hdv2ueBu2KaYmmFzWZDg7J"><b>Example</b></a>


## Config file _database_ in file server.js

```javascript
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejsimages",
});
```

```git
$ npm install
```

```git
$ npm start
```

## Done

```python
Go to: `localhost:9999` 
```

```python
Account for test:
└── User normal/
    ├── User 1/ => (yourdomain.com/)
    │     ├── ID: admin@admin.com
    │     └── Password: 1
    ├── User (See in database)
    └── User admin/ => (yourdomain.com/admin)
          ├── ID: admin@gmail.com
          └── Password: admin
```

## Demo

[![IMAGE ALT TEXT HERE](https://i.imgur.com/Kq0NZlo.png)](https://drive.google.com/file/d/1fRNA_DRubaMPRZCuO6m5JBv4CoCnkhc6/preview)

## List function

```python
root/
└── Login and regsiter/
      ├── Search (for title or decription)
      ├── Login
      └── Regsiter
```

```python
User not login/
└──Upload/
      ├── Reaction
      ├── Comments (login with FB, GG, TW, etc.)
      └── Share (FB, TW, etc )
```

```python
User login/
└── User normal/
    ├── image/
    │   ├── Reaction
    │   ├── Comments (login with FB, GG, TW, etc.)
    │   ├── Share (FB, TW, etc )
    │   ├── Edit image (Title, Description)
    │   ├── Delete Image
    │   ├── Upload image
    │   └── Download
    └── Manage/
        ├── Change password
        ├── Change avatar
        ├── Photo library
        ├── Photo management
        └── Mesenage - (It is not in barch "master", See it in barch "chat")
```

```javascript
User login/
└── User admin/
    ├── image/
    │   ├── Photo management
    │   ├── Delete comments (login with FB, GG, TW, etc.)
    │   ├── Edit image (Title, Description)
    │   ├── Delete Image
    │   ├── Restore image
    │   └── Download
    ├── User/
    │   ├── Add user
    │   ├── User management.
    │   ├── Ban/Delete user
    │   ├── View list user
    │   └── View list user delete
    └── Dashboard/
        ├── Total user 
        ├── Total image with login 
        ├── Total images verify with login 
        ├── Total images pending verify with login 
        ├── Total image without login 
        ├── Total images verify without login 
        └── Total images pending verify without login 
```

# Image example

> ### Login

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/KYxDbsN.png" alt="@onepiecehung"/>
    </a>
</p>

> ### Regsiter

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/zyarFR5.png" alt="@onepiecehung"/>
    </a>
</p>

> ### Home

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/GHcT2Vq.png" alt="@onepiecehung"/>
    </a>
</p>

> ### After upload image

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/kvfUDmh.png" alt="@onepiecehung"/>
    </a>
</p>

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/G7ET94q.png" alt="@onepiecehung"/>
    </a>
</p>

> ### Profile

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/O5Uc8t5.png" alt="@onepiecehung"/>
    </a>
</p>

> ### Change avatar

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/pRnoLyX.png" alt="@onepiecehung"/>
    </a>
</p>

> ### Change password

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/EJUPVB6.png" alt="@onepiecehung"/>
    </a>
</p>

> ### Edit image

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/ZAdTNJ6.png" alt="@onepiecehung"/>
    </a>
</p>

> ### Upload image

<p align="center">
    <a href="https://github.com/onepiecehung">
        <img src="https://imgur.com/q4Qky1A.png" alt="@onepiecehung"/>
    </a>
</p>
