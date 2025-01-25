由于npm 包发不上去
可以采用npm link collect-ui 

如果包遇到更新，还是之前的缓存

目标包
``` shell
npm cache clean --force
npm unlink collect-ui
npm link collect-ui
```

# 主要引用dist里面包，有2种方式
1. main.tsx 改成引用src/index.tsx,记得改回来生产
2. 每次改为collect-ui 的代码，记得改回来