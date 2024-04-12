const book = require("../models/book");
const { bookMassage } = require("../config/message");
const { bookDetails } = require("../config/config");
const { user } = require("../models/user");
const prisma = require("../config/prisma");

module.exports.create = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ message: bookMassage.error.fillDetails });

    const { id } = req.user.data;

    const {
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
      userId = id,
    } = req.body;

    if (released_year > new Date().getFullYear())
      return res.status(400).json({ message: bookMassage.error.year });

    const newBook = await prisma.book.create({
      data: {
        name,
        description,
        no_of_page,
        author,
        category,
        price,
        released_year,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    if (!newBook)
      return res.status(400).json({ message: bookMassage.error.add });

    return res.status(201).json({ message: bookMassage.success.add });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    console.log(error);
    return res.status(500).json({ message: bookMassage.error.genericError });
  }
};

module.exports.list = async (req, res) => {
  try {
    const { page, search, limit } = req.query;
    if (search && search.trim()) {
      const searchResults = await prisma.book.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      });

      return res.status(200).json({
        message: bookMassage.success.fetch,
        searchResults,
      });
    }
    const pageCount = page || bookDetails.pageCount;
    const limitDoc = parseInt(limit) || parseInt(bookDetails.limitDoc);
    const totalBooks = await book.count({ where: { status: true } });
    const maxPage =
      totalBooks <= limitDoc ? 1 : Math.ceil(totalBooks / limitDoc);

    if (pageCount > maxPage)
      return res
        .status(400)
        .json({ message: `There are only ${maxPage} page` });

    const skip = parseInt((pageCount - 1) * limitDoc);

    const bookList = await prisma.book.findMany({
      where: { status: true },
      skip,
      take: limitDoc,
    });

    return res.status(200).json({
      message: bookMassage.success.fetch,
      bookList,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: bookMassage.error.genericError });
  }
};

module.exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    const bookDetails = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    if (!bookDetails)
      return res.status(404).json({ message: bookMassage.error.notFound });

    return res.status(200).json({
      message: bookMassage.success.fetch,
      bookDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: bookMassage.error.genericError });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const bookId = parseInt(id);
    const {
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
    } = req.body;

    const editBookDetails = await prisma.book.update({
      where: { id: bookId },
      data: {
        name,
        description,
        no_of_page: Number(no_of_page),
        author,
        category,
        price: Number(price),
        released_year: Number(released_year),
      },
    });

    if (!editBookDetails)
      return res.status(400).json({
        message: bookMassage.error.update,
      });

    return res.status(200).json({
      message: bookMassage.success.update,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors });
    }
    console.log(error);
    return res.status(500).json({ message: bookMassage.error.genericError });
  }
};

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await prisma.book.delete({ where: { id: Number(id) } });
    if (!deleteBook)
      return res.status(400).json({ message: bookMassage.error.delete });

    return res.status(200).json({
      message: bookMassage.success.delete,
      deleteBook: deleteBook,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: bookMassage.error.genericError });
  }
};
