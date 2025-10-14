// ========== BACKUP INVISÍVEL DAS COMPRAS ==========

// Função para salvar backup de cada compra automaticamente
function salvarCompraBackup(numero, nome) {
    try {
        // Buscar dados existentes
        let comprasBackup = JSON.parse(localStorage.getItem('comprasBackupRifa')) || {};
        
        // Adicionar nova compra
        comprasBackup[numero] = {
            nome: nome,
            dataCompra: new Date().toISOString(),
            dataFormatada: new Date().toLocaleDateString('pt-BR') + ' às ' + new Date().toLocaleTimeString('pt-BR')
        };
        
        // Salvar de volta
        localStorage.setItem('comprasBackupRifa', JSON.stringify(comprasBackup));
        
        // Salvar também timestamp da última atualização
        localStorage.setItem('ultimaAtualizacaoCompras', Date.now().toString());
        
        // Log silencioso para debug (invisível para cliente)
        console.log(`🔒 Backup: Número ${numero} - ${nome}`);
        
        // Salvar cópia de segurança com timestamp
        const timestamp = Date.now();
        const backupSeguranca = {
            timestamp: timestamp,
            totalCompras: Object.keys(comprasBackup).length,
            compras: comprasBackup,
            ultimaCompra: { numero, nome },
            dataBackup: new Date().toISOString()
        };
        
        localStorage.setItem(`backup_compras_${timestamp}`, JSON.stringify(backupSeguranca));
        
        // Manter apenas os 5 backups de segurança mais recentes
        limparBackupsAntigos();
        
        // Enviar email automático com o relatório atualizado
        if (window.EmailSystem && window.EmailSystem.estaConfigurado()) {
            // Enviar email em background (não bloqueia a interface)
            setTimeout(() => {
                window.EmailSystem.enviarEmailAutomatico(numero, nome);
            }, 1000);
        }
        
    } catch (error) {
        console.error('Erro ao salvar backup:', error);
    }
}

// Função para recuperar todas as compras salvas
function recuperarComprasBackup() {
    try {
        const compras = localStorage.getItem('comprasBackupRifa');
        return compras ? JSON.parse(compras) : {};
    } catch (error) {
        console.error('Erro ao recuperar backup:', error);
        return {};
    }
}

// Função para limpar backups antigos automaticamente
function limparBackupsAntigos() {
    try {
        const chaves = Object.keys(localStorage);
        const backupsCompras = chaves
            .filter(chave => chave.startsWith('backup_compras_'))
            .sort((a, b) => {
                const timestampA = parseInt(a.split('_')[2]);
                const timestampB = parseInt(b.split('_')[2]);
                return timestampB - timestampA; // Mais recente primeiro
            });
        
        // Manter apenas os 5 mais recentes
        if (backupsCompras.length > 5) {
            backupsCompras.slice(5).forEach(chave => {
                localStorage.removeItem(chave);
            });
        }
    } catch (error) {
        console.error('Erro ao limpar backups:', error);
    }
}

// Função para gerar relatório de backup (formato texto)
function gerarRelatorioCompras() {
    const compras = recuperarComprasBackup();
    const total = Object.keys(compras).length;
    
    let relatorio = `=== BACKUP COMPRAS RIFA POMAR ===\n`;
    relatorio += `Data: ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}\n`;
    relatorio += `Total de rifas vendidas: ${total}\n\n`;
    relatorio += `NÚMEROS E COMPRADORES:\n`;
    relatorio += `${'='.repeat(50)}\n`;
    
    // Ordenar por número
    const comprasOrdenadas = Object.entries(compras)
        .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
    
    comprasOrdenadas.forEach(([numero, dados]) => {
        relatorio += `Número ${numero.padStart(3, '0')}: ${dados.nome}\n`;
    });
    
    relatorio += `\n${'='.repeat(50)}\n`;
    relatorio += `Backup gerado automaticamente\n`;
    
    return relatorio;
}

// Função para estatísticas do backup
function obterEstatisticasBackup() {
    const compras = recuperarComprasBackup();
    const ultimaAtualizacao = localStorage.getItem('ultimaAtualizacaoCompras');
    
    return {
        totalCompras: Object.keys(compras).length,
        ultimaAtualizacao: ultimaAtualizacao ? new Date(parseInt(ultimaAtualizacao)) : null,
        compras: compras
    };
}

// Sistema invisível - apenas funções administrativas
window.BackupCompras = {
    // Função principal (usada automaticamente)
    salvar: salvarCompraBackup,
    
    // Funções administrativas para recuperação
    _admin: {
        recuperar: recuperarComprasBackup,
        relatorio: gerarRelatorioCompras,
        estatisticas: obterEstatisticasBackup,
        limpar: limparBackupsAntigos
    }
};
