import { useEffect, useState } from "react"
import "./App.css"
import { deleteOldJoke, editOldJoke, getAllJokes, postNewJoke, putOldJoke } from "./services/jokeService.js"
import stevePic from "./assets/steve.png"

export const App = () => {

  const [userInput, setUserInput] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [toldJokesOnly, setToldJokesOnly] = useState([])
  const [untoldJokesOnly, setUntoldJokesOnly] = useState([])

  useEffect(() => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray)
      console.log("Jokes are Set!")
    })
  }, [])


  useEffect(() => {
    const toldJokes = allJokes.filter(
      (joke) => joke.told /* === true */
    )
    setToldJokesOnly(toldJokes)

    const untoldJokes = allJokes.filter(
      (joke) => joke.told === false
    )
    setUntoldJokesOnly(untoldJokes)
  }, [allJokes])


  const submitJoke = async () => {
    await postNewJoke(userInput).then(setUserInput(""))
    refreshJokes()
  }

  const refreshJokes = () => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray)
    })
  }


  return (
    <article className="app-container">
      <section className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <header></header>
          <h1>Chuckle's Checklist React App!</h1>
      </section>
          <h2>Add Joke</h2>
      <section className="joke-add-form">
        <input
          type="text"
          className="joke-input"
          placeholder="New One Liner"
          value={userInput}
          onChange={(event) => {
            setUserInput(event.target.value)
          }} />
        <button 
          className="joke-input-submit"
          onClick={submitJoke}
        >Add
        </button>
      </section>
      <section className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Untold<span className="untold-count">{untoldJokesOnly.length}</span></h2>
          {untoldJokesOnly.map(
            (joke) => {
              return (
                <ul>
                 <li className="joke-list-item"  key={joke.id}>
                    <p className="joke-list-item-text">{joke.text}</p>
                    <div>
                      <button
                      className="
                                  joke-list-action-delete
                                  joke-list-action-delete :hover
                                "
                      onClick={() => {deleteOldJoke(joke).then(() => refreshJokes())}}>
                      <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="
                                    joke-list-action-toggle
                                    joke-list-action-toggle :hover
                                  "
                      onClick={() => {putOldJoke(editOldJoke(joke)).then(() => refreshJokes())}}>
                      <i className="fa-regular fa-face-meh" />
                      </button>
                      </div>
                  </li>
                </ul>
              )
            }
          )}
        </div>
        <div className="joke-list-container">
          <h2>Told<span className="told-count">{toldJokesOnly.length}</span></h2>
          {toldJokesOnly.map(
            (joke) => {
              return (
                <ul>
                  <li className="joke-list-item">
                    <p className="joke-list-item-text">{joke.text}</p>
                    <button
                      className="
                                  joke-list-action-delete
                                  joke-list-action-delete :hover
                                  "
                      onClick={() => {deleteOldJoke(joke).then(() => refreshJokes())}}>
                    <i className="fa-solid fa-trash"></i>  
                    </button>
                    <button className="
                                        joke-list-action-toggle
                                        joke-list-action-toggle :hover
                                      "
                    onClick={() => {putOldJoke(editOldJoke(joke)).then(() => refreshJokes())}}>
                    <i className="fa-regular fa-face-meh" />
                    </button>
                  </li>
                </ul>
              )
            }
          )}
        </div>
      </section>
    </article>
  )
}