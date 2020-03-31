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
app.use("/files", express.static(__dirname + "/files"));


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
    destination: (req, file, callback) => {
        callback(null, './files/')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });




//rutas


//Ruta Principal
app.get('/', (req, res) => {
    FileTransfer(req, res);
});

//Ruta de Descargar
app.post('/file', (req, res) => {
    const { file } = req.body
    console.log('descargando archivo:', file);
    res.download(__dirname + "/files/" + file);

})

//ruta de subida
app.post('/upload', upload.single('archivo'), (req, res) => {
    console.log('Se ha recibido un archivo nuevo');
    FileTransfer(req,res);
})

async function FileTransfer(req, res) {
    var path = __dirname + '/files';
    var archivos = [];
    var jpg = [];
    var mp3 = [];
    var mp4 = [];
    var png = [];
    var gif = [];
    var pdf = [];

    var all = {
        archivos: archivos,
        jpg: jpg
    }


    await fs.readdir(path, function (err, files) {

        for (let i = 0; i < files.length; i++) {
            fs.stat(path + "/" + files[i], function (err, stats) {
                var nombre = files[i].split(".");
                var index = nombre.length - 1;

                if (nombre[index] == "mp3") {
                    mp3.push(
                        {
                            "name": files[i],
                            "size": stats["size"]
                        }
                    );

                }
                if (nombre[index] == "mp4") {
                    mp4.push(
                        {
                            "name": files[i],
                            "size": stats["size"]
                        }
                    );
                }
                if (nombre[index] == "jpg") {
                    jpg.push(
                        {
                            "name": files[i],
                            "size": stats["size"]
                        }
                    );
                }
                if (nombre[index] == "png") {
                    png.push(
                        {
                            "name": files[i],
                            "size": stats["size"]
                        }
                    );
                }
                if (nombre[index] == "gif") {
                    gif.push(
                        {
                            "name": files[i],
                            "size": stats["size"]
                        }
                    );
                }
                if (nombre[index] == "pdf") {
                    pdf.push(
                        {
                            "name": files[i],
                            "size": stats["size"]
                        }
                    );
                }
                if (nombre[index] != "pdf" && nombre[index] != "mp3" && nombre[index] != "mp4" && nombre[index] != "jpg" && nombre[index] != "png" && nombre[index] != "gif") {
                    archivos.push(
                        {
                            "name": files[i],
                            "size": stats["size"]
                        }
                    );
                }


            });
        }
        res.render('selectFile', { archivos, mp3, mp4, jpg, png, pdf, gif });
    });
}


//servidor


app.listen(app.get('port'), function () {
    console.log('Server Port', app.get('port'));
})