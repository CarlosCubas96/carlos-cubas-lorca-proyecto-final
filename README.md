# Proyecto Final de Grado

#### Curso Escolar 2023-2024

#### Autor: [Carlos Cubas Lorca](https://github.com/CarlosCubas96/)

#### Tutor: [Antonio Gabriel González Casado](https://github.com/antonio-gabriel-gonzalez-casado)

#### Fecha de Inicio: 19-03-2023

#### Fecha de Finalización: 19-06-2023

## Breve descripción del proyecto

La aplicación propuesta es una plataforma de alquiler de bicicletas diseñada para facilitar a los usuarios el intercambio directo entre ellos. La aplicación permitirá a los usuarios explorar un catálogo de bicicletas disponibles para alquilar, filtrar según sus preferencias y realizar reservas de manera conveniente. 
Además, los usuarios podrán gestionar sus perfiles, realizar pagos seguros y acceder a un historial de alquileres anteriores, todo ello con una interfaz intuitiva y fácil de usar.

## Objetivo de la aplicación

El principal atractivo de la aplicación es su enfoque en el intercambio directo entre usuarios, lo que permite una experiencia de alquiler más personalizada y económica. Además, la aplicación facilita el acceso a bicicletas de calidad para aquellos que buscan una alternativa de transporte sostenible y económica.

La aplicación aborda el problema de la dificultad para acceder a bicicletas de calidad de manera rentable y conveniente. Muchas personas desean utilizar bicicletas para sus desplazamientos diarios o para paseos recreativos, pero pueden encontrar obstáculos al comprar una bicicleta nueva o alquilar una de una empresa de alquiler tradicional. Esta aplicación proporciona una solución al permitir que los usuarios alquilen bicicletas directamente entre ellos, evitando intermediarios y reduciendo los costos.

La aplicación cubrirá la necesidad de movilidad sostenible y accesible al proporcionar una plataforma donde los usuarios puedan encontrar y alquilar bicicletas fácilmente. Además, la aplicación también satisfará la necesidad de una experiencia de alquiler más personalizada y flexible al permitir que los usuarios establezcan sus propios términos y condiciones de alquiler directamente con otros usuarios.
El objetivo principal de la aplicación es proporcionar una solución conveniente y accesible para aquellos que desean alquilar bicicletas directamente a otros usuarios. La aplicación busca fomentar un estilo de vida activo y sostenible al facilitar el acceso a bicicletas de calidad y promover su uso como medio de transporte alternativo.

1. **¿Qué va a hacer la aplicación?**: La aplicación permitirá a los usuarios alquilar bicicletas directamente entre ellos. Los usuarios podrán explorar un catálogo de bicicletas disponibles para alquilar, filtrar según sus preferencias, reservar bicicletas para fechas específicas y realizar pagos seguros a través de la plataforma.

2. **¿Cuál es su atractivo principal?**: El principal atractivo de la aplicación es su enfoque en el intercambio directo entre usuarios, lo que permite una experiencia de alquiler más personalizada y económica. Además, la aplicación facilita el acceso a bicicletas de calidad para aquellos que buscan una alternativa de transporte sostenible y económica.

3. **¿Qué problema concreto va a resolver?**: La aplicación aborda el problema de la dificultad para acceder a bicicletas de calidad de manera rentable y conveniente. Muchas personas desean utilizar bicicletas para sus desplazamientos diarios o para paseos recreativos, pero pueden encontrar obstáculos al comprar una bicicleta nueva o alquilar una de una empresa de alquiler tradicional. Esta aplicación proporciona una solución al permitir que los usuarios alquilen bicicletas directamente entre ellos, evitando intermediarios y reduciendo los costos.

4. **¿Qué necesidad va a cubrir?**: La aplicación cubrirá la necesidad de movilidad sostenible y accesible al proporcionar una plataforma donde los usuarios puedan encontrar y alquilar bicicletas fácilmente. Además, la aplicación también satisfará la necesidad de una experiencia de alquiler más personalizada y flexible al permitir que los usuarios establezcan sus propios términos y condiciones de alquiler directamente con otros usuarios.

## Estructura del Proyecto

El repositorio del proyecto se organizará de la siguiente manera:

- **src-api** En este directorio se alojará el backend de la aplicación de alquiler de bicicletas. Aquí se gestionará toda la lógica relacionada con el sistema de alquiler, incluyendo la gestión de usuarios, publicaciones de bicicletas, alquileres y autenticación.

- **src-frontend**: Este directorio contendrá el frontend de la aplicación de alquiler de bicicletas. Aquí los usuarios podrán explorar las bicicletas disponibles para alquilar, realizar búsquedas, ver detalles de las bicicletas y realizar reservas.
  
- **docs**:  Este directorio contendrá toda la documentación relacionada con el proyecto de alquiler de bicicletas, incluyendo manuales de usuario, guías de instalación y cualquier otra información relevante para los desarrolladores y usuarios.

- **README.md**: Este archivo actuará como el punto central de información sobre el proyecto, proporcionando una descripción más detallada, la estructura del repositorio y enlaces a recursos adicionales.

- **CHANGELOG.md**: Este archivo se utiliza para llevar un registro de cambios y actualizaciones importantes en el proyecto.

## Herramientas Utilizadas

