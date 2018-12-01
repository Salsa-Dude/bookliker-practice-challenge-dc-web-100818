
document.addEventListener('DOMContentLoaded', () => {
  fetchAllBooks();
});

class Book {
  constructor(id, title, description, img_url, users) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.img_url = img_url;
    this.users = users;
  }

  static user1() {
    return {
      id: 1, 
      username: "JoeEazy"
    }
  }

  renderBook() {
    let li = document.createElement('li');
    li.innerText = this.title
    li.addEventListener('click', () => {
      this.showBook()
    })
    listDiv().appendChild(li);
  }
  
  showBook() {

    showPanelDiv().innerHTML = "";
    
    // create h3
    let h3 = document.createElement('h3');
    h3.innerText = `${this.title}`;
    // create img
    let img = document.createElement('img')
    img.src = `${this.img_url}`;
    // create p
    let p = document.createElement('p')
    p.innerText = `${this.description}`;
    // create ul
    let ul = document.createElement('ul');
    ul.dataset.num = this.id
    console.log(ul)
    // create li
    this.users.forEach(user => {
      let li = document.createElement('li');
      li.innerText = ` Liked: ${user.username}`;
      ul.appendChild(li);
    })

    let button = document.createElement('button');
    button.innerText = 'Like'
   
    button.addEventListener('click', () => {
      let flag = false
      let users = this.users;
      let user1 = Book.user1();
      users.find(user => {
        if(user.id === user1.id) {
          flag = true;
        } 
      })

      if(flag) {
        alert('You already liked that book')
      } else {
        this.updateLike();
      }
    })
    
    showPanelDiv().appendChild(h3);
    showPanelDiv().appendChild(img)
    showPanelDiv().appendChild(p);
    showPanelDiv().appendChild(ul)
    showPanelDiv().appendChild(button)
  
  }
  updateLike() {
    
    this.users.push(Book.user1())
  

    fetch(`http://localhost:3000/books/${this.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        users: this.users
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        let updateUl = document.querySelector(`[data-num="${this.id}"]`);
        updateUl.innerHTML = "";
        data.users.forEach(user => {
          let li = document.createElement('li');
          li.innerText = ` Liked: ${user.username}`;
          updateUl.appendChild(li);
        })
      })
    }
  }

  function fetchAllBooks() {
    fetch(`http://localhost:3000/books`)
      .then(response => response.json())
      .then(data => {
        data.forEach(book => {
          let newBook = new Book(book.id, book.title, book.description, book.img_url, book.users)
          newBook.renderBook();
        })
      })
  }

  function listDiv() {
    return document.getElementById('list');
  }

  function showPanelDiv() {
    return document.getElementById('show-panel');
  }

