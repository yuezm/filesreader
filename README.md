# filesreader

## Use

    const r = require('filesreader');
**read方法**

    const result=r.read(path);
    result.on('end',(err,data)=>{
        if(!err){
            console.log(data)
        }
    })

    result.on('error',err=>{
        console.log(err);
    })

    data:
       -- allFilePath：Array,返回所有文件组成的数组
       -- allDirPath: Array,返回所有文件夹组成的数组

    result.fileFilter(path,callback);// 如果成功匹配路径，则执行callback

**readPromise方法**

    // 可以使用promise方法读取，但是就没有fileFilter方法了
    r.readPromise('../node_modules').then(res => {
      console.log(res);
    });