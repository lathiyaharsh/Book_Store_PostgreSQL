// model/book.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const book = prisma.Book;

module.exports = book;
