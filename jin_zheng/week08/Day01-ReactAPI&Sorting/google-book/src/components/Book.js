import React, {Component} from "react";
import axios from 'axios';

const Gallery = (props) => {
    const books = props.books
    // console.log(books);
    const bookshow = books.map((book, index) => {
console.log(book);
        const img = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : './image.png';
        let title = book.volumeInfo.title;
        if (title.length > 30) title = title.slice(0, 30) + "..."
        const link = book.volumeInfo.infoLink
        const des = book.volumeInfo.description;
        return(

            <div key = {index} style = {{'textAlign': 'center', 'width':'13%', 'display': 'flex', 'flexWrap':'wrap', 'justifyContent': 'space-between', 'border': '1px solid lightgray', 'boxShadow':'0 0 2px lightgray', 'margin':'2vh auto', 'padding':'3px'}}>
                <a href= {link} target= "_blank">
                <h5 style = {{'height':'50px' }} key = {index}> {index+1}: {title} </h5>
                <img src={img} alt={title} key = {img} style = {{'width': '95%', 'maxHeight':'35vh' }}/>
                </a>
            </div>
        )
    })


    return(
        <div>
        <h1 style = {{'textAlign': 'center', backgroundColor: '#1973e8', color: 'white'}}> Booklists </h1>
        <div  style={{'display': 'flex', 'flexWrap':'wrap', 'justifyContent': 'space-between', 'border': '1px solid lightgray', 'boxShadow':'0 0 2px lightgray'}}>
        {bookshow}
        </div>
        </div>
    )
}


class SearchBook extends Component {
    constructor(){
        super();
        this.state={
            query: "",
            _handleInput: this._handleInput.bind(this),
            _handleChange: this._handleChange.bind(this)
        }
    }

    _handleInput = (event) => {
        event.preventDefault();
        this.setState({
            query: event.target.value
        })
    }

    _handleChange = (event) => {
    event.preventDefault();
    this.props.onChange(this.state.query);
    }

    render(){
        return(
        <form>
        <input type="search" placeholder="Seach a book" required autoFocus ={true} onInput={this._handleInput} onChange={this._handleChange} style= {{textAlign: 'center', fontSize: '30px', minHeight: '60px', margin: 0}}/>
        </form>
    )
    }
}

class Book extends Component {
    constructor(){
        super();
        this.state={
            books:[],
        };
        this.fetchBook= this.fetchBook.bind(this)
    }


    fetchBook(query){
        const url = `https://www.googleapis.com/books/v1/volumes?q=title:${query}`
        axios.get(url, { params: {maxResults: 40, filter: 'ebooks', printTpye: 'books', orderBy:'relevance'}}).then(result => {
            const books = result.data.items;
            this.setState({
                books: books,
            })
        })
    }

    render(){
        return(
            <>
                <SearchBook onChange={this.fetchBook} />
                <Gallery books = {this.state.books } />
            </>
        )
    }
}



export default Book
