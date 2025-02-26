import dotenv from 'dotenv'; // Importa a biblioteca dotenv para carregar variáveis de ambiente
import express from 'express'; // Importa o framework Express para criar o servidor
import ejs from 'ejs'; // Importa o mecanismo de visualização EJS para renderizar páginas dinâmicas
import mongoose from 'mongoose'; // Importa a biblioteca Mongoose para interagir com o MongoDB
// import encrypt from 'mongoose-encryption'; // Biblioteca de criptografia (desativada neste código)
// import md5 from 'md5'; // Biblioteca md5 para criptografia de senhas (não usada, pois bcrypt é mais seguro)
import bcrypt from 'bcrypt'; // Importa a biblioteca bcrypt para hashing seguro de senhas

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const saltRounds = 10; // Define o número de rounds para o hashing do bcrypt

const app = express(); // Inicializa a aplicação Express

app.use(express.static('public')); // Define a pasta 'public' para arquivos estáticos (CSS, JS, imagens)
app.set('view engine', 'ejs'); // Define o mecanismo de visualização como EJS
app.use(express.urlencoded({ extended: true })); // Permite a interpretação de dados enviados via formulário

// Conexão com o banco de dados MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
    useNewUrlParser: true, // Utiliza o novo formato de URL do MongoDB
    useUnifiedTopology: true // Garante a conexão estável sem uso de drivers antigos
}).then(() => console.log("MongoDB Conectado!")) // Mensagem de sucesso na conexão
  .catch(err => console.log("Erro ao conectar ao MongoDB:", err)); // Captura e exibe erros na conexão

// Definição do esquema (schema) do usuário no MongoDB
const userSchema = new mongoose.Schema({
    email: String, // Campo para armazenar o e-mail do usuário
    password: String // Campo para armazenar a senha criptografada do usuário
});

// userSchema.plugin(encrypt, { secret: process.env.SECRET, excludeFromEncryption: ['password'] }); // Exemplo de criptografia com mongoose-encryption (desativado)

// Criação do modelo (model) User baseado no esquema definido
const User = mongoose.model('User', userSchema);

// Rota principal - Renderiza a página inicial
app.get('/', (req, res) => {
    res.render('home'); // Renderiza o arquivo home.ejs
});

// Rota de login - Renderiza a página de login
app.get('/login', (req, res) => {
    res.render('login'); // Renderiza o arquivo login.ejs
});

// Rota de registro - Renderiza a página de cadastro
app.get('/register', (req, res) => {
    res.render('register'); // Renderiza o arquivo register.ejs
});

// Rota POST para registrar um novo usuário
app.post('/register', async (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
            console.log("Erro ao gerar hash:", err);
            return res.status(500).send("Erro no servidor"); // Retorna erro 500 em caso de falha no hash
        }

        // Criação de um novo usuário com e-mail e senha criptografada
        const newUser = new User({
            email: req.body.username, // Captura o e-mail do formulário
            password: hash // Armazena a senha criptografada
        });

        newUser.save()
        .then(() => res.render('secrets')) // Após salvar, renderiza a página secrets.ejs
        .catch(err => console.log("Erro ao salvar usuário:", err)); // Captura erros ao salvar
    });
});

// Rota POST para login do usuário
app.post('/login', async (req, res) => {
    const userName = req.body.username; // Captura o e-mail do formulário
    const password = req.body.password; // Captura a senha digitada

    try {
        // Procura no banco de dados um usuário com o e-mail fornecido
        const resultUser = await User.findOne({ email: userName }).exec();

        if (!resultUser) {
            return res.send('<h2>User not found</h2>'); // Mensagem caso o usuário não seja encontrado
        }

        // Compara a senha digitada com o hash do banco de dados
        bcrypt.compare(password, resultUser.password, function(err, result) {
            if (result === true) { // Se a senha estiver correta
                res.render('secrets'); // Renderiza a página secrets.ejs
            } else {
                res.send('<h2>Incorrect password</h2>'); // Mensagem de erro caso a senha esteja errada
            }
        });
    } catch (error) {
        console.log('Erro no sistema', error); // Exibe erros no console
        res.status(500).send("Internal server error."); // Retorna erro 500 para o cliente
    }
});

// Inicializa o servidor na porta 4000 e exibe uma mensagem no console
app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000'); // Mensagem indicando que o servidor está rodando
});
