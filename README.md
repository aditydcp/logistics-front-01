# Logistic-Front 01

This is a frontend API service for logistic data.

**Tech stack:**
* React 18
* Next.js
* MUI

## Materials:
[Material Kit (MUI)](https://mui.com/)

## Quick start

- [Download from Github](https://github.com/aditydcp/logistics-front-01/archive/main.zip)
  or clone the repo: `git clone https://github.com/aditydcp/logistics-front-01.git`

- Make sure your Node.js and npm versions are up to date for `React 18`

- Install dependencies: `npm install` or `yarn`

- Start the server: `npm run dev` or `yarn dev`

- Views are on: `localhost:3000`

## File Structure

Within the download you'll find the following directories and files:

```
logistics-front-01

┌── .eslintrc.json
├── .gitignore
├── CHANGELOG.md
├── LICENSE.md
├── next.config.js
├── package.json
├── README.md
├── public (public folder & resources)
└── src (source codes)
	├── components (custom UI components)
	├── contexts (auth context)
	├── guards (auth guard)
	├── hocs (guard interface)
	├── hooks (hooks)
	├── layouts (layouts)
	├── sections (parts/sections of a page)
	├── theme (themes, color palettes, etc.)
	├── utils (utilities script)
	└── pages (individual pages)
		├── 404.js
		├── _app.js
		├── _document.js
		├── account.js
		├── companies.js
		├── customers.js
		├── index.js
		├── products.js
		└── settings.js
		└──  auth
			├── login.js
			└── register.js
```