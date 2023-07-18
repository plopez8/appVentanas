const Service = require("../services/Service");

const getAllWorkers = async (req, res) => {
    try {
      const workers = await Service.getAllWorkers();
      res.json(workers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  const getWorker = async (req, res) => {
    try {
      const mail = req.params.mail;
        const worker = await Service.getWorker(mail);
        res.json(worker);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateWorker = async (req, res) => {
    try {
      const { correo, nombre, password, rol } = req.body;
      await Service.updateWorker(correo, nombre, password, rol);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const deleteWorker = async (req, res) => {
    try {
      const correo = req.params.mail;
      await Service.deleteWorker(correo);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const createWorker = async (req, res) => {
    try {
      const { correo, nombre, password, rol } = req.body;
      await Service.createWorker(correo, nombre, password, rol);
      res.sendStatus(201);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };





// Obtener todas las obras
const getAllObras = async (req, res) => {
  try {
    const obras = await Service.getAllObras();
    res.json(obras);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las obras' });
  }
};

// Actualizar una obra
const updateObra = async (req, res) => {
  const { id } = req.params;
  const { header, cliente, fecha } = req.body;

  try {
    await Service.updateObra(id, header, cliente, fecha);
    res.json({ message: 'Obra actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la obra' });
  }
};

// Eliminar una obra
const deleteObra = async (req, res) => {
  const { id } = req.params;

  try {
    await Service.deleteObra(id);
    res.json({ message: 'Obra eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la obra' });
  }
};

// Crear una nueva obra
const createObra = async (req, res) => {
  const { header, cliente, fecha } = req.body;

  try {
    await Service.createObra(header, cliente, fecha);
    res.json({ message: 'Obra creada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la obra' });
  }
};


const getVentanasDeObra = async (req, res) => {
  const idObra = req.params.id;
  try {
    const ventanas = await Service.getVentanasDeObra(idObra);
    res.json(ventanas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVentana = async (req, res) => {
  const { id } = req.params;
  const { header, XValue, YValue, QuantitatValue, description } = req.body;

  try {
    await Service.updateVentana(id, header, XValue, YValue, QuantitatValue, description);
    res.json({ message: 'Ventana actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la ventana' });
  }
};

const deleteVentana = async (req, res) => {
  const { id } = req.params;
  try {
    await Service.deleteVentana(id);
    res.json({ message: 'Ventana eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la ventana' });
  }
};

const createVentana = async (req, res) => {
  const { header, XValue, YValue, QuantitatValue, description, obra_id } = req.body;

  try {
    const results = await Service.createVentana(header, XValue, YValue, QuantitatValue, description, obra_id);
    res.json({ message: 'Ventana creada correctamente', results });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la ventana' });
  }
};



const createImagen = async (req, res) => {
  const { ventana_id } = req.body;
  const imagen_data = req.file;

  try {
    await Service.createImagen(ventana_id, imagen_data);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la imagen' });
  }
};



const getAllImagenesByVentana = async (req, res) => {
  try {
    const { ventana_id } = req.params;
    const imagenes = await Service.getAllImagenesByVentana(ventana_id);
    res.json(imagenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las imágenes' });
  }
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
  createVentana,
  updateVentana,
  deleteVentana,
  createImagen,
  getAllImagenesByVentana
}