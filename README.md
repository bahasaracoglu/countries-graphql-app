# Countries GraphQL APP

A simple React application utilizing GraphQL and Apollo Client to fetch and display a list of countries. The user interface is styled using Tailwind CSS, and it includes features such as default selection, random color change on each click, and dynamic handling of fewer items.

## Demo

You can check the live version of this application [here](https://baha-saracaoglu-countries-graphql-app.vercel.app/)

## Installation

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Features

If you input "search:tt group:size" it will search for the results containing "tt", and group those results by the value of a "size" field that they may have
for exapmle: search:AR group:Continent
Displays a list of countries fetched through GraphQL.
Default selection: The 10th item is selected by default.
Random color change: Every click results in a different randomly generated color.
Dynamic handling of fewer items: If there are fewer than 10 items, the last one is selected.

### Screenshots
[Ekran görüntüsü 2024-02-20 231715](https://github.com/bahasaracoglu/countries-graphql-app/assets/125642265/cf63245f-c32c-4faf-a21f-afca8c214521)
![Ekran görüntüsü 2024-02-20 231748](https://github.com/bahasaracoglu/countries-graphql-app/assets/125642265/a3eddad7-b624-4ab8-85f0-e4463d560f84)
![Ekran görüntüsü 2024-02-21 004800](https://github.com/bahasaracoglu/countries-graphql-app/assets/125642265/dcb7a03a-7d5f-44d5-abfb-7c1197f650fe)

