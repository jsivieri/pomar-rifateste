# 🗃️ CONFIGURAÇÃO SUPABASE - DADOS COMPARTILHADOS

## ✨ O que muda com Supabase:
- ✅ **Dados compartilhados**: Todos veem os mesmos números vendidos
- ✅ **Sorteios permanentes**: Resultados ficam salvos para sempre
- ✅ **Acesso simultâneo**: Várias pessoas podem comprar ao mesmo tempo
- ✅ **Histórico completo**: Todos os sorteios ficam registrados

## 🚀 PASSO A PASSO PARA CONFIGURAR:

### **Etapa 1: Criar conta no Supabase**
1. Acesse: https://supabase.com
2. Clique em "Start your project"
3. Faça login com GitHub (recomendado)

### **Etapa 2: Criar projeto**
1. Clique "New Project"
2. Nome: `rifa-pomar`
3. Database Password: crie uma senha forte
4. Region: South America (São Paulo)
5. Clique "Create new project"
6. ⏱️ Aguarde 2-3 minutos

### **Etapa 3: Criar tabelas**
1. Vá em "Table Editor" (menu lateral)
2. Clique "Create a new table"

**Tabela 1: numeros_vendidos**
```sql
CREATE TABLE numeros_vendidos (
  id SERIAL PRIMARY KEY,
  numero INTEGER NOT NULL UNIQUE,
  comprador TEXT NOT NULL,
  data_compra TIMESTAMPTZ DEFAULT NOW()
);
```

**Tabela 2: sorteios**
```sql
CREATE TABLE sorteios (
  id SERIAL PRIMARY KEY,
  numero_sorteado INTEGER NOT NULL,
  vencedor TEXT NOT NULL,
  data_sorteio TIMESTAMPTZ DEFAULT NOW(),
  total_participantes INTEGER NOT NULL
);
```

### **Etapa 4: Configurar permissões**
1. Vá em "Authentication" → "Policies"
2. Para cada tabela, clique "Enable RLS"
3. Clique "Create Policy" → "Get started quickly"
4. Selecione "Enable read access for all users"
5. Selecione "Enable insert access for all users"
6. Selecione "Enable update access for all users"
7. Selecione "Enable delete access for all users"

### **Etapa 5: Pegar credenciais**
1. Vá em "Settings" → "API"
2. Copie:
   - **Project URL**: `https://xxxxxxxx.supabase.co`
   - **anon public key**: `eyJhbGciOiJIUzI1NiIs...`

### **Etapa 6: Configurar o projeto**
1. Abra o arquivo `api-supabase.js`
2. Substitua:
   ```javascript
   this.supabaseUrl = 'https://xxxxxxxx.supabase.co';
   this.supabaseKey = 'eyJhbGciOiJIUzI1NiIs...';
   ```

### **Etapa 7: Atualizar páginas HTML**
Trocar `api-local.js` por `api-supabase.js` em todas as páginas.

## 🎯 DEPOIS DE CONFIGURADO:
- ✅ Dados ficam salvos para sempre
- ✅ Todos veem os mesmos números vendidos
- ✅ Sorteios ficam registrados
- ✅ Funciona para milhares de pessoas

## 📱 Hospedagem recomendada:
- **Netlify** ou **Vercel**: Deploy automático
- **GitHub Pages**: Simples e gratuito

## 💡 Alternativa Rápida:
Se quiser testar rapidamente, posso configurar um exemplo com Airtable ou Google Sheets como banco de dados!
