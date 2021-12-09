[<img width="134" src="https://vk.com/images/apps/mini_apps/vk_mini_apps_logo.svg">](https://vk.com/services)

# Create VK Mini App [![npm][npm]][npm-url] [![deps][deps]][deps-url]

## How to use

### With NPX

```bash
npx @vkontakte/create-vk-mini-app [app-directory-name] [options]
```
[NPX](https://github.com/npm/npx) allows you to always use the **latest** version of the package without a global installation.

### With installing the package globally
Install the package globally via yarn
```bash
yarn global add @vkontakte/create-vk-mini-app
```
...or npm
```bash
npm install --global @vkontakte/create-vk-mini-app
```

and use as follows

```bash
create-vk-mini-app [app-directory-name] [options]
```

This way is less recommended because you will have to update the package yourself.\n\n
### Options\n\n
Without `--zeit` and `--surge` options \n\n
#### `--zeit`\n\n
Vercel (Zeit) deploy\n\n
Firstly, you have to create Vercel account and connect it with your GitHub profile on [vercel.com](https://vercel.com)\n\n
#### `--surge <surge-domain>`\n\n
Surge deploy\n\n
Firstly, you have to create Surge account and Surge-domain on [surge.sh](https://surge.sh)\n\n
#### `--help`\n\n
Prints the synopsis and a list of options\n\n
## How to start work with app\n\n
Go to created folder and run:  
`yarn start` or  `npm start` to start dev server with hot reload on `localhost:10888`.\n\n
`yarn run build` or `npm run build` to build production bundle, with tree-shaking, uglify and all this modern fancy stuff.\n\n
[npm]: https://img.shields.io/npm/v/@vkontakte/create-vk-mini-app.svg\n\n
[npm-url]: https://npmjs.com/package/@vkontakte/create-vk-mini-app\n\n
[deps]: https://img.shields.io/david/vkcom/create-vk-mini-app.svg\n\n
[deps-url]: https://david-dm.org/vkcom/create-vk-mini-app\n\n
