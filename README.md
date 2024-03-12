Build an account creation form that allows a user to provide a username and password to create an account. Take into consideration how to provide an informative user experience and helpful validation. We recommend you take some time to think about how a user would interact with this UI before implementing it in code.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## System Design

The web app starts with a Sign In layout (`signin_manual`) that allows the users to either Sign in or go to the Create Accont layout (`create_accont`). All layouts are using a container / presentation pattern. All pages are responsive. There is no real Database or backend server - that is simulated with `api/accout.ts`.

### Backend / DB

The `api/account.ts` holds the fake network calls and database that checks a valid email / password and can add users. There is a `GET` and a `POST` fake network call. This simulates interacting with a real service, but I wanted this to be easy enough to check the web app all the way.

### Sign In Layout

The Sign in is a simple page that displays an email and password input fields with a submit button. The email must be a valid email format. Once the user clicks the Sign In button, a fake network call is made in the container (`signin_manual/index.tsx`) to check if the email and password match an entry in the database. A status message is displayed at the top based on the results.

The page also contains a Create account button that will toggle a state change in the parent (`page.tsx`) to switch to the Create Account layout.

#### Test
Account should be found with eshirazp@gmail.com / Coolcat1

Bonus: For fun, I had the Wealthfront logo switch by clicking the `here` button. This is using Context / Provider - an over-engineered concept, but wanted to do a little extra for the interview.

### CreateAccount Layout

The Create Account layout contains all the fields necessary to create an account. Checks are run on all fields except the Address field. First and Last Name need to have some characters, Email address must be a valid email and Password and Confirm Password must match as well as contain a number and a letter. Users can check if the password matches all credentials in the helpful element on the right. Any error message is dispalyed in place of the Submit button with a specific message. A last check (to avoid unnecessary "network calls") is to make sure the email is unique or else a message is displayed.

If the user passes all checks, the user is redirected to the Sign in page to try again.

## Techs used

- Typescript
- NextJs (`Image`, `Link`)
- Tailwind (first time - wanted to check it out :))
- React (hooks, Content / Provider)
- Functional components
- Reusable components
