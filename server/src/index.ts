import express, { Request, Response, NextFunction } from "express";
import path from "path";

const app = express();
const publicPath = path.join(__dirname, './public');
app.use(express.static(publicPath));
app.get("*", (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.sendFile('index.html',{root:publicPath});
    } catch (error) {
        next(error);
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})