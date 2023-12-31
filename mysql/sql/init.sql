
CREATE TABLE IF NOT EXISTS trabajador (
    correo VARCHAR(20) NOT NULL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    rol VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS obra(
  id INT AUTO_INCREMENT PRIMARY KEY,
  header VARCHAR(20) NOT NULL,
  cliente VARCHAR(20) NOT NULL,
  fecha VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS ventana(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  header VARCHAR(255) NOT NULL,
  XValue VARCHAR(255) NOT NULL,
  YValue VARCHAR(255) NOT NULL,
  QuantitatValue VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  obra_id INT NOT NULL,
  FOREIGN KEY (obra_id) REFERENCES obra(id)
);

CREATE TABLE imagen (
  id INT NOT NULL AUTO_INCREMENT,
  ventana_id INT NOT NULL,
  imagen_data LONGBLOB,
  PRIMARY KEY (id),
  FOREIGN KEY (ventana_id) REFERENCES ventana (id)
);

