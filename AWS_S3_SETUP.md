# 🚀 Configuración de AWS S3 para Strapi

Este documento te guía paso a paso para configurar AWS S3 y resolver el problema de pérdida de assets en Heroku.

## 📋 Prerrequisitos

- Cuenta de AWS activa
- Acceso a la consola de AWS
- Proyecto Strapi desplegado en Heroku

## 🔧 Paso 1: Configurar IAM en AWS

### 1.1 Crear usuario IAM

1. Ve a **AWS Console** → **IAM** → **Users**
2. Haz clic en **Create user**
3. **Username**: `strapi-s3-user`
4. **Access type**: Selecciona "Programmatic access"
5. **Permissions**: Selecciona "Attach policies directly"
6. Busca y selecciona: `AmazonS3FullAccess`
7. **Tags**: Opcional
8. **Review** y **Create user**

### 1.2 Obtener credenciales

1. En la página del usuario creado, ve a **Security credentials**
2. Haz clic en **Create access key**
3. **Access key type**: "Application running outside AWS"
4. **Copy** tanto el `Access Key ID` como el `Secret Access Key`
5. **Guarda estas credenciales en un lugar seguro**

## 🪣 Paso 2: Crear bucket S3

### 2.1 Crear el bucket

1. Ve a **S3** → **Create bucket**
2. **Bucket name**: `inmobiliaria-zicatela-assets-YYYYMMDD` (debe ser único)
3. **Region**: Selecciona la región más cercana (ej: `us-east-1`)
4. **Block Public Access**: **DESMARCA** "Block all public access"
5. **Bucket Versioning**: Opcional pero recomendado
6. **Tags**: Agrega tags para organización
7. Haz clic en **Create bucket**

### 2.2 Configurar política del bucket

1. Ve a tu bucket → **Permissions** → **Bucket policy**
2. Agrega esta política (reemplaza `TU-BUCKET-NAME`):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::TU-BUCKET-NAME/*"
    }
  ]
}
```

## 🔑 Paso 3: Configurar variables de entorno

### 3.1 Crear archivo .env local

Copia el archivo `env.example` a `.env` y llena los valores:

```bash
# AWS S3 Configuration
AWS_ACCESS_KEY_ID=tu-access-key-id
AWS_ACCESS_SECRET_KEY=tu-secret-access-key
AWS_REGION=tu-region
AWS_S3_BUCKET=tu-bucket-name
```

### 3.2 Configurar en Heroku

```bash
heroku config:set AWS_ACCESS_KEY_ID=tu-access-key-id
heroku config:set AWS_ACCESS_SECRET_KEY=tu-secret-access-key
heroku config:set AWS_REGION=tu-region
heroku config:set AWS_S3_BUCKET=tu-bucket-name

# Verificar configuración
heroku config
```

## 📤 Paso 4: Migrar archivos existentes

### 4.1 Ejecutar script de migración

```bash
# Instalar dependencias si no están instaladas
npm install

# Ejecutar migración
npm run migrate:s3
```

### 4.2 Verificar resultados

El script creará un archivo `scripts/migration-results.json` con todos los URLs de los archivos migrados.

## 🚀 Paso 5: Hacer deploy

### 5.1 Commit y push

```bash
git add .
git commit -m "feat: implement AWS S3 for file storage"
git push heroku main
```

### 5.2 Verificar funcionamiento

1. Ve a tu admin de Strapi
2. Intenta subir una nueva imagen
3. Verifica que se guarde en S3 y no en la carpeta local

## 🔍 Verificación

### Verificar en S3

1. Ve a tu bucket en AWS S3
2. Deberías ver una carpeta `uploads/` con todos tus archivos
3. Los archivos deberían ser accesibles públicamente

### Verificar en Strapi

1. Los nuevos uploads deberían usar URLs de S3
2. Los archivos existentes deberían seguir funcionando
3. No deberías ver archivos en `public/uploads/` después del deploy

## 🛠️ Solución de problemas

### Error: "Access Denied"

- Verifica que las credenciales de AWS sean correctas
- Asegúrate de que el usuario IAM tenga permisos de S3
- Verifica que el bucket esté en la región correcta

### Error: "Bucket not found"

- Verifica el nombre del bucket en las variables de entorno
- Asegúrate de que el bucket exista en la región especificada

### Archivos no se suben

- Verifica que el plugin de upload esté configurado correctamente
- Revisa los logs de Strapi para errores específicos

## 💰 Costos estimados

- **S3 Standard**: ~$0.023 por GB/mes
- **Transferencia de datos**: ~$0.09 por GB (saliente)
- **Requests**: ~$0.0004 por 1,000 requests PUT/COPY/POST/LIST

Para un proyecto típico, los costos mensuales suelen ser menores a $5.

## 🔒 Seguridad

- **Nunca** subas las credenciales de AWS a Git
- Usa políticas IAM restrictivas en producción
- Considera usar AWS KMS para encriptar archivos sensibles
- Monitorea el uso de S3 regularmente

## 📚 Recursos adicionales

- [Documentación oficial de AWS S3](https://docs.aws.amazon.com/s3/)
- [Strapi Upload Plugin](https://docs.strapi.io/dev-docs/providers)
- [AWS IAM Best Practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

---

## 🎯 Resumen de beneficios

✅ **Assets persistentes**: Los archivos no se borran con cada deploy  
✅ **Escalabilidad**: S3 puede manejar millones de archivos  
✅ **Rendimiento**: CDN global de AWS  
✅ **Costo-efectivo**: Solo pagas por lo que usas  
✅ **Confiabilidad**: 99.99% de disponibilidad  
✅ **Seguridad**: Encriptación y políticas de acceso granulares

¡Con esta configuración, nunca más perderás tus assets en Heroku! 🎉
