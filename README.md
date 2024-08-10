# Cómo Ejecutar

## Prerrequisitos

- Node.js (versión 14.x o superior)
- npm
- Git

## Clonar el Repositorio

- Clona el repositorio desde GitHub
- Cambia a la rama de desarrollo (development)

## Instalación de Dependencias

- Instala las dependencias del proyecto

## Configuración del Entorno

- Configura las variables de entorno (puedes usar las de .env.example)

## Ejecutar la Aplicación

- Inicia el servidor de desarrollo: "npm run start"
- Abre la aplicación en tu navegador: Por defecto, la aplicación estará disponible en http://localhost:3000.

**NOTA 1: para iniciar sesión use el nombre de usuario "instastoreuser" y la contraseña "instastorepassword". Siéntase libre de des comentar la info quemada en el servicio de “AuthService” para ignorar las llamadas al API**
**NOTA 2: en el servicio "OrderService" en cada metodo esta comentada la parte que retorna la info que esta quemada, esto con el fin de que corran los tests. Para retornar info solo es quitar los comentarios**

## Ejecutar Pruebas

- Para ejecutar los tests unitarios: "npm run test"

**NOTA: en el servicio "OrderService" en cada metodo debe estar comentada la parte que retorna la info que esta quemada para la correcta ejecución de las pruebas.**

# Preguntas y Respuestas del Challenge

## Preguntas

### Herramientas y Librerías

1. ¿Estás de acuerdo con que utilice Create React App para este proyecto?
2. ¿Puedo usar librerías de componentes como MUI?

### Criterios de Ordenación

3. ¿Hay algún criterio para ordenar la lista de tiendas?

### Requisitos Funcionales Adicionales

4. ¿Hay algún requisito funcional adicional que no esté especificado en el documento, pero que deba tener en cuenta?
   (por ejemplo, la vista que va antes de las tiendas más cercanas o una vista de detalle)

### Actualización de Datos

5. ¿Puedo asumir que la lista de tiendas será estática o hay planes para agregar funcionalidad de actualización en tiempo real?
   (por ejemplo, si alguna tienda cierra)

### Simulación de Errores

6. ¿Es necesario simular errores de red o datos inconsistentes para probar la aplicación?
   (por ejemplo, si falla la petición al backend o si hay error en los datos de respuesta)

### Diseño y Arquitectura

7. ¿Existen pautas específicas de diseño o arquitectura que la empresa siga y que deba considerar en mi implementación?
8. ¿Podrías dar más contexto sobre cómo debería abordar la seguridad de la aplicación en este desafío?

### Control de Versiones

9. En cuanto a las ramas, ¿hay alguna convención particular que deba seguir para los mensajes de commit o las pull requests?
10. ¿Hay algún ejemplo de archivo markdown para documentar bloqueos que pueda seguir?

### Video de Demo

11. ¿Qué aspectos específicos te gustaría que destaque en el video de la demo?

## Respuestas

1. **No hay restricción de librerías.**
2. **Considera el orden, con el parámetro logístico que para ti sea más relevante.**
3. **No hay requisitos funcionales exactos, considera que yo soy tu cliente y te doy el problema. Toda la interfaz que consideres útil para resolverlo está por tu cuenta.**
4. **Es interesante si contemplas real time, pero no es restrictivo.**
5. **Los casos de error siempre son buenos tenerlos en cuenta.**
6. **No hay pautas exactas de diseño, queremos ver las tuyas.**
7. **Me parece interesante esta pregunta, pero por ahora déjame ver cuál es la convicción que mejor te parece.**
8. **Es una demo, puedes ir sobre cualquier cosa apreciable en la interfaz.**

# Arquitectura

## Diagrama de componentes

```mermaid
graph TD;
    LoginPage --> UseLogin
    UseLogin --> AuthService
    UseLogin --> UserSessionService
    OrderList --> UseGetOrders
    OrderList --> UseAssignStore
    OrderList --> UseLogout
    UseGetOrders --> OrderService
    UseAssignStore --> OrderService
    UseLogout --> AuthService
    AuthService --> UserSessionService
    StoreSelector --> OrderList
    OrderItem --> OrderList
    StoreSelector --> UseGetStores
    UseGetStores --> OrderService
    StoreList --> StoreSelector
    StoreItem --> StoreList
    ConfirmDialog --> StoreSelector
    MapView --> StoreSelector

```

## Diagrama de secuencia

```mermaid
sequenceDiagram
    participant User
    participant LoginPage
    participant UseLogin
    participant AuthService
    participant UserSessionService
    participant OrderList
    participant UseGetOrders
    participant OrderService
    participant StoreSelector
    participant UseGetStores
    participant UseAssignStore

    User->>LoginPage: Entra a la página de login
    LoginPage->>UseLogin: Ejecuta handleLogin
    UseLogin->>AuthService: Llama a login
    AuthService-->>UseLogin: Devuelve token y userId
    UseLogin->>UserSessionService: Almacena sesión
    UseLogin-->>LoginPage: Redirige a OrderList
    LoginPage->>OrderList: Muestra órdenes
    OrderList->>UseGetOrders: Llama a UseGetOrders
    UseGetOrders->>OrderService: Obtiene órdenes
    OrderService-->>UseGetOrders: Devuelve órdenes
    UseGetOrders-->>OrderList: Muestra órdenes
    User->>OrderList: Selecciona orden
    OrderList->>StoreSelector: Abre StoreSelector
    StoreSelector->>UseGetStores: Llama a UseGetStores para obtener tiendas
    UseGetStores->>OrderService: Obtiene tiendas para la orden seleccionada
    OrderService-->>UseGetStores: Devuelve lista de tiendas
    UseGetStores-->>StoreSelector: Muestra tiendas en StoreSelector
    StoreSelector->>UseAssignStore: Selecciona tienda
    UseAssignStore->>OrderService: Asigna tienda
    OrderService-->>UseAssignStore: Confirma asignación
    UseAssignStore-->>OrderList: Refresca lista de órdenes
    User->>OrderList: Cierra sesión
    OrderList->>UseLogout: Ejecuta handleLogout
    UseLogout->>AuthService: Llama a logout
    AuthService->>UserSessionService: Limpia la sesión
    AuthService-->>UseLogout: Confirma logout
    UseLogout-->>LoginPage: Redirige a página de login

```

