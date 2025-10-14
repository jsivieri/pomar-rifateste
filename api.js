// Configuração da API
const API_BASE_URL = 'http://localhost:3000/api';

// Funções para interagir com a API
const API = {
    // Obter números vendidos
    async getNumerosVendidos() {
        try {
            const response = await fetch(`${API_BASE_URL}/numeros-vendidos`);
            if (!response.ok) throw new Error('Erro ao buscar números vendidos');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return {};
        }
    },

    // Comprar um número
    async comprarNumero(numero, comprador) {
        try {
            const response = await fetch(`${API_BASE_URL}/comprar-numero`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ numero: parseInt(numero), comprador })
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Erro ao comprar número');
            }
            
            return result;
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    },

    // Realizar sorteio
    async realizarSorteio(senha) {
        try {
            const response = await fetch(`${API_BASE_URL}/sortear`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ senha })
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Erro ao realizar sorteio');
            }
            
            return result;
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    },

    // Obter estatísticas
    async getEstatisticas() {
        try {
            const response = await fetch(`${API_BASE_URL}/estatisticas`);
            if (!response.ok) throw new Error('Erro ao buscar estatísticas');
            return await response.json();
        } catch (error) {
            console.error('Erro:', error);
            return { vendidos: 0, restantes: 150, total_rifas: 150 };
        }
    },

    // Cancelar número (deletar)
    async cancelarNumero(numero) {
        try {
            const response = await fetch(`${API_BASE_URL}/numeros-vendidos/${numero}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Erro ao cancelar número');
            }
            
            return result;
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }
};
