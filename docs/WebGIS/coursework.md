# 网络地理信息系统结课作业



## 要求

1、先配置好node.js环境。

2、加一个geoserver类型的服务

3、进行交互式绘制点与面

4、将刚才绘制好的形状变成要素，然后在点的位置添加该点文字标准，如“海滨公园”；在多边形内部添加气泡式的提示信息。





## 1 配置开发环境

### 1.1 创建 OpenLayers 项目

#### 1、安装配置 Node.js 环境

先到 Node.js 官网下载进行安装，然后将 Node.js 添加到系统环境变量，并修改镜像源。

- 官方下载地址：(https://nodejs.org/zh-cn/download)

#### 2、创建项目

找到合适的目录，启动 cmd 命令行，输入命令创建名为 my-webgis 的 openlayer 项目

> 创建 openlayer 项目

```sh
npm create ol-app my-webgis
```

![image-20230620195509507](./img/image-20230620195509507.png)

<center>图 1 npm 创建 openlayers 项目</center>

#### 3、启动项目

使用编辑器打开 my-webgis 目录，在创建项目时会自动生成 openlayers 所需要的一系列基础文件，如 `package.json` 文件。在编辑器中调出命令行，输入命令，启动项目。

```sh
npm start
```

- 左侧：项目目录结构
- 右侧：项目代码编辑区域
- 下方：在项目目录下启动的命令行控制台

![image-20230620200508146](./img/image-20230620200508146.png)

<center>图 2 编辑器打开项目</center>

#### 4、查看运行结果

访问项目启动后生成的链接，就可以看到项目的初始效果，如下图所示。

![image-20230620201005219](./img/image-20230620201005219.png)

<center>图 3 项目初始界面</center>

### 1.2 安装配置 Geoserver

Geoserver 是用 Java 编写的开源软件服务器，在运行前需要安装配置 Java 环境。需要注意的是，Geoserver 最后一个支持 JRE8 的版本是 `2.22.x`。从 `2.23.x` 版本开始，Geoserver 需要 Java 11 或 Java 17 环境（JRE）才能运行。

#### 1、检查本机 JRE 版本

```sh
java -version
```

查询结果如下：

![image-20230620152656402](./img/image-20230620152656402.png)

<center>图 4 检查 Java 环境</center>

由于当前本机的 JRE 版本是 JRE8，所以选择安装 Geoserver `2.22.3` 版本。

- 官方下载地址：(https://sourceforge.net/projects/geoserver/files/GeoServer/2.22.3/)
- 官方安装教程：(https://docs.geoserver.org/2.22.x/en/user/installation/win_installer.html)

![image-20230620154429003](./img/image-20230620154429003.png)

<center>图 5 安装 Geoserver（一）下载安装程序</center>

#### 2、安装 Geoserver | 读取 Java 目录

在安装时，会自动检测当前设备的 JRE 版本及其所在的位置，符合依赖条件才能进行下一步安装。

![image-20230620152341860](./img/image-20230620152341860.png)

<center>图 6 安装 Geoserver（二）读取 Java 目录</center>

#### 3、安装 Geoserver | 设置软件目录

接下来根据本机文件结构，将 GeoServer 及其数据安装到手动设置的对应目录中。

```
E:\program\GeoServer

E:\researchData\GeoServer
```

#### 4、安装 Geoserver | 正式安装

接下来设置好管理员用户名和密码以及地图服务发布的端口号，就可以正式开始安装了。

![image-20230620154022911](./img/image-20230620154022911.png)

<center>图 7 安装 Geoserver（三）完成安装设置</center>

#### 5、安装完成

启动 Geoserver 服务后，在浏览器中输入以下地址即可访问，登录后的界面如下图所示。

```
http://localhost:8080/geoserver
```

![image-20230620160119474](./img/image-20230620160119474.png)

<center>图 1-8 Geoserver 服务管理界面</center>



## 2 加载 Geoserver 服务

### 2.1 查看 Geoserver 示例数据

#### 1、启动 Geoserver

启动 Geoserver 服务，打开 `http://localhost:8080/geoserver` 链接

#### 2、查看待加载图层

登录账户后，左侧 Data → Layers → Countries 图层，这是 Geoserver 在安装时自带的数据

![image-20230620205829145](./img/image-20230620205829145.png)

<center>图 2-1 查看 Geoserver 自带数据图层</center>

#### 3、查看待加载数据信息

进入 Countries 图层设置中，可以看到其坐标系为 `EPSG:4326`，地图范围以及属性名称。

![image-20230620222008288](./img/image-20230620222008288.png)

<center>图 2-2 查看 Countries 数据信息</center>

#### 4、图层预览

并且也可以在 Geoserver 中对图层数据进行预览，左侧 Data → Layer Preview → Countries → OpenLayers，即可进行数据预览。

![image-20230620222328438](./img/image-20230620222328438.png)

<center>图 2-3 预览 Countries 数据（一）</center>

进入预览页面，点击中国区域后，预览结果如下图所示：

![image-20230620222639386](./img/image-20230620222639386.png)

<center>图 2-4 预览 Countries 数据（二）</center>

### 2.2 加载数据

#### 1、导入相关的包

打开项目目录下的 `main.js` 文件开始编辑。

```js
import ImageLayer from 'ol/layer/Image';
import { OSM, ImageWMS } from 'ol/source';
import ZoomSlider from 'ol/control/ZoomSlider';
import { getCenter } from 'ol/extent';
```

#### 2、添加相关设置

定义并设置地图范围、地图中心点、坐标系以及基于 Geoserver 的 WMS 访问基地址。

```js
const extent = [60, -80, 160, 80];
const center = getCenter(extent);
const projection = 'EPSG:4326';
const GeoWMS = 'http://localhost:8080/geoserver/ne/wms';
```

#### 3、添加 WMS 图层

接着在 `map` 中修改 `layers` 图层设置，将其改为服务类型为 geoserver 类型，并且指定 WMS 地址且图层名为 `ne:countries` 的图层。

```js
layers: [
    new ImageLayer({
      source: new ImageWMS({
        url: GeoWMS,
        params: {
          'LAYERS': 'ne:countries',
          'TILED': true
        },
        serverType: 'geoserver'
      })
    })
  ],
```

#### 4、修改 view 视图

在进行一系列配置后，也要将视图对应的配置进行修改。

```js
view: new View({
    center: center,
    zoom: 2,
    projection: projection
}),
```

#### 5、运行项目

此时可以看到已经成功将 Geoserver 服务数据加载到了地图中。

![image-20230620224539198](./img/image-20230620224539198.png)

<center>图 2-5 OpenLayers 加载 Geoserver 数据</center>



## 3 交互式绘制点与面

进行交互式绘制点与面，并将绘制好的形状变成要素

```html
<html>
<head>
  <meta charset="utf-8">
  <title>Openlayers交互式绘制点与面</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css">
  <style>
    #map {
      width: 800px;
      height: 600px;
    }
    #popup {
      background-color: white;
      border: 1px solid black;
      padding: 10px;
      position: absolute;
      min-width: 100px;
    }
    #popup-closer {
      float: right;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <div id="popup" style="display:none;">
    <span id="popup-closer">X</span>
    <div id="popup-content"></div>
  </div>
  <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/build/ol.js"></script>
  <script>
    // 监听绘制完成事件
    draw.on('drawend', function(event) {
      // 获取绘制的要素对象
      var feature = event.feature;

      // 获取要素的几何类型
      var type = feature.getGeometry().getType();

      // 根据几何类型设置不同的样式
      if (type === 'Point') {
        // 设置点要素的样式，包括圆形和文本
        feature.setStyle(new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
              color: 'red'
            }),
            stroke: new ol.style.Stroke({
              color: 'black',
              width: 2
            })
          }),
          text: new ol.style.Text({
            text: '海滨公园', // 可以改为其他文本
            font: '14px Arial',
            fill: new ol.style.Fill({
              color: 'black'
            }),
            stroke: new ol.style.Stroke({
              color: 'white',
              width: 3
            }),
            offsetX: 10,
            offsetY: -10
          })
        }));
      } else if (type === 'Polygon') {
        // 设置面要素的样式，包括填充和边框
        feature.setStyle(new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(0, 255, 0, 0.5)'
          }),
          stroke: new ol.style.Stroke({
            color: 'green',
            width: 2
          })
        }));

        // 获取面要素的中心点坐标
        var center = feature.getGeometry().getInteriorPoint().getCoordinates();

        // 创建一个气泡对象
        var popup = new ol.Overlay({
          element: document.getElementById('popup'),
          position: center,
          offset: [0, -10]
        });

        // 设置气泡的内容
        document.getElementById('popup-content').innerHTML = '这是一个多边形'; // 可以改为其他内容

        // 将气泡添加到地图上
        map.addOverlay(popup);

        // 监听气泡关闭按钮的点击事件
        document.getElementById('popup-closer').onclick = function() {
          // 移除气泡
          map.removeOverlay(popup);
          return false;
        };
      }
    });
  </script>
</body>
</html>
```







## 4 编辑绘制要素

然后在点的位置添加该点文字标准，如“海滨公园”；在多边形内部添加气泡式的提示信息。

```js
// 绘制点线面
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector'; // 修改为正确的导入语句
import VectorSource from 'ol/source/Vector'; // 修改为正确的导入语句
import Feature from 'ol/Feature';
import PT from 'ol/geom/Point';
import LS from 'ol/geom/LineString';
import PY from 'ol/geom/Polygon';

// 定义一个函数，用来实现交互式绘制点与面的功能
function drawFeature() {
  // 创建一个矢量数据源对象，用来存储绘制的要素
  var source = new VectorSource();

  // 创建一个矢量图层对象，用来显示绘制的要素，并设置样式
  var layer = new VectorLayer({
    source: source,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#ffcc33'
        })
      })
    })
  });

  // 将矢量图层添加到地图上
  map.addLayer(layer);

  // 创建一个绘制交互对象，指定绘制类型为'Point'或'Polygon'
  var draw = new Draw({
    source: source,
    type: 'Point' // 可以改为'Polygon'
  });

  // 将绘制交互对象添加到地图上
  map.addInteraction(draw);

  // 监听绘制完成事件，获取绘制的要素对象，并根据类型进行处理
  draw.on('drawend', function(event) {
    var feature = event.feature; // 获取绘制的要素对象
    var type = feature.getGeometry().getType(); // 获取要素的几何类型
    if (type === 'Point') {
      // 如果是点要素，可以在这里添加文本标注或其他操作
      console.log('绘制了一个点要素');
    } else if (type === 'Polygon') {
      // 如果是面要素，可以在这里添加气泡提示或其他操作
      console.log('绘制了一个面要素');
    }
  });
}

// 调用函数，实现交互式绘制点与面的功能
drawFeature();

```





