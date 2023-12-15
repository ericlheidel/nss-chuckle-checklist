export const getAllJokes = () => {
    return fetch("http://localhost:8088/jokes").then(joke => joke.json())
}

export const postNewJoke = (joke) => {

    const jokeObj = {
        "text": joke,
        "told": false
    }

    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jokeObj)
    }

    return fetch("http://localhost:8088/jokes", postOptions)
}

export const putOldJoke = (joke) => {
    const putOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }

    return fetch(`http://localhost:8088/jokes/${joke.id}`, putOptions)
}

export const deleteOldJoke = (joke) => {
    const deleteOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(joke)
    }

    return fetch(`http://localhost:8088/jokes/${joke.id}`, deleteOptions)
}

export const editOldJoke = (joke) => {
    if (joke.told) {
        joke.told = false
    } else {
        joke.told = true
    }
    return joke
}