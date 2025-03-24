import requests
import random

BASE_URL = "https://demoqa.com/"

class User:
    def __init__(self, user_id, username, books):
        self.user_id = user_id
        self.username = username
        self.books = books

class Token:
    def __init__(self, token, expires, status, result):
        self.token = token
        self.expires = expires
        self.status = status
        self.result = result

class Book:
    def __init__(self, isbn, title, subTitle, author, publish_date, publisher, pages, description, website):
        self.isbn = isbn
        self.title = title
        self.subTitle = subTitle
        self.author = author
        self.publish_date = publish_date
        self.publisher = publisher
        self.pages = pages
        self.description = description
        self.website = website

def generate_username():
    return f"user{random.randint(100000, 999999)}"

def create_user(username, password): 
    newUser: User = None 
    data = {
        "userName": username,
        "password": password
    }
    response = requests.post(f"{BASE_URL}/Account/v1/User", json=data)
    response_data = response.json()

    if response.status_code == 201:
        newUser = User(response_data['userID'], response_data['username'], response_data['books'])
        print(">> User created!")
        return newUser
    else:
        print(f"[ERROR]: {response_data['message']}")

    return None

def generate_access_token(username, password):
    data = {
        "userName": username,
        "password": password
    }

    response = requests.post(f"{BASE_URL}/Account/v1/GenerateToken", json=data)
    response_data = response.json()

    if response.status_code == 200:
        access_token = Token(response_data['token'], response_data['expires'], response_data['status'], response_data['result'])
        print(">> Authentication successful.")
        return access_token
    else:
        print(f"[ERROR]: {response_data['message']}")

    return None

def verify_authorization(username, password):
    data = {
        "userName": username,
        "password": password
    }

    response = requests.post(f"{BASE_URL}/Account/v1/Authorized", json=data)
    response_data = response.json()

    if response.status_code == 200:
        print(">> Authorization test: Authorized.")
        return True
    else:
        print(f"[ERROR]: {response_data['message']}")

    return False

def get_available_books():
    response = requests.get(f"{BASE_URL}/BookStore/v1/Books")
    response_data = response.json()

    if response.status_code == 200:
        books_list = []

        for book_data in response_data.get("books", []):
            book = Book(
                book_data["isbn"],
                book_data["title"],
                book_data["subTitle"],
                book_data["author"],
                book_data["publish_date"],
                book_data["publisher"],
                book_data["pages"],
                book_data["description"],
                book_data["website"]
            )

            books_list.append(book)

        return books_list
    else:
        print(f"[ERROR]: {response_data['message']}")
        return None

def rent_two_random_books(user: User, token: Token, books: list[Book]):
    if len(books) < 2:
        print("[ERROR]: Not enough books available to rent.")
        return
    
    chosen_books = random.sample(books, 2)
    
    data = {
        "userId": user.user_id,
        "collectionOfIsbns": [
            {"isbn": book.isbn} for book in chosen_books
        ]
    }

    headers = {
        "Authorization": f"Bearer {token.token}",
        "Content-Type": "application/json"
    }

    response = requests.post(f"{BASE_URL}/BookStore/v1/Books", json=data, headers=headers)
    response_data = response.json()

    if response.status_code == 201:
        print(">> Books rented successfully!")
        return True
    else:
        print(f"[ERROR]: {response_data['message']}")
        return False

def get_user_by_id(user_id, token: Token):
    headers = {
        "Authorization": f"Bearer {token.token}",
        "Content-Type": "application/json"
    }

    response = requests.get(f"{BASE_URL}/Account/v1/User/{user_id}", headers=headers)
    response_data = response.json()

    if response.status_code == 200:
        user_id = response_data["userId"]
        username = response_data["username"]
        books_data = response_data.get("books", [])
        books_list = []

        for book_data in books_data:
            book = Book(
                book_data["isbn"],
                book_data["title"],
                book_data["subTitle"],
                book_data["author"],
                book_data["publish_date"],
                book_data["publisher"],
                book_data["pages"],
                book_data["description"],
                book_data["website"]
            )
            books_list.append(book)

        user = User(user_id, username, books_list)

        return user
    else:
        print(f"[ERROR]: {response_data['message']}")
        return None

def print_user(user: User):
    print(f"UserID: {user.user_id}")
    print(f"Username: {user.username}")
    
    if user.books:
        print("Books:")
        for book in user.books:
            print(f" - {book.title} (ISBN: {book.isbn})")
    else:
        print(">> User does not have any rented books.")

def main():
    password = "@Test1234"
    username = generate_username()
    
    new_user = create_user(username, password)

    if new_user is None:
        print(">> Error creating user.")
        return
    
    token = generate_access_token(username, password)

    if token is None:
        print(">> Error authenticating user, token not generated.")
        return
    
    is_authorized = verify_authorization(username, password)

    if not is_authorized:
        print(">> Authorization test: Not authorized.")
        return

    books_list = get_available_books()

    if books_list.count == 0:
        print(">> No books available.")
        return

    if not rent_two_random_books(new_user, token, books_list):
        print(">> Error renting 2 books.")
        return

    user = get_user_by_id(new_user.user_id, token)

    if user is None:
        print(">> Error retrieving user data.")
        return

    print_user(user)

if __name__ == "__main__":
    main()
