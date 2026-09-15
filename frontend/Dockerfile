# Étape 1 : Build de l'application React/Vite
FROM node:20-alpine AS builder

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./
RUN npm ci

# Copie du code source
COPY . .

# Build de production
RUN npm run build

# Étape 2 : Serveur web Nginx
FROM nginx:alpine

# Copie des fichiers buildés depuis l'étape 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuration Nginx pour le routage côté client (SPA) et le proxy API
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
