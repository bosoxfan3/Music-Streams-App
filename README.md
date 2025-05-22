# Music company take-home technical challenge

Getting Started:

1. Make sure you have NodeJS and npm installed on your local machine.
2. Run `npm install`.
3. Run `npm start` from the root directory and the frontend should open at `localhost:3000`.
   To run prettier, run `npm run prettier`.

# Details

This project contains a frontend and backend, with some sample data stored in JSON in `/src/api/database.txt`.

-   The `src/web` folder contains all frontend files. The `api.ts` file contains
    client-side functions for interacting with the backend API.
-   The `src/api` folder contains all backend files. API endpoints are defined in `app.ts` and functions for fetching project data are in `util.ts`.

# Technical Decisions Explanation

I opted to try and keep the repo relatively simple, and focused more on core functionality than optimization.
Thusly, the features I focused on were:

-   Searching for songs
-   Adding/removing songs
-   Showing song data on the chart
-   Hiding song data from chart without removing song from list
-   Changing the time period

I kept all of the main state and functions within the compareTracks.tsx file for simplicity, but I realize there are potentially more optimal ways to organize those states and functions.
I saw that the track cards within the search display and the selected tracks display were very similar, but decided to keep them as separate components. This decision was partly because I have never worked with tailwind before (at Action Network we used emotion/styled components) and didn't want to get bogged down with conditional styling.
I had also never used highCharts before, so I focused mostly on making sure that it looked as close to the screenshots provided as I could. If I had more time I would probably try and optimize the x/y axes to better compare tracks.

# Assumptions Made

-   I assumed that you would not want to have more than 5 tracks in the graph (since there were only 5 songs in the data, and highCharts only seems to have 10 colors anyway)
-   I assumed that you would want every single track to be a "Suggested Track" if they had not typed anything in the search bar
-   That the app would be viewed on a large screen for this demo. I did not do anything around responsiveness/stacking the songs/graph on a smaller screen

# Future Improvements

-   The main future improvements I'd want to focus on would just be adding the additional "As of Today"/"From Track Release" tab nav, and the "Spotify Popularity"/"Spotify Streams" dropdown. Because I knew I wasn't going to be providing those, I harcoded the text in the header and footer, and ignored that the X-axis labels changed when it was "As of Today".
-   I'd probably want to improve the "Suggested Tracks" to have it present the most popular songs first, and also sort by popularity when searching
-   I'd want to figure out how to make the graph disappear when no songs are selected. As of now the x and y axes just sit there.
-   I'd want to figure out how to sort the tooltip so that it always reads top to bottom

Other stuff that could be improved:

-   lazy loading images if the list was longer and required scrolling
-   optimizing images with webp and srcsets since there are lots of images
-   using more a11y friendly jsx
-   responsive design
