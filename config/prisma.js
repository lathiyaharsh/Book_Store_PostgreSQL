const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();  

(async () => {
  try {
    await prisma.$connect();
    console.log("Database connected.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = prisma;