- [Prototipo de Figma (Prototitpo)](https://www.figma.com/design/pMZuOd8qOY0CCM65OJv1se/Bicirent_prototype?node-id=197-1045&t=xxVzMf5deck2Mo5i-1)

- [Trello (Gestión de Tareas)](https://trello.com/b/gd5xitKt/ud01-actividad-evaluable-01-metodolog%C3%ADatiendajabones)
  
- **Front-end**:: React: Utilizamos React como el framework principal para el desarrollo del frontend de la aplicación. React nos permite crear interfaces de usuario interactivas y dinámicas de manera eficiente, facilitando la creación de una experiencia de usuario fluida.

- **Back-end**:: Java Spring Boot: Java Spring Boot se utilizó para desarrollar el backend de la aplicación. Spring Boot proporciona una estructura robusta y escalable para construir aplicaciones web, permitiendo una fácil configuración y desarrollo de servicios RESTful.

- **Seguridad**: Spring Security con JWT para autenticación de usuarios: Implementamos Spring Security con JSON Web Tokens (JWT) para garantizar la seguridad de la aplicación. Spring Security nos permitió gestionar la autenticación y autorización de usuarios de manera eficiente, mientras que JWT nos proporcionó un método seguro para manejar la autenticación basada en tokens.

- **Pruebas**: Utilizamos JUnit 5 y Mockito para escribir pruebas unitarias y de integración para garantizar la calidad del código. Estas herramientas nos permitieron realizar pruebas exhaustivas y automatizadas para validar el funcionamiento de nuestros componentes y servicios.

- **Documentación Api**: Swagger se utilizó para documentar la API de la aplicación. Con Swagger, pudimos crear documentación interactiva y fácil de entender para nuestra API, lo que facilita que los desarrolladores comprendan cómo interactuar con los endpoints de la aplicación.

- **Documentación**: Javadoc se utilizó para generar documentación técnica para el código fuente de la aplicación. Con Javadoc, pudimos crear documentación detallada para clases, métodos y variables, lo que facilita la comprensión y el mantenimiento del código por parte de otros desarrolladores.

- **Logging**: Utilizamos LogBack junto con Simple Logging Facade for Java (SLF4J) para gestionar el registro de eventos y errores en la aplicación. Estas herramientas nos permitieron realizar un seguimiento efectivo de las actividades y diagnósticos del sistema durante el desarrollo y la implementación.

- **Gestión de Proyecto**: Utilizamos Git y GitHub para control de versiones y colaboración en el desarrollo del proyecto. Además, utilizamos Figma para el diseño de prototipos de la interfaz de usuario y Trello para la gestión de tareas y seguimiento del progreso del proyecto.

- **Validaciones**: Implementamos validaciones de datos en la aplicación para garantizar la integridad y consistencia de la información. Estas validaciones nos permitieron asegurar que los datos ingresados por los usuarios cumplan con ciertos criterios y requisitos establecidos.

- **Pruebas de Calidad**: Utilizamos SonarLint para realizar análisis estático del código y garantizar la calidad y mantenibilidad del mismo. SonarLint nos permitió identificar y corregir posibles problemas de código, como vulnerabilidades de seguridad, errores y malas prácticas de programación.
  
- **Herramienta de Construcción**: Maven se utilizó como herramienta de construcción para administrar las dependencias y construir el proyecto. Maven nos permitió gestionar eficientemente las bibliotecas y recursos necesarios para el desarrollo de la aplicación, así como automatizar el proceso de compilación y empaquetado.

- **Base de Datos**: Utilizamos **MySQL** como sistema de gestión de bases de datos para almacenar y gestionar la información de la aplicación. MySQL proporcionó un entorno confiable y escalable para almacenar datos estructurados, lo que facilitó la gestión y el acceso a la información de la aplicación.
  
- **Despliegue AWS o alternativas**: Para el despliegue de la aplicación, consideramos opciones como Amazon Web Services (AWS) u otras alternativas de alojamiento en la nube. Estas plataformas nos proporcionaron la infraestructura necesaria para implementar y ejecutar la aplicación de manera segura y escalable en línea.

- **Google Draw para el Sketch**: Utilizamos Google Draw para crear bocetos iniciales y esquemas de diseño de la aplicación. Esto nos permitió tener una idea visual inicial de la interfaz de usuario y cómo se organizarían los elementos.

- **Trello para la Gestión de Tareas**: Trello fue la mejor elección para la gestión de proyectos y tareas. Creamos tableros de Trello para organizar y realizar un seguimiento de las tareas del proyecto, asignar responsabilidades y asegurarnos de que todas las etapas del desarrollo se llevaran a cabo de manera eficiente.

Estas herramientas desempeñaron un papel fundamental en la planificación, diseño y desarrollo del proyecto, asegurando que el proyecto avanzara de manera efectiva y cumpliera con sus objetivos.
La adición de [changelog.md](CHANGELOG.md) en la estructura te permite llevar un registro de los cambios y actualizaciones importantes en el proyecto.

## Estructura de Directorios en Formato Árbol

```bash
Proyecto Final de Grado
├── docs
│   ├── Manuales de Usuario
│   ├── Guías de Instalación
│   └── Otros documentos
├── src-api
│   └── Backend de la aplicación de alquiler de bicicletas
└── src-frontend
    └── Frontend de la aplicación de alquiler de bicicletas
```

## Contribuciones

Si deseas contribuir al proyecto, sigue estos pasos:

1. Realiza un fork del repositorio.

2. Crea una nueva rama para tu contribución.

3. Realiza tus cambios y mejoras.

4. Envía una solicitud de extracción (pull request) para que revisemos y fusionemos tus cambios.

## Cambios Recientes

Puedes consultar el registro de cambios [aquí](CHANGELOG.md) para ver las últimas actualizaciones y mejoras en el proyecto.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.
