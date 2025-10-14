const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Inicializar banco de dados SQLite
const db = new sqlite3.Database('./rifa.db', (err) => {
    if (err) {
        console.error('Erro ao conectar com o banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite');
        initDatabase();
    }
});

// Criar tabelas se não existirem
function initDatabase() {
    // Tabela para números vendidos
    db.run(`CREATE TABLE IF NOT EXISTS numeros_vendidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        numero INTEGER UNIQUE NOT NULL,
        comprador TEXT NOT NULL,
        data_compra DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    console.log('Tabela criada/verificada com sucesso');
}

// ROTAS DA API

// Rota para servir a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Obter todos os números vendidos
app.get('/api/numeros-vendidos', (req, res) => {
    db.all('SELECT numero, comprador, data_compra FROM numeros_vendidos ORDER BY numero', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        // Converter para o formato que o frontend espera
        const numerosVendidos = {};
        rows.forEach(row => {
            numerosVendidos[row.numero] = row.comprador;
        });
        
        res.json(numerosVendidos);
    });
});

// Comprar um número
app.post('/api/comprar-numero', (req, res) => {
    const { numero, comprador } = req.body;
    
    if (!numero || !comprador) {
        return res.status(400).json({ error: 'Número e comprador são obrigatórios' });
    }

    // Verificar se o número já foi vendido
    db.get('SELECT numero FROM numeros_vendidos WHERE numero = ?', [numero], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (row) {
            return res.status(400).json({ error: 'Este número já foi vendido' });
        }

        // Inserir nova venda
        db.run('INSERT INTO numeros_vendidos (numero, comprador) VALUES (?, ?)', 
            [numero, comprador], 
            function(err) {
                if (err) {
                    res.status(500).json({ error: err.message });
                    return;
                }
                
                res.json({ 
                    success: true, 
                    message: 'Número comprado com sucesso',
                    id: this.lastID 
                });
            }
        );
    });
});

// Realizar sorteio
app.post('/api/sortear', (req, res) => {
    const { senha } = req.body;
    
    // Verificar senha
    const SENHA_SORTEIO = '9248';
    if (!senha) {
        return res.status(400).json({ error: 'Senha é obrigatória' });
    }
    
    if (senha !== SENHA_SORTEIO) {
        return res.status(401).json({ error: 'Senha incorreta. Acesso negado.' });
    }
    
    // Primeiro, obter todos os números vendidos
    db.all('SELECT numero, comprador FROM numeros_vendidos', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Nenhum número foi vendido ainda' });
        }

        // Sortear um número aleatório
        const numeroSorteado = rows[Math.floor(Math.random() * rows.length)];
        
        // Limpar todos os números vendidos após o sorteio
        db.run('DELETE FROM numeros_vendidos', function(deleteErr) {
            if (deleteErr) {
                console.error('Erro ao limpar números vendidos:', deleteErr.message);
                return res.status(500).json({ error: 'Erro ao limpar números após sorteio' });
            }
            
            res.json({
                numero: numeroSorteado.numero,
                vencedor: numeroSorteado.comprador,
                data_sorteio: new Date().toISOString(),
                message: 'Sorteio realizado e números limpos para nova rifa'
            });
        });
    });
});

// Obter estatísticas
app.get('/api/estatisticas', (req, res) => {
    db.get('SELECT COUNT(*) as total_vendidos FROM numeros_vendidos', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        const totalVendidos = row.total_vendidos;
        const totalRifas = 150;
        const restantes = totalRifas - totalVendidos;
        
        res.json({
            total_rifas: totalRifas,
            vendidos: totalVendidos,
            restantes: restantes,
            porcentagem_vendida: ((totalVendidos / totalRifas) * 100).toFixed(2)
        });
    });
});

// Deletar um número vendido (para cancelamentos)
app.delete('/api/numeros-vendidos/:numero', (req, res) => {
    const numero = req.params.numero;
    
    db.run('DELETE FROM numeros_vendidos WHERE numero = ?', [numero], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Número não encontrado' });
        }
        
        res.json({ success: true, message: 'Número cancelado com sucesso' });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});

// Fechar conexão com o banco ao encerrar o servidor
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Erro ao fechar banco de dados:', err.message);
        } else {
            console.log('Conexão com banco de dados fechada');
        }
        process.exit(0);
    });
});
