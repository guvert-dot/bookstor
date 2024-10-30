import request from "supertest";
import express from "express";
import { getAllBooks, addBook } from "../controllers/bookController";
import { BookRepository } from "../repositories/bookRepository";

const app = express();
app.use(express.json());
app.get("/books", getAllBooks);
app.post("/books", addBook);

// Mocking BookRepository methods
jest.mock("../repositories/bookRepository");
const mockGetAllBooks = jest.fn();
const mockAddBook = jest.fn();

(BookRepository.prototype.getAllBooks as jest.Mock) = mockGetAllBooks;
(BookRepository.prototype.addBook as jest.Mock) = mockAddBook;

describe("Book Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /books should return all books", async () => {
    mockGetAllBooks.mockResolvedValueOnce([
      { id: 1, title: "Test Book", author: "Author", price: 10 },
    ]);

    const response = await request(app).get("/books");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      { id: 1, title: "Test Book", author: "Author", price: 10 },
    ]);
    expect(mockGetAllBooks).toHaveBeenCalled();
  });

  test("POST /books should add a new book", async () => {
    const newBook = { title: "New Book", author: "New Author", price: 15 };
    mockAddBook.mockResolvedValueOnce({ id: 2, ...newBook });

    const response = await request(app).post("/books").send(newBook);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 2, ...newBook });
    expect(mockAddBook).toHaveBeenCalledWith(
      newBook.title,
      newBook.author,
      newBook.price,
    );
  });
});
