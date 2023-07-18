const BASE_URL = 'http://localhost:4000/api/v1';

export function getWorkers() {
  return fetch(`${BASE_URL}/worker`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("data - api");
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// Consulta para obtener un trabajador por email
export async function getWorker(email) {
  try {
    const response = await fetch(`${BASE_URL}/worker/${email}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const workerData = await response.json();
    return workerData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function updateWorker(email, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/worker/${email}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updatedWorker = await response.json();
    return updatedWorker;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function deleteWorker(correo) {
  try {
    const response = await fetch(`${BASE_URL}/worker/${correo}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function createWorker(workerData) {
  try {
    const response = await fetch(`${BASE_URL}/worker`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workerData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const createdWorker = await response.json();
    return createdWorker;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}










export function getAllObras() {
  return fetch(`${BASE_URL}/obra`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("data - api");
      return data;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


export async function updateObra(id, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/obra/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updatedObra = await response.json();
    return updatedObra;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function deleteObra(id) {
  try {
    const response = await fetch(`${BASE_URL}/obra/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function createObra(obraData) {
  try {
    const response = await fetch(`${BASE_URL}/obra`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obraData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const createdObra = await response.json();
    return createdObra;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}





export function getVentanasDeObra(idObra) {
  return fetch(`${BASE_URL}/obra/${idObra}/ventanas`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

export async function updateVentana(id, updatedData) {
  try {
    const response = await fetch(`${BASE_URL}/ventana/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const updatedVentana = await response.json();
    return updatedVentana;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function deleteVentana(id) {
  try {
    const response = await fetch(`${BASE_URL}/ventana/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function createVentana(ventanaData) {
  try {
    const response = await fetch(`${BASE_URL}/ventana`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ventanaData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const createdVentana = await response.json();
    return createdVentana;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}



export async function createImagen(imagenData) {
  try {
    const formData = new FormData();
    formData.append('ventana_id', imagenData.ventana_id);
    formData.append('imagen_data', imagenData.imagen_data);
    
    const response = await fetch(`${BASE_URL}/imagen`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const createdImagen = await response.json();
    return createdImagen;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}




export async function getAllImagenesByVentana(ventanaId) {
  try {
    const response = await fetch(`${BASE_URL}/ventana/${ventanaId}/imagenes`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const imagenes = await response.json();
    return imagenes;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}