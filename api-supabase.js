// ========== API SUPABASE PARA DADOS COMPARTILHADOS ==========

class SupabaseAPI {
    constructor() {
        // Estas configurações serão preenchidas após criar o projeto no Supabase
        this.supabaseUrl = 'SUA_URL_SUPABASE_AQUI';
        this.supabaseKey = 'SUA_CHAVE_PUBLICA_AQUI';
        this.apiUrl = `${this.supabaseUrl}/rest/v1`;
        
        this.headers = {
            'apikey': this.supabaseKey,
            'Authorization': `Bearer ${this.supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        };
    }

    // Verificar se está configurado
    isConfigured() {
        return this.supabaseUrl !== 'SUA_URL_SUPABASE_AQUI' && 
               this.supabaseKey !== 'SUA_CHAVE_PUBLICA_AQUI';
    }

    // Buscar todos os números vendidos
    async getNumerosVendidos() {
        if (!this.isConfigured()) {
            throw new Error('Supabase não configurado. Configure as credenciais.');
        }

        try {
            const response = await fetch(`${this.apiUrl}/numeros_vendidos`, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar dados: ${response.status}`);
            }

            const data = await response.json();
            
            // Converter array para objeto {numero: comprador}
            const numerosObj = {};
            data.forEach(item => {
                numerosObj[item.numero] = item.comprador;
            });

            return numerosObj;
        } catch (error) {
            console.error('Erro na API Supabase:', error);
            throw error;
        }
    }

    // Comprar um número
    async comprarNumero(numero, comprador) {
        if (!this.isConfigured()) {
            throw new Error('Supabase não configurado. Configure as credenciais.');
        }

        try {
            // Verificar se número já está vendido
            const existente = await fetch(`${this.apiUrl}/numeros_vendidos?numero=eq.${numero}`, {
                method: 'GET',
                headers: this.headers
            });

            if (existente.ok) {
                const data = await existente.json();
                if (data.length > 0) {
                    throw new Error('Número já foi vendido!');
                }
            }

            // Inserir nova venda
            const response = await fetch(`${this.apiUrl}/numeros_vendidos`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    numero: parseInt(numero),
                    comprador: comprador,
                    data_compra: new Date().toISOString()
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Erro ao comprar número: ${response.status} - ${errorData}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Erro ao comprar número:', error);
            throw error;
        }
    }

    // Realizar sorteio
    async realizarSorteio() {
        if (!this.isConfigured()) {
            throw new Error('Supabase não configurado. Configure as credenciais.');
        }

        try {
            // Buscar todos os números vendidos
            const numerosVendidos = await this.getNumerosVendidos();
            const numerosDisponiveis = Object.keys(numerosVendidos);

            if (numerosDisponiveis.length === 0) {
                throw new Error('Nenhum número foi vendido ainda!');
            }

            // Sortear um número aleatório
            const numeroSorteado = numerosDisponiveis[Math.floor(Math.random() * numerosDisponiveis.length)];
            const vencedor = numerosVendidos[numeroSorteado];

            // Salvar resultado do sorteio
            await fetch(`${this.apiUrl}/sorteios`, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    numero_sorteado: parseInt(numeroSorteado),
                    vencedor: vencedor,
                    data_sorteio: new Date().toISOString(),
                    total_participantes: numerosDisponiveis.length
                })
            });

            // Limpar números vendidos após sorteio
            await fetch(`${this.apiUrl}/numeros_vendidos`, {
                method: 'DELETE',
                headers: this.headers
            });

            return {
                numero: numeroSorteado,
                vencedor: vencedor,
                totalParticipantes: numerosDisponiveis.length
            };
        } catch (error) {
            console.error('Erro no sorteio:', error);
            throw error;
        }
    }

    // Buscar estatísticas
    async getEstatisticas() {
        if (!this.isConfigured()) {
            throw new Error('Supabase não configurado. Configure as credenciais.');
        }

        try {
            const response = await fetch(`${this.apiUrl}/numeros_vendidos`, {
                method: 'GET',
                headers: this.headers
            });

            if (response.ok) {
                const data = await response.json();
                return {
                    vendidos: data.length,
                    total_rifas: 150,
                    percentual: ((data.length / 150) * 100).toFixed(1)
                };
            }

            return { vendidos: 0, total_rifas: 150, percentual: '0.0' };
        } catch (error) {
            console.error('Erro ao buscar estatísticas:', error);
            return { vendidos: 0, total_rifas: 150, percentual: '0.0' };
        }
    }
}

// Criar instância da API Supabase
const SupabaseAPIInstance = new SupabaseAPI();

// API principal com fallback
const API = {
    async getNumerosVendidos() {
        if (SupabaseAPIInstance.isConfigured()) {
            try {
                return await SupabaseAPIInstance.getNumerosVendidos();
            } catch (error) {
                console.error('Erro Supabase, usando localStorage:', error);
            }
        }
        
        // Fallback para localStorage
        return JSON.parse(localStorage.getItem('numerosVendidos')) || {};
    },

    async comprarNumero(numero, comprador) {
        if (SupabaseAPIInstance.isConfigured()) {
            try {
                await SupabaseAPIInstance.comprarNumero(numero, comprador);
                return;
            } catch (error) {
                console.error('Erro Supabase, usando localStorage:', error);
            }
        }

        // Fallback para localStorage
        const numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos')) || {};
        
        if (numerosVendidos[numero]) {
            throw new Error('Número já foi vendido!');
        }
        
        numerosVendidos[numero] = comprador;
        localStorage.setItem('numerosVendidos', JSON.stringify(numerosVendidos));
    },

    async realizarSorteio() {
        if (SupabaseAPIInstance.isConfigured()) {
            try {
                return await SupabaseAPIInstance.realizarSorteio();
            } catch (error) {
                console.error('Erro Supabase, usando localStorage:', error);
            }
        }

        // Fallback para localStorage
        const numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos')) || {};
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
    },

    async getEstatisticas() {
        if (SupabaseAPIInstance.isConfigured()) {
            try {
                return await SupabaseAPIInstance.getEstatisticas();
            } catch (error) {
                console.error('Erro Supabase, usando localStorage:', error);
            }
        }

        // Fallback para localStorage
        const numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos')) || {};
        const vendidos = Object.keys(numerosVendidos).length;
        
        return {
            vendidos: vendidos,
            total_rifas: 150,
            percentual: ((vendidos / 150) * 100).toFixed(1)
        };
    }
};
