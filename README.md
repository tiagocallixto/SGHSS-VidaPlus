# Sistema de Gestão Hospitalar e Saúde Suplementar (SGHSS)

Sistema desenvolvido para apoiar processos clínicos e administrativos de instituições de saúde, oferecendo recursos para cadastro de pacientes, gerenciamento de prontuários, consultas, internações e auditoria de ações. O projeto utiliza arquitetura RPC tipada com **tRPC**, integrado ao **Next.js** e **Drizzle ORM**, priorizando segurança, consistência e rastreabilidade das informações.

---

## 🚀 Tecnologias Utilizadas

- **Next.js** – Framework React para frontend e backend integrado  
- **tRPC** – API RPC tipada para comunicação cliente-servidor  
- **TypeScript** – Tipagem estática e segurança em tempo de desenvolvimento  
- **Drizzle ORM** – Mapeamento e operações no banco de dados  
- **Zod** – Validação de dados e schemas  
- **PostgreSQL** (ou outro DB configurado) – Persistência  
- **Auth Middleware** – Proteção de rotas e procedimentos sensíveis  

---

## 📌 Funcionalidades Principais

### 🧑‍⚕️ Módulo de Pacientes
- Cadastro de pacientes com validação de CPF  
- Atualização, listagem e exclusão (soft delete)  
- Geração automática de prontuário no momento do cadastro  
- Consulta a prontuário e atualizações subsequentes  

### 📄 Prontuários
- Criação automática  
- Registro de histórico clínico  
- Registro de observações e atualizações  
- Auditoria completa das alterações  

### 📅 Consultas e Atendimento
- Controle de consultas (listagem, criação e atualização)  
- Registro de datas e horários  
- Associação ao paciente  

### 🏥 Internações
- Cadastro de internações  
- Registro de datas, leitos e responsáveis  

### 🔐 Auditoria e Segurança
- Registro completo de ações (CREATE, UPDATE, READ, DELETE)  
- Logs armazenados no banco  
- Autenticação obrigatória para operações sensíveis  
- Validação rigorosa com Zod  

---

## 🧩 Arquitetura da API (tRPC)

O sistema utiliza arquitetura **RPC tipada**, onde cada módulo expõe procedimentos:

