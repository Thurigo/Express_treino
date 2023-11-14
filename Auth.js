

/**
 * Dependências do módulo.
 */
var express = require('../..');
var hash = require('pbkdf2-password')();
var path = require('path');
var session = require('express-session');

var app = module.exports = express();

// Configuração

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware

app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false, // não salva a sessão se não for modificada
    saveUninitialized: false, // não cria sessão até que algo seja armazenado
    secret: 'shhhh, muito secreto'
}));

// Middleware para mensagens persistidas em sessão

app.use(function (req, res, next) {
    var err = req.session.error;
    var msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

// Banco de dados fictício

var users = {
    tj: { name: 'tj' }
};

// Ao criar um usuário, gera um salt e faz o hash da senha ('foobar' é a senha aqui)

hash({ password: 'foobar' }, function (err, pass, salt, hash) {
    if (err) throw err;
    // armazena o salt e o hash no "banco de dados"
    users.tj.salt = salt;
    users.tj.hash = hash;
});

// Autenticação usando nosso banco de dados fictício

function authenticate(name, pass, fn) {
    if (!module.parent) console.log('autenticando %s:%s', name, pass);
    var user = users[name];
    // consulta o banco de dados pelo nome de usuário fornecido
    if (!user) return fn(null, null);
    // aplica o mesmo algoritmo à senha enviada por POST, aplicando
    // o hash contra a senha / salt, se houver correspondência, encontramos o usuário
    hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {
        if (err) return fn(err);
        if (hash === user.hash) return fn(null, user);
        fn(null, null);
    });
}

// Middleware para restringir acesso

function restrict(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Acesso negado!';
        res.redirect('/login');
    }
}

app.get('/', function (req, res) {
    res.redirect('/login');
});

app.get('/restricted', restrict, function (req, res) {
    res.send('Wahoo! Área restrita, clique para <a href="/logout">sair</a>.');
});

app.get('/logout', function (req, res) {
    // destroi a sessão do usuário para desconectá-lo
    // será recriada na próxima solicitação
    req.session.destroy(function () {
        res.redirect('/');
    });
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res, next) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (err) return next(err);
        if (user) {
            // Regenera a sessão ao fazer login
            // para evitar fixação
            req.session.regenerate(function () {
                // Armazena a chave primária do usuário
                // no armazenamento de sessão para ser recuperada,
                // ou neste caso, o objeto de usuário inteiro
                req.session.user = user;
                req.session.success = 'Autenticado como ' + user.name
                    + ' clique para <a href="/logout">sair</a>. '
                    + ' Você pode acessar agora <a href="/restricted">/restricted</a>.';
                res.redirect('back');
            });
        } else {
            req.session.error = 'Autenticação falhou, verifique seu '
                + ' nome de usuário e senha.'
                + ' (use "tj" e "foobar")';
            res.redirect('/login');
        }
    });
});

/* istanbul ignore next */
if (!module.parent) {
    app.listen(3000);
    console.log('Express iniciado na porta 3000');
}
