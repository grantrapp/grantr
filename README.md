<div align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="./frontend/public/logo.png">
        <img alt="Imagine using light mode" src="./frontend/public/logo_dark.png" height="70">
    </picture>
    <h1>Grantr</h1>
    <strong>Connecting Everyone to Funding 💸</strong>
</div>
<br>
<div align="center">
    <a href="https://edgeserver.io/?utm_source=github&utm_campaign=oss">
        <img src="https://img.shields.io/badge/edgeserver-deployed-cyan" alt="Edgeserver">
    </a>
    <a href="https://github.com/grantrapp/grantr/commits/master">
        <img src="https://badgen.net/github/last-commit/grantrapp/grantr" alt="Last Commit">
    </a>
    <br />
    <a href="https://github.com/grantrapp/grantr/blob/master/LICENSE">
        <img src="https://badgen.net/gitlab/license/lenster/lenster" alt="Licence">
    </a>
    <a href="https://discord.gg/RDmuVjy23E">
        <img src="https://img.shields.io/discord/986316109399605338.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" alt="Discord">
    </a>
    <a href="https://twitter.com/grantrapp">
        <img src="https://img.shields.io/twitter/follow/grantrapp?label=grantrapp&style=flat&logo=twitter&color=1DA1F2" alt="Grantr Twitter">
    </a>
</div>
<div align="center">
    <br>
    <a href="https://grantr.app"><b>grantr.app »</b></a>
    <br><br>
</div>

## 💸 About Grantr

Grantr is a curated list of grant programmes @ [Grantr App](http://grantr.app/) 💸

## 🤝 Collaboration

We are trying to stay the most up-to-date on the latest Grants! If you think there is information missing, or we made a mistake, don't hesistate to reach out to [defigirlxoxo](https://twitter.com/defigirlxoxo) and get us back up to date.

## ⚙️ Setup

### Using Hosted Backend Environment (Recommended)

```sh
cd frontend
cp .env.production .env.local
pnpm
pnpm dev
```

and visit http://localhost:1234

### Using Full Local Environment (Docker)

```sh
docker-compose up
```

### Using Full Local Environment (Manual)

Setup frontend
```sh
cd frontend
pnpm
pnpm dev
```

Setup backend
```sh
cd backend
cp .env.example .env
pnpm
pnpm dev
```

and visit http://localhost:1234

## ⚖️ License

Grantr is open-sourced software licensed under the © [GNU General Public License v3.0](LICENSE).