## Diagrama de flujo de datos

```mermaid
flowchart LR
    User -->|Inicia Sesión| LoginPage
    LoginPage -->|Invoca| UseLogin
    UseLogin -->|Consume| AuthService
    AuthService -->|Devuelve token y userId| UseLogin
    UseLogin -->|Almacena sesión| UserSessionService
    UseLogin -->|Redirige a| OrderList
    OrderList -->|Invoca| UseGetOrders
    UseGetOrders -->|Consulta| OrderService
    OrderService -->|Devuelve órdenes| UseGetOrders
    UseGetOrders -->|Muestra órdenes| OrderList
    User -->|Selecciona orden| StoreSelector
    StoreSelector -->|Invoca| UseAssignStore
    UseAssignStore -->|Asigna tienda| OrderService
    OrderService -->|Confirma asignación| UseAssignStore
    UseAssignStore -->|Actualiza órdenes| OrderList
    User -->|Cierra Sesión| LogoutButton
    LogoutButton -->|Invoca| UseLogout
    UseLogout -->|Consume| AuthService
    AuthService -->|Limpia sesión| UserSessionService
    UseLogout -->|Redirige a| LoginPage

```

# Mejoras y compromisos

## ¿Qué mejorarías de tu código? ¿por qué?

- **Incorporación de Analíticas:** Implementaría herramientas de analítica para monitorear el uso y comportamiento de los usuarios en la aplicación. Esto proporcionaría información valiosa sobre cómo los usuarios interactúan con la aplicación, ayudando a tomar decisiones informadas sobre futuras mejoras.
- **Comunicación en Realtime:** Agregaría soporte para comunicación en tiempo real en lugar de depender únicamente del polling o de actualizaciones manuales al asignar una tienda. Esto mejoraría la experiencia del usuario al proporcionar actualizaciones instantáneas.
- **Cobertura de Testing:** Aumentaría la cobertura de pruebas, especialmente pruebas de integración, para asegurar la estabilidad de los flujos entre los diferentes módulos. Esto garantizaría que las interacciones entre componentes funcionen como se espera.
- **Diccionario de Errores:** Crearía un diccionario de errores que centralice la gestión y traducción de los mensajes de error. Esto no solo mejoraría la experiencia del usuario, sino que también facilitaría el mantenimiento y la depuración.
- **Internacionalización:** Implementaría soporte para múltiples idiomas a través de un diccionario de traducciones. Esto haría que la aplicación fuera accesible a todos nuestros clientes a nivel global.
- **Monitoreo de Errores:** Integraría herramientas de monitoreo como Datadog para rastrear errores en tiempo real y detectar problemas antes de que afecten a los usuarios. Esto es crucial para mantener la calidad y confiabilidad del producto.
- **Implementación de CI/CD:** Configuraría un pipeline de CI/CD para automatizar el proceso de integración y despliegue continuo. Esto aceleraría el ciclo de desarrollo, permitiendo entregar nuevas funcionalidades y correcciones de errores de manera más rápida y segura.

## ¿Qué compromisos harías para cumplir con el tiempo? ¿Qué harías la próxima vez para entregar más y sacrificar menos?

- **Planificación y Priorización:** Reconozco que mi planificación inicial pudo haber sido optimista. En el futuro, me comprometería a hacer una evaluación más rigurosa del alcance del proyecto y a identificar claramente las necesidades del producto en su contexto. Una iteración inicial para afinar la planificación sería clave. Por ejemplo, si el proyecto es un MVP o una prueba de concepto, optaría por una arquitectura más sencilla y enfocaría mis esfuerzos en los features clave. En cambio, si se trata de un producto destinado a crecer y escalar, dedicaría más tiempo a la planificación y a la elección de una arquitectura robusta.

## ¿Crees que tu aplicación es segura? ¿por qué?

- La seguridad de la aplicación está garantizada mediante el uso de prácticas estándar como la gestión segura de tokens de autenticación y la protección de la comunicación mediante HTTPS. Sin embargo, se podría mejorar añadiendo mecanismos de validación y autenticación más estrictos, así como la implementación de medidas adicionales como la detección de intentos de acceso no autorizado, políticas de contraseñas fuertes y auditoría de accesos.

## ¿Qué harías para medir el comportamiento de tu producto en un entorno de producción?

- **Monitoreo con Amplitude:** Utilizaría herramientas como Amplitude para monitorear cómo los usuarios interactúan con la aplicación en tiempo real, permitiendo ajustar rápidamente en base a sus comportamientos.
- **Feature Flags:** Implementaría feature flags para lanzar nuevas funcionalidades a un subconjunto de usuarios y medir su impacto antes de un lanzamiento completo. Esto permite experimentar con cambios y minimizar riesgos.
- **Monitoreo de Errores:** Usaría herramientas como Sentry o Datadog para detectar y rastrear errores en producción. Esto ayudaría a identificar y resolver problemas antes de que afecten a un mayor número de usuarios.
