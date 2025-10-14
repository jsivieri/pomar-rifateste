// API Local usando localStorage (funciona sem backend)
const API = {
    // Obter números vendidos
    async getNumerosVendidos() {
        try {
            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const dados = localStorage.getItem('numerosVendidos');
            return dados ? JSON.parse(dados) : {};
        } catch (error) {
            console.error('Erro:', error);
            return {};
        }
    },

    // Comprar um número
    async comprarNumero(numero, comprador) {
        try {
            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos') || '{}');
            
            // Verificar se já foi vendido
            if (numerosVendidos[numero]) {
                throw new Error('Este número já foi vendido');
            }
            
            // Registrar venda
            numerosVendidos[numero] = comprador;
            localStorage.setItem('numerosVendidos', JSON.stringify(numerosVendidos));
            
            return {
                success: true,
                message: 'Número comprado com sucesso'
            };
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    },

    // Realizar sorteio
    async realizarSorteio(senha) {
        try {
            // Verificar senha primeiro
            const SENHA_SORTEIO = '9248';
            if (!senha || senha !== SENHA_SORTEIO) {
                throw new Error('Senha incorreta. Acesso negado.');
            }
            
            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 300));
            
            const numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos') || '{}');
            const numeros = Object.keys(numerosVendidos);
            
            if (numeros.length === 0) {
                throw new Error('Nenhum número foi vendido ainda');
            }

            // Sortear número aleatório
            const numeroSorteado = numeros[Math.floor(Math.random() * numeros.length)];
            const nomeVencedor = numerosVendidos[numeroSorteado];
            
            // Limpar todos os números vendidos após o sorteio
            localStorage.removeItem('numerosVendidos');
            
            return {
                numero: parseInt(numeroSorteado),
                vencedor: nomeVencedor,
                data_sorteio: new Date().toISOString()
            };
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    },

    // Obter estatísticas
    async getEstatisticas() {
        try {
            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 100));
            
            const numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos') || '{}');
            const totalVendidos = Object.keys(numerosVendidos).length;
            const totalRifas = 150;
            
            return {
                total_rifas: totalRifas,
                vendidos: totalVendidos,
                restantes: totalRifas - totalVendidos,
                porcentagem_vendida: ((totalVendidos / totalRifas) * 100).toFixed(2)
            };
        } catch (error) {
            console.error('Erro:', error);
            return { vendidos: 0, restantes: 150, total_rifas: 150 };
        }
    },

    // Cancelar número (deletar)
    async cancelarNumero(numero) {
        try {
            // Simular delay de rede
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const numerosVendidos = JSON.parse(localStorage.getItem('numerosVendidos') || '{}');
            
            if (!numerosVendidos[numero]) {
                throw new Error('Número não encontrado');
            }
            
            delete numerosVendidos[numero];
            localStorage.setItem('numerosVendidos', JSON.stringify(numerosVendidos));
            
            return {
                success: true,
                message: 'Número cancelado com sucesso'
            };
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }
};
