# P test, data explorer  total time 4:15 approx

# Request & Add Ons :
1. Create a Explorer from A  Json of a 1000 count device list.
2. Allow free filters on any field in the data. 
3. Add sorting on all cols, event if data is outside of current sub-set of paginated data.
4. Add Pagination and active count of data-subset list, updated by filters. 
5. Provide a detail of the selected data object.
6. Display a firmware list in said detail that displays installed version in a list of available versions, indicated by label and arrow. 
7. Calculate firmware risk, based on number of versions behind
8. Display that risk in color, so user can identify at a glance.
9. Added a few charts to aggregate devices by model/manufacture and to gauge risk. 
10. Risk is calcualte in two fields - FM risk based on how far behind in version of the ttl version availble. 2nd is Pass Risk, this is assumed if the create_at and last seen is the same, then good chance that the pass is set to default. 
11. Added scatter chart to show devices added over time, the Y-axis displays the current device FW risk. 


# Application flow
1. App starts, loads initial data into application data as initial value of reducer. 
2. Filters, if not null are applied to data set. 
3. A copy collection, as a data wrapper, is called anytime there is a change in the selector modes(filter query or null )
4. Always maintains immutable collection we started with (JSON in store) 
5. No Need for redux-saga, no async calls to manage. Just react-redux. 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts NPM run can replace yarn. 

In the project directory, you can run:

### `yarn start (or npm run start)`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
