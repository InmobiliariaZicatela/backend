const { Client } = require("pg");
require("dotenv").config();

// Configuración de la base de datos
const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  ssl:
    process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function updateDatabaseUrls() {
  try {
    console.log("🔍 Conectando a la base de datos...");
    await client.connect();
    console.log("✅ Conectado a PostgreSQL");
    console.log("");

    // Obtener todos los archivos de la base de datos
    console.log("📋 Obteniendo archivos de la base de datos...");
    const result = await client.query(`
      SELECT id, name, url, formats, provider, provider_metadata 
      FROM files 
      ORDER BY created_at DESC
    `);

    console.log(`📊 Total de archivos encontrados: ${result.rows.length}`);
    console.log("");

    let updatedCount = 0;
    let errorCount = 0;

    for (const file of result.rows) {
      try {
        console.log(`🔄 Procesando: ${file.name}`);

        // Verificar si el archivo ya tiene provider_metadata de S3
        if (file.provider === "aws-s3" && file.provider_metadata) {
          console.log(`   ✅ Ya configurado para S3`);
          continue;
        }

        // Si no tiene provider_metadata, necesitamos crearlo
        if (!file.provider_metadata) {
          console.log(`   ⚠️  No tiene provider_metadata, creando...`);

          // Crear provider_metadata basado en el nombre del archivo
          const key = `uploads/${file.name}`;
          const providerMetadata = {
            key: key,
            bucket: process.env.AWS_S3_BUCKET,
            region: process.env.AWS_REGION,
          };

          // Actualizar el archivo en la base de datos
          await client.query(
            `
            UPDATE files 
            SET 
              provider = 'aws-s3',
              provider_metadata = $1,
              url = $2
            WHERE id = $3
          `,
            [
              JSON.stringify(providerMetadata),
              `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
              file.id,
            ]
          );

          console.log(`   ✅ Actualizado para S3`);
          updatedCount++;
        }
      } catch (error) {
        console.error(`   ❌ Error procesando ${file.name}:`, error.message);
        errorCount++;
      }
    }

    console.log("");
    console.log("📈 Resumen de la actualización:");
    console.log(`✅ Archivos actualizados: ${updatedCount}`);
    console.log(`❌ Archivos con error: ${errorCount}`);
    console.log(`📊 Total procesados: ${result.rows.length}`);

    if (updatedCount > 0) {
      console.log("");
      console.log("🎉 ¡Base de datos actualizada exitosamente!");
      console.log("💡 Ahora los thumbnails deberían funcionar correctamente");
    }
  } catch (error) {
    console.error("❌ Error general:", error);
  } finally {
    await client.end();
    console.log("🔌 Conexión a la base de datos cerrada");
  }
}

// Ejecutar la actualización
updateDatabaseUrls();
