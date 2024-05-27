var express = require('express');
var router = express.Router();
var async = require('async');

let invoices = []; // Lista de notas fiscais
let users = [{ email: 'user@example.com', password: 'password' }];

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:page', function(req, res, next) {
    res.render(req.params.page, {page: req.params.page});
});

// Rota para processar o login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
      res.cookie('user', email);
      res.redirect('/');
  } else {
      res.render('login', { title: 'Login', error: 'Credenciais inválidas' });
  }
});

// Rota para logout
router.get('/logout', (req, res) => {
  res.clearCookie('user');
  res.redirect('/login');
});

router.post('/create-invoice', (req, res) => {
  const { id, company, customer, amount, date } = req.body;
  const newInvoice = { id, company, customer, amount, date };
  invoices.push(newInvoice);
  res.redirect('/invoices');
});

// Rota para listar todas as notas fiscais
router.get('/invoices', (req, res) => {
  res.render('invoice', { title: 'Notas Fiscais', invoices });
});

// Rota para verificar uma nota fiscal específica
router.get('/verify-invoice', (req, res) => {
  const { id } = req.query;
  const invoice = invoices.find(inv => inv.id === id);
  res.render('verify', { title: 'Verificar Nota Fiscal', invoice });
});


module.exports = router;
