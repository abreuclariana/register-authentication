const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption')

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Conexão corrigida com a porta correta
mongoose.connect('mongodb://127.0.0.1:27017/userDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Conectado!"))
  .catch(err => console.log("Erro ao conectar ao MongoDB:", err));

// Corrigindo a criação do Schema
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const secret = 'lxgiwyl'
userSchema.plugin(encrypt, { secret: secret, excludeFromEncryption: ['password'] });

const User = mongoose.model('User', userSchema);

// Rotas
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

// Registro de usuário
app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            email: req.body.email, // Corrigido de userName para email
            password: req.body.password
        });

        await newUser.save();
        res.render('secrets');
    } catch (error) {
        console.log("Erro ao registrar usuário:", error);
        res.status(500).send("Erro interno no servidor.");
    }
});

// Login de usuário
app.post('/login', async (req, res) => {
    const userName = req.body.email; // Corrigido username para email
    const password = req.body.password;

    try {
        const resultUser = await User.findOne({ email: userName }).exec();
        if (resultUser && resultUser.password === password) {
            res.render('secrets');
        } else {
            res.send('<h2>Senha ou email incorretos</h2>');
        }
    } catch (error) {
        console.log('Erro no sistema', error);
        res.status(500).send("Erro interno no servidor.");
    }
});

// Inicializando o servidor
app.listen(4000, () => {
    console.log('Servidor rodando na porta 4000');
});
