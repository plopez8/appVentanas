const express = require('express');
const router = express.Router();
const Controller = require('../../controllers/Controller');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });


router
  .get('/worker', Controller.getAllWorkers)
  .get('/worker/:mail', Controller.getWorker)
  .patch('/worker/:mail', Controller.updateWorker)
  .delete('/worker/:mail', Controller.deleteWorker)
  .post('/worker', Controller.createWorker)
  .get('/obra', Controller.getAllObras)
  .patch('/obra/:id', Controller.updateObra)
  .delete('/obra/:id', Controller.deleteObra)
  .post('/obra', Controller.createObra)
  .get('/obra/:id/ventanas', Controller.getVentanasDeObra)
  .post('/ventana', Controller.createVentana)
  .patch('/ventana/:id', Controller.updateVentana)
  .delete('/ventana/:id', Controller.deleteVentana)
  .post('/imagen', upload.single('imagen_data'), Controller.createImagen)
  .get('/ventana/:ventana_id/imagenes', Controller.getAllImagenesByVentana);


module.exports = router;
