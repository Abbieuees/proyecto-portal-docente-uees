-- ===========================================================================
-- BASE DE DATOS: portal_docente_uees
-- MOTOR: PostgreSQL 14+
-- PROYECTO: Examen Primer Periodo - Programación Web (Ciclo II-2026)
-- ===========================================================================

DROP TABLE IF EXISTS calificaciones CASCADE;
DROP TABLE IF EXISTS matriculas CASCADE;
DROP TABLE IF EXISTS evaluaciones CASCADE;
DROP TABLE IF EXISTS grupos CASCADE;
DROP TABLE IF EXISTS asignaturas CASCADE;
DROP TABLE IF EXISTS estudiantes CASCADE;
DROP TABLE IF EXISTS docentes CASCADE;

CREATE TABLE docentes(
  id_docente SERIAL PRIMARY KEY,
  cif_docente VARCHAR(100) UNIQUE NOT NULL,
  nombre_docente  VARCHAR(100) NOT NULL,
  apellido_docente VARCHAR(100) NOT NULL,
  correo VARCHAR(100) UNIQUE NOT NULL,
  contrasena VARCHAR(100) NOT NULL 
);

CREATE TABLE estudiantes(
  id_estudiante SERIAL PRIMARY KEY,
  nombre_estudiante VARCHAR(100) NOT NULL,
  cif_estudiante VARCHAR(100) UNIQUE NOT NULL,
  correo_institucional VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE asignaturas(
  id_asignatura SERIAL PRIMARY KEY,
  codigo_asignatura VARCHAR(100) UNIQUE NOT NULL,
  nombre_asignatura VARCHAR(100) NOT NULL
);



CREATE TABLE grupos(
  id_grupo SERIAL PRIMARY KEY,
  id_docente INTEGER NOT NULL REFERENCES docentes ON DELETE CASCADE,
  id_asignatura INTEGER NOT NULL REFERENCES asignaturas ON DELETE CASCADE,
  horario VARCHAR(100) NOT NULL,
  ciclo VARCHAR(100) NOT NULL
);

CREATE TABLE evaluaciones(
  id_evaluacion SERIAL PRIMARY KEY,
  id_grupo INTEGER NOT NULL REFERENCES grupos ON DELETE CASCADE,
  nombre VARCHAR(100) NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'BORRADOR' CHECK (estado IN ('BORRADOR', 'PUBLICADO')),
  fecha_evaluacion DATE
);

CREATE TABLE matriculas(
  id_matricula SERIAL PRIMARY KEY,
  id_estudiante INTEGER NOT NULL REFERENCES estudiantes ON DELETE CASCADE,
  id_grupo INTEGER NOT NULL REFERENCES grupos ON DELETE CASCADE,
  fecha_matricula DATE,
  estado VARCHAR(20) NOT NULL DEFAULT 'ACTIVA' CHECK (estado IN ('ACTIVA', 'RETIRADA', 'FINALIZADA')),
  UNIQUE (id_estudiante, id_grupo)
);

CREATE TABLE calificaciones(
  id_calificacion SERIAL PRIMARY KEY,
  id_matricula INTEGER NOT NULL REFERENCES matriculas ON DELETE CASCADE,
  id_evaluacion INTEGER NOT NULL REFERENCES evaluaciones ON DELETE CASCADE,
  nota NUMERIC(4,2) CHECK (nota >= 0.00 AND nota <= 10.00),
  trasladada BOOLEAN DEFAULT FALSE,
  UNIQUE (id_matricula, id_evaluacion)
);

