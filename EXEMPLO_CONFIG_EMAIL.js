// ========== EXEMPLO DE CONFIGURAÇÃO ==========
// Copie este exemplo e substitua suas próprias credenciais

// No arquivo email-system.js, substitua a seção this.emailConfig por:

/*
this.emailConfig = {
    serviceId: 'service_abc123',           // Seu Service ID do EmailJS
    templateId: 'template_def456',         // Seu Template ID
    publicKey: 'ghi789jkl012',            // Sua Public Key
    emailDestino: 'seuemail@gmail.com'     // SEU EMAIL (onde quer receber)
};
*/

// ========== TEMPLATE DE EMAIL RECOMENDADO ==========

// Subject: Nova Compra Rifa Pomar - Número {{numero_comprado}}

// Body (HTML):
/*
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #4a7c59; text-align: center;">🎯 Nova Compra Rifa Pomar!</h2>
    
    <div style="background: #f0f4e8; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <p><strong>📍 Número:</strong> {{numero_comprado}}</p>
        <p><strong>👤 Comprador:</strong> {{nome_comprador}}</p>
        <p><strong>📅 Data:</strong> Agora mesmo</p>
    </div>
    
    <hr style="border: 1px solid #4a7c59;">
    
    <h3 style="color: #4a7c59;">📋 RELATÓRIO COMPLETO:</h3>
    <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
        <pre style="font-family: monospace; font-size: 14px; white-space: pre-wrap;">{{relatorio_completo}}</pre>
    </div>
    
    <hr style="border: 1px solid #4a7c59;">
    
    <p style="text-align: center; color: #666; font-size: 12px;">
        <em>Email enviado automaticamente pelo sistema da Rifa Pomar</em>
    </p>
</div>
*/

// ========== TESTE RÁPIDO ==========
// Depois de configurar, teste com:
// EmailSystem.enviarRelatorioManual()
