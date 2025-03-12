import express from 'express'

const app = express();

function fibonacci(n) {
    if (n <= 0)
        return 0;
    else if (n == 1)
        return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/:n', (req, res) => {
    res.json({ result: fibonacci(parseInt(req.params.n)) });
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Service listening on port ${port}`));