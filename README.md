# 📚 Livraria - Desafio Siemens Energy

Sistema de gerenciamento de **Gêneros**, **Autores** e **Livros**, desenvolvido em **.NET 8 / C#** (backend) e **React (TypeScript)** (frontend).  
Este projeto faz parte do desafio técnico para a vaga de **Desenvolvedor .NET / ReactJS**.

---

## 🚀 Tecnologias Utilizadas

### Backend
- .NET 8 (C#)
- ASP.NET Core Web API
- Entity Framework Core 8
- Pomelo.EntityFrameworkCore.MySql
- Swagger (documentação da API)
- Clean Architecture (Domain, Application, Infrastructure, Api)

### Frontend
- React (TypeScript)
- Vite
- Axios (requisições HTTP)
- React Router DOM

### Banco de Dados
- MySQL 8

---

## 📂 Estrutura do Projeto
<img width="422" height="276" alt="image" src="https://github.com/user-attachments/assets/0bec51dd-8c57-4511-ae84-a8e7ddc744de" />

Livraria/
│
├─ backend/
│ ├─ Livraria.Api/ # API (controllers, startup)
│ ├─ Livraria.Application/ # DTOs, Services
│ ├─ Livraria.Domain/ # Entities, Interfaces
│ ├─ Livraria.Infrastructure/ # DbContext, Repositories
│ └─ Tests/ # (opcional) testes unitários
│
├─ frontend/
│ └─ web/ # Aplicação React (TypeScript)
│
└─ README.md # Este arquivo


---

## ⚙️ Configuração e Execução

### 🔹 1. Pré-requisitos
- [Visual Studio 2022](https://visualstudio.microsoft.com/) (ou VS Code com extensão C#)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js (LTS)](https://nodejs.org/) + npm ou yarn
- MySQL 8 instalado e rodando localmente

---

### 🔹 2. Banco de Dados
Crie o banco de dados no MySQL:

```sql
CREATE DATABASE LivrariaDb;

📄 backend/Livraria.Api/appsettings.json

{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=LivrariaDb;User=root;Password=@Foursys2022;"
  }
}

cd backend
dotnet restore
dotnet build
dotnet ef database update -p .\Livraria.Infrastructure\Livraria.Infrastructure.csproj -s .\Livraria.Api\Livraria.Api.csproj

dotnet run --project .\Livraria.Api\Livraria.Api.csproj


4. Frontend
cd frontend/web
Instale as dependências:

npm install


Execute o projeto:

npm run dev


O frontend estará disponível em:

👉 http://localhost:5173

Instale as dependências:

npm install


Execute o projeto:

npm run dev


O frontend estará disponível em:

👉 http://localhost:5173

✅ Testes

Para rodar os testes (se implementados):

cd backend
dotnet test

👨‍💻 Autor

Desenvolvido por Renan – desafio técnico Siemens Energy.
GitHub: renanteste
