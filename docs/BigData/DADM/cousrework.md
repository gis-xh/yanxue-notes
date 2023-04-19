# 利用 Geemap 进行影像分类和时序分析

## 摘要

本文介绍了利用geemap这个Python包进行影像分类和时序分析的方法和步骤。geemap是一个用于与Google Earth Engine（GEE）进行交互式地图制作的Python包，GEE是一个拥有多PB级别的卫星影像和地理空间数据集目录的云计算平台。本文利用geemap下载了哨兵影像数据，进行了影像分割，提取了感兴趣区域，然后利用geemap进行了监督分类，得到了土地覆盖分类结果，并对分类结果进行了精度评价。本文还利用geemap制作了Landsat时序动态图，展示了研究区域的土地覆盖变化情况。本文的方法和结果可以为利用geemap进行影像处理和分析提供一些参考和借鉴。

## 正文

### 1 Geemap 简介

geemap是一个用于与Google Earth Engine（GEE）进行交互式地图制作的Python包，GEE是一个拥有多PB级别的卫星影像和地理空间数据集目录的云计算平台。geemap提供了一系列的功能和工具，可以方便地在Jupyter环境中加载、分析和可视化GEE数据。geemap还支持多种绘图后端，包括folium, ipyleaflet, plotly, pydeck, kepler.gl, 和heremap。geemap还提供了一些独特的功能，例如将GEE JavaScript代码转换为Python代码，使用WhiteboxTools GUI进行地理空间分析，制作Landsat时序动画等。

### 2 数据下载

本文利用geemap下载了哨兵影像数据，注意事项如下：

1、使用 `download_ee_image()` 函数可以绕开GEE本地下载的2G限制，实现大数据量的下载。

2、下载影像时最好不要完全按照研究区域裁剪，可以改用研究区域的最小外接矩形作为影像裁剪边界，以减少数据缺失或者重采样造成的误差。

3、下载数据前最好先选择好所需波段，否则数据过大在下载完成后会自动无损压缩，导致数据质量下降。

### 3 影像分割

本文利用geemap进行了影像分割，提取了感兴趣区域。影像分割是将影像划分为若干个具有相似特征或者属性的区域或者对象的过程。影像分割可以为后续的影像分类或者目标识别提供基础。本文使用了基于阈值的方法进行影像分割，即根据某种特征或者属性设置一个阈值，将影像中满足条件的区域提取出来。

### 4 监督分类

本文利用geemap进行了监督分类，步骤如下：

#### 4.1 数据集准备

1、可以自行选取样本点，并在属性表内添加一列全为浮点型数据的类别标签。

2、也可以直接使用现有数据进行分层抽样，抽样成几何类型点群。

3、为防止训练数据集有缺陷，可以使用QGIS→先进行shp修复→再进行几何修复→导出修复后的数据集。

#### 4.2 数据集分割

1、可以添加随机数列，将数据集完全随机分为：80%的训练数据集和20%的验证数据集。

2、也可以将数据集按照各个样本类型均匀抽样(如4:1)，保证训练和验证数据集的类别比例一致。

#### 4.3 分类器使用

1、已实现：随机森林分类，cart分类。

2、待实现：朴素贝叶斯分类。

#### 4.4 分类结果显示

1、以土地覆盖分类为例。

2、可以将结果按照数据类型映射颜色数组，生成分类图。

3、可以为分类结果添加图例(图例标题，图例分类)。

#### 4.5 定量精度评价

1、分别用训练数据集和验证数据集求出误差矩阵。

2、计算混淆矩阵得到精度的定量评价。

- 整体精度计算：数字形式。
- kappa：数字形式。
- producers：数组形式，按类别顺序显示其对应精度。
- consumers：同上。

### 5 Landsat时序动态图

本文利用geemap制作了Landsat时序动态图，展示了研究区域的土地覆盖变化情况。Landsat时序动态图是一种利用Landsat卫星影像制作的动画，可以反映一定时间范围内地表的变化。geemap提供了一个简单易用的函数create_Landsat_timelapse来制作Landsat时序动态图。本文使用了Landsat 7影像，时间范围为1999年至2003年，波段组合为B4, B3, B2。本文还为动画添加了动态文字和色标，以增加信息量和美观度。

## 小结

本文介绍了利用geemap这个Python包进行影像分类和时序分析的方法和步骤。本文利用geemap下载了哨兵影像数据，进行了影像分割，提取了感兴趣区域，然后利用geemap进行了监督分类，得到了土地覆盖分类结果，并对分类结果进行了精度评价。本文还利用geemap制作了Landsat时序动态图，展示了研究区域的土地覆盖变化情况。本文的方法和结果可以为利用geemap进行影像处理和分析提供一些参考和借鉴。未来的研究可以进一步探索geemap的其他功能和工具。

## 参考文献

[1] Wu Q. geemap: A Python package for interactive mapping with Google Earth Engine. The Journal of Open Source Software. 2020;5(51):2305.

[2] Gorelick N, Hancher M, Dixon M, et al. Google Earth Engine: Planetary-scale geospatial analysis for everyone. Remote Sensing of Environment. 2017;202:18-27.

[3] Roy DP, Wulder M, et al. Landsat-8: Science and product vision for terrestrial global change research. Remote Sensing of Environment. 2014;145:154-172.

[4] Drusch M, Del Bello U, Carlier S, et al. Sentinel-2: ESA's Optical High-Resolution Mission for GMES Operational Services. Remote Sensing of Environment. 2012;120:25-36.

[5] Zhu Z, Woodcock CE. Continuous change detection and classification of land cover using all available Landsat data. Remote Sensing of Environment. 2014;144:152-171.