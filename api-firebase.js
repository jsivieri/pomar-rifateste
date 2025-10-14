// ========== API FIREBASE - DADOS COMPARTILHADOS EM TEMPO REAL ==========

class FirebaseAPI {
    constructor() {
        // Configuração do Firebase (será preenchida após criar projeto)
        this.config = {
            apiKey: "SUA_API_KEY_AQUI",
            authDomain: "SEU_PROJECT_ID.firebaseapp.com",
            databaseURL: "https://SEU_PROJECT_ID-default-rtdb.firebaseio.com/",
            projectId: "SEU_PROJECT_ID",
            storageBucket: "SEU_PROJECT_ID.appspot.com",
            messagingSenderId: "123456789",
            appId: "1:123456789:web:abcdef123456789"
        };
    }

    // Verificar se está configurado
    isConfigured() {
        return this.config.apiKey !== "SUA_API_KEY_AQUI";
    }

    // Buscar números vendidos
    async getNumerosVendidos() {
        if (!this.isConfigured()) {
            throw new Error('Firebase não configurado');
        }

        try {
            const response = await fetch(`${this.config.databaseURL}/numerosVendidos.json`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do Firebase');
            }
            
            const data = await response.json();
            return data || {};
        } catch (error) {
            console.error('Erro Firebase:', error);
            throw error;
        }
    }

    // Comprar número
    async comprarNumero(numero, comprador) {
        if (!this.isConfigured()) {
            throw new Error('Firebase não configurado');
        }

        try {
            // Verificar se número já está vendido
            const numerosVendidos = await this.getNumerosVendidos();
            if (numerosVendidos[numero]) {
                throw new Error('Número já foi vendido!');
            }

            // Adicionar nova compra
            const response = await fetch(`${this.config.databaseURL}/numerosVendidos/${numero}.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    comprador: comprador,
                    dataCompra: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar compra no Firebase');
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
            throw new Error('Firebase não configurado');
        }

        try {
            const numerosVendidos = await this.getNumerosVendidos();
            const numerosDisponiveis = Object.keys(numerosVendidos);

            if (numerosDisponiveis.length === 0) {
                throw new Error('Nenhum número foi vendido ainda!');
            }

            // Sortear número
            const numeroSorteado = numerosDisponiveis[Math.floor(Math.random() * numerosDisponiveis.length)];
            const dadosVencedor = numerosVendidos[numeroSorteado];
            const nomeVencedor = typeof dadosVencedor === 'string' ? dadosVencedor : dadosVencedor.comprador;

            // Limpar números vendidos após sorteio
            await fetch(`${this.config.databaseURL}/numerosVendidos.json`, {
                method: 'DELETE'
            });

            return {
                numero: numeroSorteado,
                vencedor: nomeVencedor,
                totalParticipantes: numerosDisponiveis.length,
                dataFormatada: sorteio.dataFormatada
            };
        } catch (error) {
            console.error('Erro no sorteio:', error);
            throw error;
        }
    }

    // Buscar estatísticas
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

// ========== API PRINCIPAL COM FALLBACK ==========

class UnifiedAPI {
    constructor() {
        this.firebaseAPI = new FirebaseAPI();
    }

    async getNumerosVendidos() {
        // Tentar Firebase primeiro
        if (this.firebaseAPI.isConfigured()) {
            try {
                const dados = await this.firebaseAPI.getNumerosVendidos();
                // Converter formato do Firebase para o formato esperado
                const resultado = {};
                Object.keys(dados).forEach(numero => {
                    const dadosComprador = dados[numero];
                    resultado[numero] = typeof dadosComprador === 'string' ? 
                        dadosComprador : dadosComprador.comprador;
                });
                return resultado;
            } catch (error) {
                console.log('Firebase indisponível, usando localStorage:', error.message);
            }
        }

        // Fallback para localStorage
        return JSON.parse(localStorage.getItem('numerosVendidos')) || {};
    }

    async comprarNumero(numero, comprador) {
        // Tentar Firebase primeiro
        if (this.firebaseAPI.isConfigured()) {
            try {
                await this.firebaseAPI.comprarNumero(numero, comprador);
                
                // Salvar backup invisível da compra
                if (window.BackupCompras) {
                    window.BackupCompras.salvar(numero, comprador);
                }
                
                // Também salvar no localStorage como backup
                const localVendidos = JSON.parse(localStorage.getItem('numerosVendidos')) || {};
                localVendidos[numero] = comprador;
                localStorage.setItem('numerosVendidos', JSON.stringify(localVendidos));
                
                return;
            } catch (error) {
                console.log('Firebase indisponível, usando localStorage:', error.message);
            }
        }

        // Fallback para localStorage
        const numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos')) || {};
        
        if (numerosVendidos[numero]) {
            throw new Error('Número já foi vendido!');
        }
        
        numerosVendidos[numero] = comprador;
        localStorage.setItem('numerosVendidos', JSON.stringify(numerosVendidos));
        
        // Salvar backup invisível da compra
        if (window.BackupCompras) {
            window.BackupCompras.salvar(numero, comprador);
        }
    }

    async realizarSorteio() {
        // Tentar Firebase primeiro
        if (this.firebaseAPI.isConfigured()) {
            try {
                const resultado = await this.firebaseAPI.realizarSorteio();
                
                // Limpar localStorage também
                localStorage.removeItem('numerosVendidos');
                
                return resultado;
            } catch (error) {
                console.log('Firebase indisponível, usando localStorage:', error.message);
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
        const dataFormatada = new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR');

        // Limpar localStorage após sorteio
        localStorage.removeItem('numerosVendidos');

        return {
            numero: numeroSorteado,
            vencedor: vencedor,
            totalParticipantes: numerosDisponiveis.length,
            dataFormatada: dataFormatada
        };
    }

    async getEstatisticas() {
        // Tentar Firebase primeiro
        if (this.firebaseAPI.isConfigured()) {
            try {
                return await this.firebaseAPI.getEstatisticas();
            } catch (error) {
                console.log('Firebase indisponível, usando localStorage');
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
}

// Instância global da API
const API = new UnifiedAPI();
