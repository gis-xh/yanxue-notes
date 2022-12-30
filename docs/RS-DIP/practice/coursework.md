# 基于 LT-GEE 的武汉市森林扰动地图制作

- 本文在线地址：[https://gis-xh.github.io/yanxue-notes/RS-DIP/practice/coursework/](https://gis-xh.github.io/yanxue-notes/RS-DIP/practice/coursework/)



## 参考

1. [吴秋生教授主页](https://wetlands.io/)
2. [GEE MAP 官方教程](https://book.geemap.org/index.html)
3. [LT-GEE 官网](https://emapr.github.io/LT-GEE/)



## 1 GEE 与 GEEMAP

### 1.1 GEE 介绍



### 1.2 GEEMAP 介绍



## 2 LT-GEE





## 3 配置开发环境

### 3.1 创建并激活虚拟环境

&emsp;&emsp;在命令行中逐行键入内容，将会创建一个名为 `rs02` 的新 conda 环境，并在其内安装需要的包。

> 创建虚拟环境

```sh
conda create -n rs02 python=3.9
```

> 激活虚拟环境

```sh
conda activate rs02
```

### 3.2 使用 mamba 配置环境

&emsp;&emsp;mamba 是一个快速、健壮、跨平台的包管理器。它运行在 Windows、macOS 和 Linux 上，完全兼容 conda 包，支持 conda 的大部分命令。可以通过 mamba 来配置安装 geemap 所依赖的复杂环境。

> conda 安装 mamba

```sh
conda install -c conda-forge mamba
```

> mamba 安装 pygis

```sh
mamba install -c conda-forge pygis geemap 
```

<img src="./img/image-20221212112405323.png" alt="image-20221212112405323" style="zoom:80%;" />

<center>图 1-1 mamba 批量安装包</center>



## 4 代码实现

### 4.1 起手配置

> 导入需求包

```python
import os
import ee
import geemap
from IPython.display import display
```

> 在 VPN 中使用 geemap

```python
geemap.set_proxy(port="7890")
```

> 初始化地图并启动

```python
Map = geemap.Map(center=[30, 113], zoom=7)
Map
```





> 

```sh
pip install oeel --upgrade
```



## 5 在 QGIS 中查看成果
