const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require("dotenv").config();

// Configuración de S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  },
});

const bucketName = process.env.AWS_S3_BUCKET;
const uploadsDir = path.join(__dirname, "../public/uploads");

async function uploadFileToS3(filePath, fileName) {
  try {
    const fileContent = fs.readFileSync(filePath);
    const key = `uploads/${fileName}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: fileContent,
      ACL: "public-read",
      ContentType: getContentType(fileName),
    };

    await s3Client.send(new PutObjectCommand(uploadParams));
    console.log(`✅ Subido: ${fileName}`);
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error(`❌ Error subiendo ${fileName}:`, error.message);
    return null;
  }
}

function getContentType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const mimeTypes = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

async function migrateFilesToS3() {
  try {
    console.log("🚀 Iniciando migración a S3...");
    console.log(`📁 Directorio: ${uploadsDir}`);
    console.log(`🪣 Bucket: ${bucketName}`);
    console.log("");

    if (!fs.existsSync(uploadsDir)) {
      console.error("❌ El directorio uploads no existe");
      return;
    }

    const files = fs.readdirSync(uploadsDir);
    const imageFiles = files.filter(
      (file) => !file.startsWith(".") && !file.includes("gitkeep")
    );

    console.log(`📊 Total de archivos encontrados: ${imageFiles.length}`);
    console.log("");

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    for (const fileName of imageFiles) {
      const filePath = path.join(uploadsDir, fileName);
      const url = await uploadFileToS3(filePath, fileName);

      if (url) {
        results.push({ fileName, url });
        successCount++;
      } else {
        errorCount++;
      }
    }

    console.log("");
    console.log("📈 Resumen de la migración:");
    console.log(`✅ Archivos subidos exitosamente: ${successCount}`);
    console.log(`❌ Archivos con error: ${errorCount}`);
    console.log("");

    // Guardar resultados en un archivo JSON
    const resultsFile = path.join(__dirname, "migration-results.json");
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    console.log(`💾 Resultados guardados en: ${resultsFile}`);

    if (successCount > 0) {
      console.log("");
      console.log("🎉 ¡Migración completada!");
      console.log("📝 Ahora puedes usar estos URLs en tu base de datos");
    }
  } catch (error) {
    console.error("❌ Error durante la migración:", error);
  }
}

// Ejecutar la migración
if (require.main === module) {
  migrateFilesToS3();
}

module.exports = { migrateFilesToS3 };
