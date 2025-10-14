# Sistema de Rifa - 5º Ano Pomar

Sistema completo para vendas e sorteios de rifas com backend para armazenamento permanente dos dados.

## Características

- ✅ Interface moderna com design futurista
- ✅ Venda de números de rifa
- ✅ Visualização de números vendidos
- ✅ Sistema de sorteio com animações
- ✅ Backend com Node.js e SQLite
- ✅ Armazenamento permanente dos dados
- ✅ API REST para todas as operações
- ✅ Fallback para localStorage quando offline

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Banco de Dados**: SQLite
- **API**: REST

## Instalação e Configuração

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (geralmente vem com o Node.js)

### Passos para instalação

1. **Instalar dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor**:
   ```bash
   npm start
   ```
   
   Ou para desenvolvimento com auto-reload:
   ```bash
   npm run dev
   ```

3. **Acessar o sistema**:
   Abra seu navegador e acesse: `http://localhost:3000`

## Estrutura do Projeto

```
# Rifa 5º Ano Pomar

Sistema de rifa online para arrecadação de fundos dos alunos do 5º ano.

## 🎯 Funcionalidades

- Sistema de compra de números de rifa
- Visualização de números vendidos
- Sorteio protegido por senha
- Interface responsiva
- Armazenamento local dos dados

## 🚀 Como usar

1. **Página Principal**: Compre números da rifa clicando nos números disponíveis
2. **Números Vendidos**: Veja todos os números já vendidos e compradores
3. **Realizar Sorteio**: Acesso protegido por senha para sortear o vencedor

## 🔧 Tecnologias

- HTML5
- CSS3
- JavaScript
- LocalStorage

## 📱 Compatibilidade

- Funciona em todos os navegadores modernos
- Design responsivo para mobile e desktop
- Dados salvos localmente no navegador

## 🎨 Design

Visual inspirado no logo da escola com cores naturais:
- Verde das árvores
- Marrom do tronco
- Tons terrosos

---

Desenvolvido para a escola Pomar - Turma do 5º ano/
├── index.html          # Página principal - venda de rifas
├── pagina2.html         # Visualização de números vendidos
├── pagina3.html         # Página de sorteio
├── api.js              # Configuração e funções da API
├── server.js           # Servidor backend
├── package.json        # Dependências do projeto
├── rifa.db             # Banco de dados SQLite (criado automaticamente)
└── README.md           # Este arquivo
```

## API Endpoints

### GET `/api/numeros-vendidos`
Retorna todos os números vendidos.

### POST `/api/comprar-numero`
Registra a compra de um número.
```json
{
  "numero": 15,
  "comprador": "João Silva"
}
```

### POST `/api/sortear`
Realiza um sorteio entre os números vendidos.

### GET `/api/estatisticas`
Retorna estatísticas da rifa (total vendido, restantes, etc.).

### GET `/api/sorteios`
Retorna histórico de todos os sorteios realizados.

### DELETE `/api/numeros-vendidos/:numero`
Cancela/remove um número vendido.

## Banco de Dados

O sistema usa SQLite com duas tabelas principais:

- **numeros_vendidos**: Armazena os números vendidos e compradores
- **sorteios**: Armazena o histórico de sorteios realizados

## Funcionalidades

### Venda de Rifas (index.html)
- Grid visual com 150 números
- Clique para comprar um número
- Modal de confirmação com nome do comprador
- Números vendidos aparecem marcados

### Números Vendidos (pagina2.html)
- Lista de todos os números vendidos
- Nome dos compradores
- Estatísticas de vendas

### Sorteio (pagina3.html)
- Contagem regressiva animada
- Sorteio aleatório entre números vendidos
- Animações e efeitos visuais
- Histórico de sorteios

## Personalização

### Configurar número de rifas
Para alterar o total de rifas de 150 para outro número, edite:
- `server.js`: Variável na rota de estatísticas
- `index.html`: Loop de geração dos números
- `pagina2.html`: Valor nas estatísticas

### Configurar valor da rifa
Edite o valor em `index.html` na seção do header.

### Configurar prêmio e data
Edite as informações em `index.html` na seção do header.

## Segurança

- Validação de dados no backend
- Verificação de números já vendidos
- Tratamento de erros
- Sanitização de entradas

## Backup e Restauração

O banco de dados SQLite (`rifa.db`) contém todos os dados. Para backup:
1. Copie o arquivo `rifa.db`
2. Para restaurar, substitua o arquivo

## Troubleshooting

### Servidor não inicia
- Verifique se o Node.js está instalado
- Execute `npm install` novamente
- Verifique se a porta 3000 está disponível

### Dados não salvam
- Verifique se o servidor está rodando
- Abra o console do navegador para ver erros
- O sistema usa localStorage como fallback

### Erro de conexão com API
- Confirme que o servidor está rodando na porta 3000
- Verifique a configuração em `api.js`

## Licença

MIT License