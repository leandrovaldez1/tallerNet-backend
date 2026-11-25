# TallerNet - Backend

API REST para la gestión de un taller mecánico. Desarrollada con NestJS, Prisma ORM y autenticación JWT.

## Stack

- **Framework:** NestJS 12
- **ORM:** Prisma 7 con adaptador MariaDB/MySQL
- **Autenticación:** JWT (`@nestjs/jwt`)
- **Validación:** class-validator / class-transformer
- **Testing:** Vitest
- **Linting:** OxLint

## Módulos

| Módulo | Descripción |
|---|---|
| `auth` | Registro e inicio de sesión con JWT |
| `users` | Gestión de usuarios del sistema |
| `clientes` | ABM de clientes |
| `marcas` | ABM de marcas de vehículos |
| `modelos` | ABM de modelos por marca |
| `vehiculos` | ABM de vehículos asociados a clientes |
| `repuestos` | ABM de repuestos con stock y precios |
| `ordenes` | Gestión de órdenes de trabajo |

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="mysql://usuario:password@localhost:3306/tallernet"
JWT_SECRET="tu_clave_secreta"
```

## Migraciones

```bash
# Aplicar migraciones en desarrollo
npx prisma migrate dev

# Aplicar migraciones en producción
npx prisma migrate deploy
```

## Correr la aplicación

```bash
# Desarrollo con hot reload
npm run start:dev

# Producción
npm run start:prod
```

## Tests

```bash
# Unitarios
npm run test

# Con cobertura
npm run test:cov

# E2E
npm run test:e2e
```

## Colección Postman

En la raíz del proyecto se encuentra `TallerNet.postman_collection.json` con todos los endpoints listos para importar en Postman.
