const xhr = new XMLHttpRequest();

let booklist;
let index = 0;

const fetchBook = () => {

    const title = document.getElementById("search").value;
    xhr.open('GET', `https://www.googleapis.com/books/v1/volumes?q=title:${title}`)
    xhr.send()
    xhr.onreadystatechange = () =>{
        if (xhr.readyState !== 4) {
            return
        }
        booklist = JSON.parse(xhr.responseText)['items']
        updateCurrentBook()
        document.getElementById("subtitle").innerHTML = "eat all " + booklist[index]["volumeInfo"]["title"]
    }
}

const updateCurrentBook = () => {
    img = document.getElementById('current-book-thumb')
    let attr = document.createAttribute("src");
    attr.value = booklist[index]["volumeInfo"]["imageLinks"]["thumbnail"];
    img.setAttributeNode(attr);
    document.getElementById('current-book-title').innerHTML = booklist[index]["volumeInfo"]["title"];
}


$(document).ready(() => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const box = 32;
    const headImg = new Image();
    headImg.src = "image/worm.jpg";
    let snakeImg = [headImg]
    let snake = [{ x : 10 * box, y : 10 * box }];

    const createBook = () => {
        const book = {
        x : Math.floor(Math.random()*19) * box,
        y : Math.floor(Math.random()*19) * box
        };
        return book
    }

    let book = createBook(box)

    let d;
    const direction = (event) => {
        let key = event.keyCode;
        if( key == 37 && d != "RIGHT"){
            d = "LEFT";
        } else if(key == 38 && d != "DOWN"){
            d = "UP";
        } else if(key == 39 && d != "LEFT"){
            d = "RIGHT";
        } else if(key == 40 && d != "UP"){
            d = "DOWN";
        }
    }

    const collision = (head, array) => {
        for(let i = 0; i < array.length; i++){
            if(head.x == array[i].x && head.y == array[i].y){
                return true;
            }
        }
        return false;
    }

    const checkBorder = (snakeX, snakeY) => {
        if(snakeX < 0) { snakeX = canvas.width-box; }
        if(snakeX > canvas.width -box) { snakeX = 0; }
        if(snakeY < 0) { snakeY= canvas.height-box; }
        if(snakeY>canvas.height-box) { snakeY= 0; }
        return [snakeX, snakeY]
    }

    const addEaten = () => {
        newDiv = document.createElement('div')
        newDiv.className = "book"
        newDiv.innerHTML = `<p class="book-title">${booklist[index]["volumeInfo"]["title"]}</p>`
        newImg = document.createElement('img')
        let attr = document.createAttribute("src");
        attr.value = booklist[index]["volumeInfo"]["imageLinks"]["thumbnail"];
        newImg.setAttributeNode(attr);
        newImg.setAttribute("id", `thumb${index}`);
        snakeImg.push(newImg)
        newDiv.appendChild(newImg);
        document.getElementById('eaten').appendChild(newDiv);
    }



    const draw =() => {
        ctx.fillStyle="black";
        ctx.fillRect(0,0,canvas.width,canvas.height);

        let bookImg = document.getElementById('current-book-thumb');
        ctx.drawImage(bookImg, book.x, book.y, box-2, box-2);

        for( let i = 0; i < snake.length ; i++){
            bookImg = snakeImg[i]
            ctx.drawImage(bookImg, snake[i].x,snake[i].y,box-2,box-2);}

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if( d == "LEFT") snakeX -= box;
            if( d == "UP") snakeY -= box;
            if( d == "RIGHT") snakeX += box;
            if( d == "DOWN") snakeY += box;

            if(snakeX == book.x && snakeY == book.y){
                addEaten();
                index === 9 ? index = 0 : index += 1;
                try
                    {updateCurrentBook();}
                catch (TypeError)
                    {index += 1; updateCurrentBook();}

                while (true) {
                    book = createBook()
                    if (!snake.includes(book)) {
                        break
                    }
                }
            } else {
                snake.pop();
            }

            let newHead = { x : checkBorder(snakeX, snakeY)[0], y : checkBorder(snakeX, snakeY)[1] }

            if(collision(newHead,snake)){
                clearInterval(game);
            }
            snake.unshift(newHead);
        }

        let game = setInterval(draw,100);
        document.addEventListener("keydown",direction);
        document.addEventListener('change', fetchBook)
    })
