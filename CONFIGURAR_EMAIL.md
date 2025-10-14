# 📧 CONFIGURAÇÃO EMAIL AUTOMÁTICO

## ✨ O que você ganha:
- ✅ **Email automático** a cada nova compra
- ✅ **Relatório completo** com todos os nomes
- ✅ **Gratuito** - 200 emails/mês
- ✅ **Instantâneo** - Recebe na hora

## 🚀 PASSO A PASSO EMAILJS:

### **1. Criar conta EmailJS**
1. Acesse: https://www.emailjs.com
2. Clique "Sign Up"
3. Escolha "Personal" (gratuito)
4. Confirme email

### **2. Conectar seu email**
1. Vá em "Email Services"
2. Clique "Add New Service"
3. Escolha seu provedor:
   - **Gmail** (recomendado)
   - **Outlook**
   - **Yahoo**
   - Etc.
4. Conecte sua conta
5. **Anote o Service ID** (ex: `service_abc123`)

### **3. Criar template de email**
1. Vá em "Email Templates"
2. Clique "Create New Template"
3. **Subject:** `Nova Compra Rifa Pomar - Número {{numero_comprado}}`
4. **Content (HTML):**
```html
<h2>🎯 Nova Compra Registrada!</h2>

<p><strong>Número:</strong> {{numero_comprado}}</p>
<p><strong>Comprador:</strong> {{nome_comprador}}</p>
<p><strong>Sistema:</strong> Rifa Pomar</p>

<hr>

<h3>📋 RELATÓRIO COMPLETO:</h3>
<pre>{{relatorio_completo}}</pre>

<hr>

<p><em>Email enviado automaticamente pelo sistema da Rifa Pomar</em></p>
```
5. **Anote o Template ID** (ex: `template_def456`)

### **4. Pegar chave pública**
1. Vá em "Account" → "General"
2. **Anote a Public Key** (ex: `ghi789jkl`)

### **5. Configurar no projeto**
1. Abra o arquivo `email-system.js`
2. Substitua as configurações:

```javascript
this.emailConfig = {
    serviceId: 'service_abc123',        // Seu Service ID
    templateId: 'template_def456',      // Seu Template ID  
    publicKey: 'ghi789jkl',            // Sua Public Key
    emailDestino: 'seu-email@gmail.com' // SEU EMAIL
};
```

### **6. Testar**
1. Abra o console (F12)
2. Digite:
```javascript
EmailSystem.enviarRelatorioManual()
```
3. Verifique se recebeu o email

## 📧 EXEMPLO DE EMAIL QUE VOCÊ RECEBERÁ:

```
Assunto: Nova Compra Rifa Pomar - Número 087

🎯 Nova Compra Registrada!

Número: 087
Comprador: Maria Silva
Sistema: Rifa Pomar

───────────────────────────────────

📋 RELATÓRIO COMPLETO:

RELATÓRIO RIFA POMAR - 14/10/2025 às 15:30:45

✅ Total de rifas vendidas: 12

NÚMEROS E COMPRADORES:
═══════════════════════════════════
Número 003: João Santos
Número 015: Ana Costa
Número 027: Pedro Oliveira
Número 087: Maria Silva
Número 091: Lucia Fernandes
Número 108: Carlos Mendes
...
═══════════════════════════════════

Relatório gerado automaticamente pelo sistema da Rifa Pomar
Enviado em: 14/10/2025 às 15:30:45
```

## ⚙️ CONFIGURAÇÃO AVANÇADA:

### **Para usar Gmail:**
1. Ative autenticação de 2 fatores
2. Gere senha de app
3. Use essa senha no EmailJS

### **Limites gratuitos:**
- ✅ **200 emails/mês**
- ✅ **Perfeito para rifas escolares**

### **Se der erro:**
1. Verifique as credenciais
2. Teste email manual
3. Veja console do navegador (F12)

## 🎯 DEPOIS DE CONFIGURADO:

- ✅ **Cada compra** enviará email automático
- ✅ **Relatório completo** sempre atualizado
- ✅ **Zero trabalho manual**
- ✅ **Backup por email** de todos os nomes

---

**📧 Nunca mais perca uma compra! Tudo chega automaticamente no seu email.**
