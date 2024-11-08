# Usa a imagem Node para desenvolvimento
FROM node:14

WORKDIR /app

# Copia os arquivos de dependências e instala
COPY ./package*.json ./
RUN npm install

# Copia todo o código do frontend para o container
COPY . .

# Exponha a porta padrão do dev server do Vue
EXPOSE 8080

# Comando para iniciar o servidor de desenvolvimento com HMR
CMD ["npm", "run", "serve"]
