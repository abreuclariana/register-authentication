import dotenv from 'dotenv'; // Importa a biblioteca dotenv para carregar variáveis de ambiente
import express from 'express'; // Importa o framework Express para criar o servidor
import ejs from 'ejs'; // Importa o mecanismo de visualização EJS para renderizar páginas dinâmicas
import mongoose from 'mongoose'; // Importa a biblioteca Mongoose para interagir com o MongoDB
import session from 'express-session'; // Importa express-session para gerenciamento de sessões
import bcrypt from 'bcrypt'; // Importa a biblioteca bcrypt para hashing seguro de senhas

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const saltRounds = 10; // Define o número de rounds para o hashing do bcrypt

const app = express(); // Inicializa a aplicação Express

app.use(express.static('public')); // Define a pasta 'public' para arquivos estáticos (CSS, JS, imagens)
app.set('view engine', 'ejs'); // Define o mecanismo de visualização como EJS
app.use(express.urlencoded({ extended: true })); // Permite a interpretação de dados enviados via formulário

// Configuração de sessão
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-here',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Para desenvolvimento local
}));

// Conexão com o banco de dados MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/userDB', {
    useNewUrlParser: true, // Utiliza o novo formato de URL do MongoDB
    useUnifiedTopology: true // Garante a conexão estável sem uso de drivers antigos
}).then(() => console.log("MongoDB Connected!")) // Mensagem de sucesso na conexão
  .catch(err => console.log("Error connecting to MongoDB:", err)); // Captura e exibe erros na conexão

// Definição do esquema (schema) do usuário no MongoDB
const userSchema = new mongoose.Schema({
    email: String, // Campo para armazenar o e-mail do usuário
    password: String // Campo para armazenar a senha criptografada do usuário
});

// Definição do esquema para segredos
const secretSchema = new mongoose.Schema({
    secret: String // Campo para armazenar o segredo
});

// Criação dos modelos baseados nos esquemas definidos
const User = mongoose.model('User', userSchema);
const Secret = mongoose.model('Secret', secretSchema);

// Middleware de autenticação
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
};

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
    const email = req.body.username;
    const password = req.body.password;

    try {
        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.render('register', { error: 'User already exists with this email!' });
        }

        // Gerar hash da senha
        const hash = await bcrypt.hash(password, saltRounds);

        // Criar novo usuário
        const newUser = new User({
            email: email,
            password: hash
        });

        await newUser.save();
        
        // Definir sessão do usuário
        req.session.userId = newUser._id;
        
        res.render('secrets', { user: newUser });
    } catch (err) {
        console.log("Erro ao registrar usuário:", err);
        res.render('register', { error: 'Internal server error. Please try again.' });
    }
});

// Rota POST para login do usuário
app.post('/login', async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try {
        // Procura no banco de dados um usuário com o e-mail fornecido
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.render('login', { error: 'User not found!' });
        }

        // Compara a senha digitada com o hash do banco de dados
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (isValidPassword) {
            // Definir sessão do usuário
            req.session.userId = user._id;
            res.render('secrets', { user: user });
        } else {
            res.render('login', { error: 'Incorrect password!' });
        }
    } catch (error) {
        console.log('Erro no sistema de login:', error);
        res.render('login', { error: 'Internal server error. Please try again.' });
    }
});

// Rota para página de segredos (protegida)
app.get('/secrets', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        res.render('secrets', { user: user });
    } catch (error) {
        console.log('Erro ao carregar segredos:', error);
        res.redirect('/login');
    }
});

// Rota para página de envio de segredos (protegida)
app.get('/submit', requireAuth, (req, res) => {
    res.render('submit');
});

// Rota POST para enviar segredos
app.post('/submit', requireAuth, async (req, res) => {
    const secret = req.body.secret;
    
    if (!secret || secret.trim() === '') {
        return res.render('submit', { error: 'Please enter a secret!' });
    }

    try {
        const newSecret = new Secret({
            secret: secret.trim()
        });

        await newSecret.save();
        res.render('secrets', { success: 'Secret shared successfully!' });
    } catch (error) {
        console.log('Erro ao salvar segredo:', error);
        res.render('submit', { error: 'Error saving secret. Please try again.' });
    }
});

// Rota de logout
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Erro ao fazer logout:', err);
        }
        res.redirect('/');
    });
});

// Inicializa o servidor na porta configurada e exibe uma mensagem no console
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Mensagem indicando que o servidor está rodando
});
