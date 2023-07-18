const db = require("../database/db")
const fs = require('fs');
const getAllWorkers = () => {
  const sql = 'SELECT * FROM trabajador';

  return new Promise((resolve, reject) => {
    db.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getWorker = (mail) => {
  const sql = 'SELECT * FROM trabajador WHERE correo = ?';

  return new Promise((resolve, reject) => {
    db.query(sql, [mail], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const worker = results[0]; // Assuming there's only one worker with the given email
        resolve(worker);
      }
    });
  });
};

const updateWorker = (correo, nombre, password, rol) => {
  const sql = 'UPDATE trabajador SET nombre = ?, password = ?, rol = ? WHERE correo = ?';

  return new Promise((resolve, reject) => {
    db.query(sql, [nombre, password, rol, correo], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteWorker = (correo) => {
  const sql = 'DELETE FROM trabajador WHERE correo = ?';
  return new Promise((resolve, reject) => {
    db.query(sql, [correo], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const createWorker = (correo, nombre, password, rol) => {
  const sql = 'INSERT INTO trabajador (correo, nombre, password, rol) VALUES (?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    db.query(sql, [correo, nombre, password, rol], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};









const getAllObras = () => {
  const sql = 'SELECT * FROM obra';

  return new Promise((resolve, reject) => {
    db.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const updateObra = (id, header, cliente, fecha) => {
  const sql = 'UPDATE obra SET header = ?, cliente = ?, fecha = ? WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(sql, [header, cliente, fecha, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteObra = (id) => {
  const deleteVentanasSql = 'DELETE FROM ventana WHERE obra_id = ?';
  const deleteImagesSql = 'DELETE FROM imagen WHERE ventana_id IN (SELECT id FROM ventana WHERE obra_id = ?)';
  const deleteObraSql = 'DELETE FROM obra WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(deleteImagesSql, [id], (error, imageResults) => {
      if (error) {
        reject(error);
      } else {
        db.query(deleteVentanasSql, [id], (error, ventanaResults) => {
          if (error) {
            reject(error);
          } else {
            db.query(deleteObraSql, [id], (error, obraResults) => {
              if (error) {
                reject(error);
              } else {
                resolve(obraResults);
              }
            });
          }
        });
      }
    });
  });
};


const createObra = (header, cliente, fecha) => {
  const sql = 'INSERT INTO obra (header, cliente, fecha) VALUES (?, ?, ?)';

  return new Promise((resolve, reject) => {
    db.query(sql, [header, cliente, fecha], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};










const getVentanasDeObra = (idObra) => {
  const sql = 'SELECT * FROM ventana WHERE obra_id = ?';

  return new Promise((resolve, reject) => {
    db.query(sql, [idObra], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const updateVentana = (id, header, XValue, YValue, QuantitatValue, description) => {
  const sql = 'UPDATE ventana SET header = ?, XValue = ?, YValue = ?, QuantitatValue = ?, description = ? WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(sql, [header, XValue, YValue, QuantitatValue, description, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const deleteVentana = (id) => {
  const deleteImagesSql = 'DELETE FROM imagen WHERE ventana_id = ?';
  const deleteVentanaSql = 'DELETE FROM ventana WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.query(deleteImagesSql, [id], (error, imageResults) => {
      if (error) {
        reject(error);
      } else {
        db.query(deleteVentanaSql, [id], (error, ventanaResults) => {
          if (error) {
            reject(error);
          } else {
            resolve(ventanaResults);
          }
        });
      }
    });
  });
};


const createVentana = (header, XValue, YValue, QuantitatValue, description, obra_id) => {
  const sql = 'INSERT INTO ventana (header, XValue, YValue, QuantitatValue, description, obra_id) VALUES (?, ?, ?, ?, ?, ?)';

  return new Promise((resolve, reject) => {
    db.query(sql, [header, XValue, YValue, QuantitatValue, description, obra_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};






const createImagen = (ventana_id, imagen_data) => {
  const sql = 'INSERT INTO imagen (ventana_id, imagen_data) VALUES (?, ?)';

  return new Promise((resolve, reject) => {
    // Read the binary data from the file
    fs.readFile(imagen_data.path, (error, data) => {
      if (error) {
        reject(error);
      } else {
        // Execute the query passing the 'ventana_id' and 'data' buffer
        db.query(sql, [ventana_id, data], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

const getAllImagenesByVentana = (ventana_id) => {
  const sql = 'SELECT * FROM imagen WHERE ventana_id = ?';

  return new Promise((resolve, reject) => {
    db.query(sql, [ventana_id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


module.exports = {
  getAllWorkers,
  getWorker,
  updateWorker,
  deleteWorker,
  createWorker,
  getAllObras,
  updateObra,
  deleteObra,
  createObra,
  getVentanasDeObra,
  updateVentana,
  deleteVentana,
  createVentana,
  createImagen,
  getAllImagenesByVentana
};