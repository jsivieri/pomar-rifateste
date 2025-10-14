// ========== API GOOGLE SHEETS - MAIS SIMPLES ==========
// Esta versão usa Google Sheets como banco de dados
// Não precisa configurar nada, só criar uma planilha!

class GoogleSheetsAPI {
    constructor() {
        // URL da planilha Google Sheets publicada como API
        // Instruções de como criar estão no arquivo GOOGLE_SHEETS_SETUP.md
        this.spreadsheetId = 'SEU_ID_DA_PLANILHA_AQUI';
        this.apiKey = 'SUA_CHAVE_API_AQUI';
        this.baseUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
    }

    // Verificar se está configurado
    isConfigured() {
        return this.spreadsheetId !== 'SEU_ID_DA_PLANILHA_AQUI' && 
               this.apiKey !== 'SUA_CHAVE_API_AQUI';
    }

    // Buscar números vendidos
    async getNumerosVendidos() {
        if (!this.isConfigured()) {
            throw new Error('Google Sheets não configurado');
        }

        try {
            const url = `${this.baseUrl}/${this.spreadsheetId}/values/numeros_vendidos!A:C?key=${this.apiKey}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Erro ao acessar planilha');
            }

            const data = await response.json();
            const rows = data.values || [];
            
            const numerosObj = {};
            // Pular cabeçalho (primeira linha)
            for (let i = 1; i < rows.length; i++) {
                const [numero, comprador] = rows[i];
                if (numero && comprador) {
                    numerosObj[numero] = comprador;
                }
            }

            return numerosObj;
        } catch (error) {
            console.error('Erro Google Sheets:', error);
            throw error;
        }
    }

    // Para inserção, você precisaria usar Google Apps Script
    // Por enquanto, usar como somente leitura
    async comprarNumero(numero, comprador) {
        throw new Error('Para compras, use a versão Supabase ou mantenha localStorage');
    }

    async realizarSorteio() {
        throw new Error('Para sorteios, use a versão Supabase ou mantenha localStorage');
    }

    async getEstatisticas() {
        try {
            const numerosVendidos = await this.getNumerosVendidos();
            const vendidos = Object.keys(numerosVendidos).length;
            
            return {
                vendidos: vendidos,
                total_rifas: 150,
                percentual: ((vendidos / 150) * 100).toFixed(1)
            };
        } catch (error) {
            return { vendidos: 0, total_rifas: 150, percentual: '0.0' };
        }
    }
}

// ========== SOLUÇÃO HÍBRIDA MAIS PRÁTICA ==========
// Usa localStorage para compras/sorteios E Google Sheets para visualização

class HybridAPI {
    constructor() {
        this.sheetsAPI = new GoogleSheetsAPI();
    }

    async getNumerosVendidos() {
        // Tentar buscar do Google Sheets primeiro (dados compartilhados)
        if (this.sheetsAPI.isConfigured()) {
            try {
                return await this.sheetsAPI.getNumerosVendidos();
            } catch (error) {
                console.log('Sheets indisponível, usando localStorage');
            }
        }

        // Fallback para localStorage
        return JSON.parse(localStorage.getItem('numerosVendidos')) || {};
    }

    async comprarNumero(numero, comprador) {
        // Verificar se já está vendido
        const numerosVendidos = await this.getNumerosVendidos();
        if (numerosVendidos[numero]) {
            throw new Error('Número já foi vendido!');
        }

        // Salvar no localStorage
        const localVendidos = JSON.parse(localStorage.getItem('numerosVendidos')) || {};
        localVendidos[numero] = comprador;
        localStorage.setItem('numerosVendidos', JSON.stringify(localVendidos));

        // TODO: Enviar para Google Sheets via Google Apps Script
        // Por enquanto, funciona com localStorage
    }

    async realizarSorteio() {
        const numerosVendidos = await this.getNumerosVendidos();
        const numerosDisponiveis = Object.keys(numerosVendidos);

        if (numerosDisponiveis.length === 0) {
            throw new Error('Nenhum número foi vendido ainda!');
        }

        const numeroSorteado = numerosDisponiveis[Math.floor(Math.random() * numerosDisponiveis.length)];
        const vencedor = numerosVendidos[numeroSorteado];

        // Limpar localStorage após sorteio
        localStorage.removeItem('numerosVendidos');

        return {
            numero: numeroSorteado,
            vencedor: vencedor,
            totalParticipantes: numerosDisponiveis.length
        };
    }

    async getEstatisticas() {
        const numerosVendidos = await this.getNumerosVendidos();
        const vendidos = Object.keys(numerosVendidos).length;
        
        return {
            vendidos: vendidos,
            total_rifas: 150,
            percentual: ((vendidos / 150) * 100).toFixed(1)
        };
    }
}

// Instância da API híbrida
const HybridAPIInstance = new HybridAPI();

// Manter compatibilidade com código existente
const API = HybridAPIInstance;
