import express from 'express'
import { performance } from 'perf_hooks'

const app = express();
app.use(express.text());

function fibonacci(n) {
    if (n <= 0)
        return 0;
    else if (n == 1)
        return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

app.get('/function/fibonacci', (_req, res) => {
    const start = performance.now();
    const result = fibonacci(30);
    const end = performance.now();
    res.json({ 
        result, 
        executionTime: `${(end - start).toFixed(6)} ms` 
    });
})

app.get('/function/fibonacci/:n', (req, res) => {
    const start = performance.now();
    const result = fibonacci(parseInt(req.params.n));
    const end = performance.now();
    res.json({ 
        result,
        executionTime: `${(end - start).toFixed(6)} ms`  
    });
})

app.post('/function/fibonacci', (req, res) => {
    let n = parseInt(req.body); 

    if (isNaN(n)) {
        n = 30;
    }

    const start = performance.now();
    const result = fibonacci(n);
    const end = performance.now();
    
    res.json({ 
        result,
        executionTime: `${(end - start).toFixed(6)} ms`  
    });
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Service listening on port ${port}`));