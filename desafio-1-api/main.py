import requests
import random

class User:
    def __init__(self, userId, username, books):
        self.userId = userId
        self.username = username
        self.books = books


BASE_URL = "https://demoqa.com/"

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

    if (response.status_code == 201):
        newUser = User(response_data['userID'], response_data['username'], response_data['books'])
        print(">> Usuário criado!")
        return newUser
    else:
        print(f'[ERROR]: {response_data['message']}')

    return None

def main():
    password = "@Test1234"
    username = generate_username()
    
    new_user = create_user(username, password)


if __name__ == "__main__":
    main()