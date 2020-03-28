const express = require('express');
const path = require('path');
const app = express();
const hbs = require('express-handlebars');
const fs = require('fs');
const multer = require('multer');

//setup Bootstrap
app.use('/js/jquery.js', express.static(__dirname + '/node_modules/jquery/dist/jquery.min.js'));
app.use('/css/bootstrap.css', express.static(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css'));
app.use('/js/bootstrap.js', express.static(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.min.js'));
app.use('/icon', express.static(__dirname + "/public"));


//PORT

app.set('port', process.env.PORT || 4000);

//CORS

app.set('port', process.env.PORT || 4000);
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Aceptar datos de formularios y json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: __dirname + '/templates/', defaultLayout: 'index' }));
app.set('views', path.join(__dirname, 'templates')); //se configura la ruta de las vistas.
app.set('view engine', 'hbs');

//file Upload

var storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null, './files/')
    },
    filename:(req,file, callback)=>{
        callback(null,file.originalname);
    }
});

const upload = multer({storage});




//rutas


//Ruta Principal
app.get('/', (req, res) => {
    /*     if (process.argv.length <= 2) {
            console.log("Usage: " + __filename + " path/to/directory");
            process.exit(-1);
        } */

    var path = __dirname + '/files'  //process.argv[2];
    var archivos = [];
    fs.readdir(path, function (err, files) {

        for (let i = 0; i < files.length; i++) {
            fs.stat(path + "/" + files[i], function (err, stats) {
                archivos.push(
                    {
                        "name": files[i],
                        "size": stats["size"]
                    }
                );
            });
        }
        res.render('selectFile', { archivos });
    });


});

//Ruta de Descargar
app.post('/file', (req, res) => {
    const { file } = req.body
    res.download(__dirname + "/files/" + file);
})

//ruta de subida
app.post('/upload', upload.single('archivo') ,(req, res) => {
    console.log(req.file)
    res.redirect('../')
})


//servidor


app.listen(app.get('port'), function () {
    console.log('Server Port', app.get('port'));
})