# Solution for programming case study

### Technologies used
- Node.js (version 14.18.0)
- TypeScript (version 4.7.3)

### Running the application

```
npm install
```

```
npm run compile
```

```
npm run start
```

### Description

The application provides a list of most popular movies and makes individual recommendations for users based on their current session data. It reads user/movie/current session data from files. 

***List of most popular movies***

The application sorts the movies by their user review scores and logs the 3 most popular movies to the console.

***Individual movie recommendations for users***

The application checks the user's currently watched movie and makes recommendations by its keywords. The goal is to show 3 recommended movies. It first looks for matches with all keywords of the currently watched movie. If the list of similar movies is shorter than 3, it keeps looking with less keyword matches until it finds at least 3 hits. The application logs 3 recommended movies for each user to the console.
