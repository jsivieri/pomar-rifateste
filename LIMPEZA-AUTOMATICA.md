# Sistema de Rifa - Funcionalidade de Limpeza Automática

## ✨ Funcionalidade: Limpeza Automática após Sorteio

### 🎯 Como Funciona

Quando um sorteio é realizado com sucesso:

1. **Sorteio é executado** - Um vencedor é escolhido aleatoriamente
2. **Resultado é exibido** - Mostra o vencedor na tela
3. **Limpeza automática** - TODOS os números vendidos são removidos
4. **Nova rifa iniciada** - Sistema fica pronto para uma nova rifa

### 📋 Processo Completo

```
[Sorteio Realizado] → [Vencedor Escolhido] → [Números Limpos] → [Nova Rifa]
```

### 🧹 O que é Limpo

- ❌ **Números vendidos** - Todos voltam a ficar disponíveis
- ❌ **Nomes dos compradores** - Lista zerada para nova rifa
- ❌ **Estado dos números** - Todos ficam verdes (disponíveis)

### 💾 Armazenamento

**Versão Local (localStorage):**
- Números vendidos: Removidos do `localStorage.numerosVendidos`

**Versão Backend (SQLite):**
- Números vendidos: Removidos da tabela `numeros_vendidos`

### 🔄 Fluxo de Nova Rifa

1. **Após o sorteio**: Números ficam disponíveis automaticamente
2. **Acesso às páginas**: Mostram "Nova rifa iniciada!"
3. **Vendas**: Podem começar imediatamente

### 📱 Interface Atualizada

- **Página principal**: Todos os números verdes (disponíveis)
- **Números vendidos**: Mensagem "Nova rifa iniciada!"
- **Página de sorteio**: Contadores zerados
- **Notificação**: Alert confirmando limpeza após sorteio

### 🎉 Vantagens

- **Automatização**: Não precisa limpar manualmente
- **Praticidade**: Nova rifa inicia automaticamente
- **Simplicidade**: Sistema focado apenas na rifa atual

### 🛠️ Configuração

A limpeza automática está ativada por padrão. Se quiser desabilitar:

1. **api-local.js**: Remova a linha `localStorage.removeItem('numerosVendidos')`
2. **server.js**: Remova o comando `DELETE FROM numeros_vendidos`

### 📊 Monitoramento

- **Estatísticas**: Atualizadas automaticamente após limpeza
- **Contadores**: Zerados (0 vendidos, 150 restantes)
- **Estado**: Todos os números ficam disponíveis
