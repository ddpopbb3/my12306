## Build

### Build project. 
```shell
$ cd eos-governor-ui
$ npm run prod
```

### Test Build result.

```shell
$ npm run start:prod
``` 
The command will bring up a node server which servers all static files under build foler. 
Visit [http://localhost:3334](http://localhost:3334). If it works well, you'll see the page runs up.

### Deploy. 
Put the files under build folder into your web server.