-add validations
-handle catch for fetch error
-handle validation errors
-random space travel button functionality 
-planet show page with climate maybs music

-Models and Pages to Implement
    -Films: has_many :characters through: :film_characters
      -youtube api to embed trailer???
     
    -Starships
    -Species
    -Vehicles
    -Users ? 

MAJOR REFACTOR LONG TERM:
-Films with opening crawl from swapi
-all Star Wars info is NOT actually typed by users,
    -rather they enter search keywork (Obi wan, Corellia, Falcon, etc)
    -in the appropriate tab for the thing being created
    -then that is sent to SWAPI which is then found or created by in our backend
    -then forever saved in our db
-on edit people can add descriptions/bios of characters
-TRIVIA (cause it's the name of the app dumbasses)
  - users can full CRUD on Trivia questions