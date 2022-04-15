import {useState, useRef, useCallback} from 'react'
import UseBookSearch from './hooks/useBookSearch';

function App() {

  const [query,setQuery] = useState("")
  const [pageNumber,setPageNumber] =useState(1)

  const {books,error,hasMore,loading} = UseBookSearch(query,pageNumber)

  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore)
      {
        setPageNumber(prevState => prevState + 1)
      }
    })

    if(node) observer.current.observe(node)

  },[loading, hasMore])

  const handlerSearch = event => {
    setQuery(event.target.value)
    setPageNumber(1)
  }



  return (
    <div >
      <input type="text" 
             placeholder="Type the title..."
             value={query}
             onChange={handlerSearch} />

       {
         books.map((book, index) =>{
           if(books.length === index + 1)
           {
            return <div ref={lastBookElementRef} key={book} >{book}</div>
           } else {
            return <div key={book} >{book}</div>
           }
           
         })
       }
       <div>{loading && 'Loading...'}</div>
       <div>{error && 'Error'}</div>
    </div>
  );
}

export default App;
