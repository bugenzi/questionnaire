# Question and answer

## Structure

While being this the first time building the angular app, I think there is a lot of room for improving the components, making them more generic and reusable. As well as implementing rxjs better. So far I have used rxjs on modal, notifications, and authentication of the user. In hindsight (future Amar) will fix the post so the values are gotten as subject observable. For now, the only way to see your newly created post is to reload the page witch isn't UX-friendly. As well as to make sub-modules as of now it is all on the main parent module.

## Folder structure

This is situated in the src folder

```
├── components              # Used for storing the shared components e.g post-card etc
├── services                # Main logic and apis stored
├── pages                   # Preatty self explanatory the views or pages in this isntance are stored in here.
├── models                  # Used for modeling data and types for classes or parameters

```

## Links

Here is the link of the [Website](https://froda.vercel.app 'Click the little sucker'). Its hosted on vercel and backend is on heroku 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.13.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
