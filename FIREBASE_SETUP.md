# 🔥 CONFIGURAÇÃO FIREBASE - DADOS COMPARTILHADOS

## ✨ O que você ganha com Firebase:
- ✅ **Dados em tempo real**: Todos veem as compras instantaneamente
- ✅ **100% gratuito**: Para uso escolar
- ✅ **Fácil configuração**: 10 minutos
- ✅ **Confiável**: Google mantém funcionando

## 🚀 PASSO A PASSO:

### **1. Criar projeto Firebase**
1. Acesse: https://console.firebase.google.com
2. Clique "Criar um projeto"
3. Nome: `rifa-pomar-escola`
4. Desabilite Google Analytics (não precisa)
5. Clique "Criar projeto"

### **2. Configurar Realtime Database**
1. No menu lateral: "Realtime Database"
2. Clique "Criar banco de dados"
3. Escolha "Começar no modo de teste"
4. Localização: "us-central1"
5. Clique "Concluído"

### **3. Configurar regras de segurança**
1. Vá na aba "Regras"
2. Substitua o conteúdo por:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
3. Clique "Publicar"

### **4. Obter configurações**
1. Clique no ícone de engrenagem ⚙️
2. "Configurações do projeto"
3. Role até "Seus apps"
4. Clique no ícone da web `</>`
5. Nome do app: `rifa-pomar`
6. **NÃO** marque Firebase Hosting
7. Clique "Registrar app"
8. **COPIE** as configurações que aparecem:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "rifa-pomar-escola.firebaseapp.com",
  databaseURL: "https://rifa-pomar-escola-default-rtdb.firebaseio.com/",
  projectId: "rifa-pomar-escola",
  storageBucket: "rifa-pomar-escola.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

### **5. Configurar no projeto**
1. Abra o arquivo `api-firebase.js`
2. Substitua a seção `this.config = {` pelas suas configurações:

```javascript
this.config = {
    apiKey: "SUA_API_KEY_COPIADA",
    authDomain: "rifa-pomar-escola.firebaseapp.com",
    databaseURL: "https://rifa-pomar-escola-default-rtdb.firebaseio.com/",
    projectId: "rifa-pomar-escola",
    storageBucket: "rifa-pomar-escola.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123def456"
};
```

### **6. Atualizar páginas HTML**
Trocar a linha:
```html
<script src="api-local.js"></script>
```

Por:
```html
<script src="api-firebase.js"></script>
```

Em todos os arquivos: `index.html`, `pagina2.html`, `pagina3.html`

## ✅ PRONTO! 

Agora qualquer pessoa que acessar o site:
- ✅ **Verá os mesmos números vendidos**
- ✅ **Poderá comprar números**
- ✅ **Verá compras em tempo real**
- ✅ **Backup automático dos sorteios**

## 💾 SISTEMA DE BACKUP:
- ✅ **Backup automático** quando realizar sorteio
- ✅ **Arquivo .txt baixado** automaticamente
- ✅ **Contém todos os participantes** e o vencedor
- ✅ **Salvo também no Firebase** (se configurado)
- ✅ **Backup local** no navegador como segurança

## 🎯 VANTAGENS:
- **Grátis para sempre** (uso escolar)
- **Funciona no celular** e computador
- **Dados nunca se perdem**
- **Múltiplas pessoas** podem usar simultaneamente
- **Backup completo** de todos os sorteios

## 🔧 Se der erro:
1. Verifique se copiou as configurações corretas
2. Verifique se as regras de segurança estão como mostrado
3. Teste primeiro no localhost
4. Depois faça deploy para GitHub Pages ou Netlify

## 💡 Dica:
Mantenha o arquivo `api-local.js` como backup. Se der problema com Firebase, é só trocar de volta!
