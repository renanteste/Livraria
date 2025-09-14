Frontend da Aplicação Livraria
Este é o frontend da aplicação Livraria, desenvolvido com React, Redux Toolkit, Axios, e Vite. Ele consome a API RESTful fornecida pelo backend, permitindo que os usuários visualizem e interajam com gêneros, autores e livros.

📦 Tecnologias Utilizadas
React: Framework para construção da interface do usuário.
Redux Toolkit: Gerenciamento de estado global da aplicação.
Axios: Biblioteca para realizar requisições HTTP à API.
Vite: Ferramenta de build rápida para desenvolvimento e produção.
TailwindCSS: Estilização responsiva (opcional, se estiver sendo usado).
React Router DOM: Roteamento entre páginas.
Zod: Validação de dados nos formulários.
React Hook Form: Manipulação de formulários.
🛠️ Pré-requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

Node.js: Versão 20.19+ ou 22.12+ (https://nodejs.org/ ).
npm: Gerenciador de pacotes do Node.js (vem junto com o Node.js).
Backend rodando: Certifique-se de que o backend está rodando no endereço configurado no .env.
🚀 Como Executar o Projeto
1. Clone o Repositório
Se você ainda não clonou o repositório, faça isso primeiro:
git clone https://github.com/renanteste/Livraria.git
cd Livraria/frontend/web
2. Instale as Dependências
Instale todas as dependências necessárias usando o npm:
npm install
3. Configure a URL da API
No arquivo .env, configure a variável VITE_API_BASE_URL para apontar para o endereço do backend:
VITE_API_BASE_URL=https://localhost:7279/api/v1

4. Inicie o Servidor de Desenvolvimento
Execute o seguinte comando para iniciar o servidor de desenvolvimento:
npm start

O frontend estará disponível no navegador em:
http://localhost:5173

5. Acesse a Aplicação
Abra o navegador e navegue até http://localhost:5173. Você verá a interface do usuário com as funcionalidades disponíveis.

📂 Estrutura do Projeto
A estrutura do diretório web é organizada da seguinte forma:

⚙️ Configuração Adicional
Variáveis de Ambiente
Certifique-se de que o arquivo .env contém as seguintes variáveis:
VITE_API_BASE_URL=https://localhost:7279/api/v1

📞 Contato
Em caso de dúvidas ou sugestões, entre em contato com o autor do projeto:

Nome: Renan
GitHub: https://github.com/renanteste