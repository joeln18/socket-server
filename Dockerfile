# Usa una imagen oficial de Node.js
FROM node:22-alpine

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias y luego instálalas
COPY package*.json ./
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto (ajusta si usas otro)
EXPOSE 3001

# Comando para correr tu servidor
CMD [ "node", "index.js" ]