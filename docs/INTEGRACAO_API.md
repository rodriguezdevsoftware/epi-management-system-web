# Documentação da Integração - API de Autenticação

## Componentes Criados/Atualizados

### 1. **Environments**
- [src/environments/environment.ts](src/environments/environment.ts) - Configuração de desenvolvimento
- [src/environments/environment.prod.ts](src/environments/environment.prod.ts) - Configuração de produção

URL da API: `http://localhost:3000/api`

### 2. **Models**
- [src/app/core/models/auth.model.ts](src/app/core/models/auth.model.ts)
  - `User` - Dados do usuário
  - `AuthResponse` - Resposta da API de autenticação
  - `LoginRequest` - Requisição de login
  - `RegisterRequest` - Requisição de registro
  - `ErrorResponse` - Resposta de erro

### 3. **Interceptor HTTP**
- [src/app/core/interceptors/auth.interceptor.ts](src/app/core/interceptors/auth.interceptor.ts)
  - Adiciona automaticamente o token JWT em todas as requisições
  - Redireciona para login em caso de token inválido (401)

### 4. **AuthService** (Atualizado)
- [src/app/modules/auth/services/auth.service.ts](src/app/modules/auth/services/auth.service.ts)

**Métodos:**
- `login(email, password)` - Faz login e armazena token
- `register(name, email, password)` - Registra novo usuário
- `logout()` - Remove token e redireciona para login
- `isAuthenticated()` - Verifica se usuário está autenticado
- `getToken()` - Retorna token JWT
- `getCurrentUser()` - Retorna dados do usuário
- `getMe()` - Busca dados do usuário na API
- `currentUser$` - Observable com dados do usuário

### 5. **LoginComponent** (Atualizado)
- [src/app/modules/auth/pages/login/login.component.ts](src/app/modules/auth/pages/login/login.component.ts)
  - Integrado com AuthService
  - Tratamento de erros
  - Loading state
  - Validações de formulário

### 6. **AppModule** (Atualizado)
- [src/app/app.module.ts](src/app/app.module.ts)
  - HttpClient configurado
  - AuthInterceptor registrado

---

## Fluxo de Autenticação

1. **Login:**
   - Usuário preenche email e senha
   - `LoginComponent` chama `AuthService.login()`
   - `AuthService` faz POST para `/api/auth/login`
   - Se sucesso: armazena token e dados do usuário, redireciona para `/home`
   - Se erro: exibe mensagem de erro

2. **Requisições Protegidas:**
   - `AuthInterceptor` adiciona header `Authorization: Bearer <token>`
   - Se token inválido/expirado (401), redireciona para login

3. **Logout:**
   - Remove token e dados do localStorage
   - Redireciona para `/login`

4. **Verificação de Autenticação:**
   - `authGuard` verifica `AuthService.isAuthenticated()`
   - Token é decodificado e validado (expiração)

---

## Como Testar

### 1. Iniciar a API (Backend)
```bash
cd /Users/lucianorodriguez/dev/epi-management-system-api
npm run dev
```

### 2. Iniciar o Frontend
```bash
cd /Users/lucianorodriguez/dev/epi-management-system-web
npm start
```

### 3. Acessar a Aplicação
```
http://localhost:4200
```

### 4. Fazer Login
Use as credenciais do usuário default:
- **Email:** rodriguez.dev.software@gmail.com
- **Senha:** 123456

---

## Estrutura de Dados

### Token JWT Armazenado
```
localStorage.setItem('token', 'eyJhbGc...')
```

### Dados do Usuário Armazenados
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Rodriguez Dev",
  "email": "rodriguez.dev.software@gmail.com"
}
```

### Exemplo de Requisição
```typescript
// AuthInterceptor adiciona automaticamente:
Headers: {
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Segurança

✅ Senhas com hash bcrypt no backend  
✅ Token JWT com expiração (7 dias)  
✅ Validação de token em cada requisição  
✅ Interceptor para lidar com tokens expirados  
✅ Validação de email e campos obrigatórios  
✅ CORS configurado no backend  

---

## Troubleshooting

### Erro: "Cannot connect to API"
- Verificar se a API está rodando na porta 3000
- Verificar se MongoDB está rodando
- Verificar URL em `environment.ts`

### Erro: "Token inválido"
- Fazer logout e login novamente
- Verificar se JWT_SECRET é o mesmo na API
- Verificar se token não expirou

### Erro: "CORS"
- Verificar se CORS está habilitado na API
- Verificar origem permitida no backend

---

## Próximos Passos

- [ ] Implementar recuperação de senha
- [ ] Implementar página de registro
- [ ] Adicionar refresh token
- [ ] Implementar perfil do usuário
- [ ] Adicionar roles e permissões
