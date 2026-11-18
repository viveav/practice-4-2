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

export async function fetchBooks(): Promise<Book[]> {

    const response = await fetch(API_URL);


    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const dtos: BookDTO[] = await response.json();

    return dtos.map(mapFromServer);
}

// Создание книги: POST-запрос одной записи
export async function saveBook(book: Book): Promise<Book> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapToServer(book)),
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    // Сервер вернул созданный объект с присвоенным id
    const dto: BookDTO = await response.json();
    return mapFromServer(dto);
}

// Удаление книги: DELETE-запрос по адресу записи
export async function deleteBook(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    // Тело ответа пустое — читать нечего
}