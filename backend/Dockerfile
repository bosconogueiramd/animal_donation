# Use a imagem oficial do Node.js como base
FROM node:16

# Define o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código do projeto para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "index.js"]
