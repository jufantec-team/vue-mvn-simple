# 关于 vue + maven 项目集成开发
使用 vue-cli 创建项目, 需注意在创建时 ESlint 项要选择 no, 该项为代码风格检查, 避免代码格式不规范导致开发效率降低. 个人项目推荐开启此项, 以便养成良好的代码习惯.

### 项目创建
项目中包含了前端项目代码(src目录) 与 后端项目代码(src/main目录), 使用 vue-cli 创建项目后需手动修改后端项目的项目名.

>netbean中修改项目名: IDE中打开项目后, 右键=>重命名=>修改显示名称与ArtifactID, 直接修改pom.xml有可能在IDE中不生效. 注意不要勾选重命名文件夹!

### 项目结构
编写java代码时到以往没有改变, 在netbean中打开项目后, 前端代码在 ```web页 => vue``` 目录中, 该目录是一个link, 真实目录为 /src.

### 语法高亮
netbean不能识别vue文件的语法格式, vue模板与html语法是类似的, 所以可以使用html语法来检查vue模板, 在netbean中依次点击:

>工具 => 选项 => 其他 => 文件 => [文件关联]新建 => 输入vue => 选择关联文件类型为[XHTML 文件 (text/xhtml)] => 确定

这样netbean会按照html风格为vue模板设置语法高亮, eclipse 环境设置道理是一样的, 设置方式不再陈述.

### 项目打包

* 前端项目打包: 即vue项目的打包, 运行 npm run build 即可. 打包完成后需修改html文件资源引用路径, 把文件中的 ```=/static/``` 替换为 ```=/项目名/static/``` 即可.

* 后端项目打包: 在netbean中点击"生成", 或是命令行输入 mvn build, 项目修改了 mvn 的默认打包行为, 不会在打包时引入vue目录, 而是从 dist 目录中引入打包好的前端文件.

目前还不能做到点击一次打包所有文件, 所以需要先打包前端, 再修改html页面, 最后打包后端, 这样就可以生成可直接部署的 java web 项目.

以后再进行完善.

### 项目运行
需修改两处配置文件:

* src/api/indes.js : 修改 projectName 变量值为项目名
* config/index.js : 修改两处```vue-mvn-simple``` 为 项目名, 修改代码url为开发tomcat url

分别运行 netbean->tomcat 与 npm run dev 即可.
