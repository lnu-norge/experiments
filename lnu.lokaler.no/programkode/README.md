# LNU Lokaler

> Work In Progress

Denne kodebasen består av 2 deler:
- Backend
- Frontend

# Utvikling

Alle instanser av hvor karakteren `~` er tatt i bruk, er da en referanse til hvor rotmappen til denne kodebasen befinner seg. Det vil si mappen du finner denne `README.md`-filen i.

## Fullstack m/ Docker

Rediger `/etc/hosts` slik at følgende domener peker til Docker-host:
- `backend.lokaler.lnu.test`
- `frontend.lokaler.lnu.test`

```bash
$ cd ~/backend/nginx/certs
$ mkcert "*.lokaler.lnu.test"
$ cd ~
$ docker-compose -f development.yml up -d
```

## Frontend

```bash
$ cd ~/frontend
$ yarn start
```
