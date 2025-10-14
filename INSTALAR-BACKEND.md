# Como Instalar o Backend Completo

## Situação Atual
O sistema está funcionando com `api-local.js` que usa localStorage para armazenar os dados. Isso significa que:
- ✅ Funciona imediatamente
- ✅ Não precisa de servidor
- ❌ Dados ficam apenas no navegador
- ❌ Se limpar o cache, perde os dados

## Para Usar o Backend Completo (Opcional)

### 1. Instalar Node.js
1. Acesse: https://nodejs.org/
2. Baixe e instale a versão LTS (recomendada)
3. Reinicie o computador após a instalação

### 2. Verificar Instalação
Abra o PowerShell e digite:
```powershell
node --version
npm --version
```
Deve mostrar as versões instaladas.

### 3. Instalar Dependências
No PowerShell, navegue até a pasta do projeto:
```powershell
cd "c:\Users\KMIKZ\Desktop\Nova pasta\pomar-rifateste"
npm install
```

### 4. Trocar para API do Servidor
Edite os arquivos HTML e troque:
```html
<script src="api-local.js"></script>
```
Por:
```html
<script src="api.js"></script>
```

### 5. Iniciar o Servidor
```powershell
npm start
```

### 6. Acessar o Sistema
Abra o navegador em: http://localhost:3000

## Vantagens do Backend Completo
- ✅ Dados salvos permanentemente no banco SQLite
- ✅ Múltiplos usuários podem acessar simultaneamente
- ✅ Histórico completo de sorteios
- ✅ Backup fácil (arquivo rifa.db)
- ✅ API REST para integrações

## Sistema Atual (Sem Backend)
- ✅ Funciona perfeitamente para uso local
- ✅ Não precisa instalação
- ✅ Ideal para teste e demonstração
- ✅ Todos os recursos funcionais
- ✅ **Proteção por senha no sorteio (senha: 9248)**

## Funcionalidades de Segurança
- **Senha para sorteio**: O botão "SORTEAR" agora exige senha
- **Senha configurada**: 9248 (oculta no código)
- **Interface elegante**: Modal moderno para digitação da senha
- **Proteção tanto local quanto no backend**
