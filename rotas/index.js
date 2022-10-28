module.exports = app => {
    app.get('/teste', (req, res) => res.send('rota teste'));
}