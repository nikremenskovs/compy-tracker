# Compy Tracker

## Description

This front-end service focuses on displaying/scoring learner competencies as well as visualising the data. 

## Video


https://github.com/user-attachments/assets/e1378872-7a4e-445d-9cec-0a840f293a19



## How to Run Locally

Please do not hesitate to get in touch in case of any questions. No config or env variables required to run the app

To spin up the project locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/nikremenskovs/compy-tracker.git
```

2. Navigate to the project directory:

```
cd compy-tracker
```

3. Install the project dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev
```

5. To run Unit Tests:

```
npm run test:unit
```

## Future improvements/roadmap

- Improve responsiveness to cater for different devices
- More unit tests
- Toggle sort for data table
- Scroll to top button
- Minify learner info button
- Improving toast notification, e.g. queuing or stacking + style
- Transitions/Animations
- Optimise search
- End-to-end test


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to submit a pull request.

## License

_Compy Tracker_ is open-source and released under the [MIT License](LICENSE).


### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```
