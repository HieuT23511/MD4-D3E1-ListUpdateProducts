import multer from 'multer';
import express from "express";
import bodyParser from 'body-parser';
import {Product} from "./src/entity/Product";
import {AppDataSource} from "./src/data-source";
const PORT = 3000;
import {Request,Response} from "express";
//cau hinh thu vien Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/upload')
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })


// thiết lập kết nối cơ sở dữ liệu
AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

//cau hinh views
const app = express();
app.set('view engine','ejs');
app.set('views','./src/views');
//Cau hinh Body-parser
app.use(bodyParser.json());
app.use(express.json());

//Cau hinh Static file:
app.use(express.static( './src/public'));

//routers:
app.get('/products', async (req: Request, res: Response) => {
    let products = await AppDataSource.getRepository(Product).find();
    res.render('list', {products: products});
})
app.get('/products/create', (req : Request,res:Response)=>{
    res.render('create')
})
app.post("/products/create", upload.single('image'), async (req: any, res: any) => {
    try {
        let product = new Product();
        product.price = req.body.price;
        product.name = req.body.name;
        product.image = req.file.originalname;
        product.author = req.body.author;

        const productRepository = AppDataSource.getRepository(Product)
        await productRepository.save(product);
        res.redirect("/products")
    }catch (e) {
        console.log(e.message);
    }
});

app.listen(PORT,'localhost',()=>{
    console.log(`Server is running at http://localhost:${PORT}/products`)
})
