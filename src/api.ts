import {Book} from "./task1-types";

const API_URL = 'https://6afd87c52a9c141d36b8a2d0.mockapi.io/api/books';

interface BookDTO {
    id: string;
    title: string;
    author: string;
    year: number;
    rating: number;
}

function mapFromServer(dto: BookDTO): Book {
    return {
        id: dto.id,
        title: dto.title,
        authors: dto.author ? [dto.author] : [],
        year: dto.year,
        rating: dto.rating,
    };
}

function mapToServer(book: Book): BookDTO {
    return {
        id: book.id,
        title: book.title,
        author: book.authors[0] ?? '',
        year: book.year,
        rating: book.rating ?? 0,
    };
}

const DEFAULT_BOOKS: Book[] = [
    { id: '1', title: 'TypeScript Guide', authors: ['John Doe'], year: 2024 },
    { id: '2', title: 'JavaScript Basics', authors: ['Jane Smith'], year: 2022 },
];

export async function fetchBooks(): Promise<Book[]> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return DEFAULT_BOOKS;
    }

    try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            return parsed;
        }
        if (parsed && Array.isArray(parsed.books)) {
            return parsed.books;
        }
        return [];
    } catch {
        return [];
    }
}

export async function saveBooks(books: Book[]): Promise<void> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}