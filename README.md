## Varivas Frontend App

This repo contains the files/codes for the Varivas Varivas Frontend App. It is built with Angular Framework and follows some of the best practices of the Framwork.

### How to Run the App in Local?

1. Clone/Download the repo and then head over to the root directory.

   ```bash
   git clone https://github.com/RaunakMandal/varivas-angular-app.git

   cd angular-app
   ```

2. You will now have to download the dependencies. Simply run
   ```bash
   npm install
   ```
3. After the dependencies are installed, you will have to fill the variables in the `environment.ts` file. Please reach out to me for those.

4. Now run the app with `ng serve` and it should be accessible at `http://localhost:4200`

### Run the Deployed App
### [Netlify App Link](https://varivas-frontend.netlify.app)

### Dependencies

1. DaisyUI
2. Angular Material
3. Tailwind CSS
4. SCSS
5. RxJS
6. Husky
7. AWS S3 SDK
8. Angular Forms
9. Angular Router
10. Other core Angular Libraries

### Approach to Solve the Problem

Even though the Problem Statement was pretty straightforward and had all the features mentioned, I still took some assumptions and hence implemented them as well. There are few additions, and changes which I felt were necessary to be done in the app.

### Design Choices

#### Architecture

I have followed the Angular's Style Guide and broken the components in smaller chunks, creating smaller precise components, different services, models, etc. I have focused on writing as much structured and functional code I could and it helps a lot while debugging the app, as well as increases maintainability.

#### UI Design

I have tried to keep the UI as simple as possible and did not work much on Animations, UI Elements, etc. But, I have focused on Responsiveness and major functionalities of the app, of course covering all the required features mentioned in the problem statement.

### Usage of Specific Libraries

1. DaisyUI - This library is based on Tailwind CSS and provides best in class design elements such as buttons, forms, navbar, etc.
2. Angular Material - It is great for Icons, UI elements, which are not available in DaisyUI, or most other UI libraries.
3. RxJS - It provides us to use the Observable Architecture in Angular, and some cool features as well.
4. Husky - It helps a lot with `git` hooks such as `pre-commit`, `post-commit`, etc and I have used it to prettify the code before I do a commit.

### Additional Details

#### Possible Optimizations

I feel there were a lot of places where the solution could have been improved, both for the backend and frontend.

One major challenge was the flow of uploading a new movie, where I had to store it on Cloud. It could have been done via Backend, but I did it from Frontend because it was easier, and was implemented quicky that doing a lot of changes in the backend.

#### Potential Design Issues

I am also calling the API to fetch movies for every category, which can be improved by doing only one call and merging it to the category list.

Caching can also be done while storing information like available categories.
