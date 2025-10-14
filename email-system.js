// ========== SISTEMA DE EMAIL AUTOMÁTICO ==========

class EmailSystem {
    constructor() {
        // Configurações do EmailJS (será preenchido após configurar)
        this.emailConfig = {
            serviceId: 'SEU_SERVICE_ID_AQUI',
            templateId: 'SEU_TEMPLATE_ID_AQUI',
            publicKey: 'SUA_PUBLIC_KEY_AQUI',
            emailDestino: 'seu-email@exemplo.com'
        };
        
        this.isConfigured = false;
        this.inicializar();
    }

    // Inicializar EmailJS
    inicializar() {
        if (this.emailConfig.serviceId !== 'SEU_SERVICE_ID_AQUI') {
            // Carregar EmailJS
            if (!window.emailjs) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
                script.onload = () => {
                    emailjs.init(this.emailConfig.publicKey);
                    this.isConfigured = true;
                    console.log('✅ EmailJS configurado');
                };
                document.head.appendChild(script);
            } else {
                emailjs.init(this.emailConfig.publicKey);
                this.isConfigured = true;
            }
        }
    }

    // Configurar credenciais
    configurar(serviceId, templateId, publicKey, emailDestino) {
        this.emailConfig = {
            serviceId,
            templateId,
            publicKey,
            emailDestino
        };
        this.inicializar();
    }

    // Gerar relatório de compras para email
    gerarRelatorioEmail() {
        const compras = window.BackupCompras ? window.BackupCompras._admin.recuperar() : {};
        const total = Object.keys(compras).length;
        const agora = new Date();
        
        let relatorio = `RELATÓRIO RIFA POMAR - ${agora.toLocaleDateString('pt-BR')} às ${agora.toLocaleTimeString('pt-BR')}\n\n`;
        relatorio += `✅ Total de rifas vendidas: ${total}\n\n`;
        
        if (total === 0) {
            relatorio += 'Nenhuma rifa vendida ainda.\n';
        } else {
            relatorio += 'NÚMEROS E COMPRADORES:\n';
            relatorio += '═'.repeat(40) + '\n';
            
            // Ordenar por número
            const comprasOrdenadas = Object.entries(compras)
                .sort((a, b) => parseInt(a[0]) - parseInt(b[0]));
            
            comprasOrdenadas.forEach(([numero, dados]) => {
                const nome = typeof dados === 'string' ? dados : dados.nome;
                relatorio += `Número ${numero.padStart(3, '0')}: ${nome}\n`;
            });
            
            relatorio += '═'.repeat(40) + '\n';
        }
        
        relatorio += `\nRelatório gerado automaticamente pelo sistema da Rifa Pomar\n`;
        relatorio += `Enviado em: ${agora.toLocaleDateString('pt-BR')} às ${agora.toLocaleTimeString('pt-BR')}`;
        
        return relatorio;
    }

    // Enviar email automático
    async enviarEmailAutomatico(numeroComprado, nomeComprador) {
        if (!this.isConfigured) {
            console.log('📧 Email não configurado - relatório não enviado');
            return;
        }

        try {
            const relatorio = this.gerarRelatorioEmail();
            const agora = new Date();
            
            const templateParams = {
                to_email: this.emailConfig.emailDestino,
                subject: `Nova Compra Rifa Pomar - Número ${numeroComprado}`,
                message: `Nova compra registrada!\n\nNúmero: ${numeroComprado}\nComprador: ${nomeComprador}\nData: ${agora.toLocaleDateString('pt-BR')} às ${agora.toLocaleTimeString('pt-BR')}\n\n--- RELATÓRIO COMPLETO ---\n\n${relatorio}`,
                from_name: 'Sistema Rifa Pomar',
                numero_comprado: numeroComprado,
                nome_comprador: nomeComprador,
                relatorio_completo: relatorio
            };

            const response = await emailjs.send(
                this.emailConfig.serviceId,
                this.emailConfig.templateId,
                templateParams
            );

            console.log('✅ Email enviado com sucesso:', response);
            return true;

        } catch (error) {
            console.error('❌ Erro ao enviar email:', error);
            return false;
        }
    }

    // Enviar relatório manual (se necessário)
    async enviarRelatorioManual() {
        if (!this.isConfigured) {
            console.log('📧 Email não configurado');
            return;
        }

        try {
            const relatorio = this.gerarRelatorioEmail();
            const agora = new Date();
            
            const templateParams = {
                to_email: this.emailConfig.emailDestino,
                subject: `Relatório Manual Rifa Pomar - ${agora.toLocaleDateString('pt-BR')}`,
                message: relatorio,
                from_name: 'Sistema Rifa Pomar',
                relatorio_completo: relatorio
            };

            const response = await emailjs.send(
                this.emailConfig.serviceId,
                this.emailConfig.templateId,
                templateParams
            );

            console.log('✅ Relatório manual enviado:', response);
            return true;

        } catch (error) {
            console.error('❌ Erro ao enviar relatório manual:', error);
            return false;
        }
    }

    // Verificar se está configurado
    estaConfigurado() {
        return this.isConfigured;
    }
}

// Instância global
const emailSystem = new EmailSystem();

// Exportar para uso global
window.EmailSystem = emailSystem;
