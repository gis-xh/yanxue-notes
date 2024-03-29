# 定量遥感 Quantitative Remote Sensing



定量遥感的英文缩写是 **Quantitative Remote Sensing**，或者简写为 **QRS**。定量遥感是指从地物反射或发射的电磁辐射里，来推演得到地物某些特征定量化描述的手段。定量遥感与定性遥感相比，更能提供精确、可靠、有用的信息。



## 课堂要求

相关文档：https://www.craft.do/s/eI2ZD91Lxt0tUI

密码：123456

### 1 作业

两~三次小作业

大作业：实现一个完整的 GEE 应用，按格式撰写报告，并提交代码

### 2 考核

- 第 17 周，文献分享：精读一篇外文遥感方向的文献，制作 PPT 分享

- 第 18 周，结课考试：遥感、定量遥感基础、方案设计，占 70%

### 3 考试

- 考试时间：6月26日 周一 10:00-11:50；开卷；武教A206

- 题型：名词解释（5题，20分）、单选（5题，10分）、简答（6题，30分）、论述（2题，40分）



## 第 1 课 遥感基础知识

### 1、常用遥感波段

可见光、近红外、热红外、微波

### 2、地表观测常用数据：Landsat

实际悠久，数据获取方便，目前 Landsat 9

Landsat 8 更改了传感器名称：OLI，与之前的系列在波段监测上存在差异

熟悉波段缩写

波段向后越来越清晰

红色波段可以观测地面的信号灯

大气对近红外波段几乎没有影响，地物反射率较大的地物能够更清晰地显示

真彩色 RGB，红绿蓝三波段

短波红外对水体敏感

第8通道：2，3，4全色通道，15米分辨率，方便提高多光谱数据的分辨率

热红外常用于大气观测，具有军事用途

### 3、地表观测常用数据：Sentinel-1

数据从2014年开始，合成孔径雷达卫星，时间分辨率较高

雷达卫星优点：观测不受天气云雨影响，主动遥感（主动向地表发射微波），对线型地物敏感（监测道路），对地物高度的变化敏感

微波反射：图像容易产生噪声，需要用滤波去除噪声，对水体及其敏感，可用于观测土壤含水量

### 4、大气观测常用数据：Sentinel-5p

监测一氧化碳、二氧化碳、甲烷、臭氧等一系列气体浓度

可以研究：土地利用变化对大气的影响

### 5、数据处理等级 Data Processing Levels

L0：原始数据

L1：辐射校正、几何校正后的数据，TOA 大气上层反射率产品

L2：大气校正，将灰度值 （Digital-Number）DN 值【没有物理意义】，经过大气校正后得到 SR（Surface Reflectance） 地表反射率产品

L3：

### 6、分辨率

空间分辨率：Swath Width 幅宽，宽度由传感器决定

时间分辨率：重返周期

光谱分辨率：波段数量

辐射分辨率：bits 数量

### 7、CHIRPS 全球气象数据集

气象公开数据集，降水温度

### 8、目视解译

地物波谱特征，反射和发射波谱

### 9、常用遥感指数

1. NDVI：归一化植被差值指数

- 健康的植被红波段接近于 0，NDVI 值接近于一，水体接近于0的负值
- 比值植被指数：$$RVI = \frac{NIR}{RED}$$
- 差值植被指数：$$DVI = \frac{NIR}{RED}$$
- 通过模型计算，可以推算地表发射率
- $$NDVI = \frac{(NIR - RED)}{(NIR + RED)}$$

2. NDWI：归一化水体差值指数

### 10、数据实时性

卫星收集数据后由于需要进行预处理，获取数据存在延迟

### 11、热红外遥感

黑体反射率

反演地表温度

更多地用于水体温度反演

### 12、全天候和全天时

两个常用于遥感领域的概念，它们的区别是：

- 全天候：在各种气候条件下，不受云雾、雨雪、雾霾等影响，能够对地面目标进行有效探测的能力。
- 全天时：在一天24个小时内，不受白天黑夜、光照变化等影响，能够对地面目标进行有效探测的能力。

### 13、相关概念

地表温度，Land surface temperature，LST

Brightness of objects，物体亮度反映出物体反射强度



## 第 2 课 遥感应用数据处理与分析



在处理遥感数据前，要确定波段数据存储方式

BSQ按顺序存储



### 数据预处理

遥感影像预处理的步骤是指对原始的影像数据进行一系列的处理，以消除或减少各种误差和失真，提高数据的质量和可用性。预处理的步骤可能包括以下几个方面：

- 辐射定标：将图像的数字量化值（DN）转换为辐射亮度值或者反射率或者表面温度等物理量，利用传感器提供的元数据文件或者其他参数进行计算。
- 大气校正：消除大气吸收和散射等因素对地物反射的影响，获得地物的真实反射率或者辐射率，利用FLAASH等模块进行计算，需要输入一些大气和地形的参数。
- 正射校正：消除地球曲率和地形起伏等因素对图像几何位置的影响，使图像与地理坐标系统一致，利用RPC等模型进行计算，需要输入DEM数据。
- 图像配准：将不同时间或不同传感器的图像对齐到同一个坐标系统中，使同一地物在不同图像上具有相同的位置，利用控制点或者自动配准等方法进行计算。
- 图像融合：将低分辨率的多光谱影像与高分辨率的全色波段进行融合，得到一个高分辨率多光谱影像，利用Gram-Schmidt等方法进行计算。
- 图像镶嵌：将两幅或多幅图像拼接起来形成一幅或一系列覆盖全区的较大的图像，利用色彩平滑等方法消除接缝处的色差。
- 图像裁剪：将研究区域之外的区域去除，按照行政区划边界或自然区划边界进行图像的分幅裁剪。

重采样：几何校正前后部分像素值无法一一对应

- 最邻近法
- 双线性内插
- 三次卷积内插



### 作业：

NDVI值

植被覆盖度

使用NDVI线性估算地表发射率

Landsat热红外数据（亮度温度、辐射亮度，把地表当作黑体估算温度）

地表温度（需要先估算地表发射率，再使用公式计算出地表温度）



## 第 3 课 GEE 入门



计算数据要素要少于5000，



### GEE 中 addLayer 的 classVis 参数的内容

答：根据我从网上搜索的信息¹，addLayer是一个用于在地图上显示图像或特征集合的方法，classVis是一个可选的参数，用于指定分类图层的可视化参数。这些参数包括：

- min: 用于将数据值映射到颜色条最低端的值。
- max: 用于将数据值映射到颜色条最高端的值。
- palette: 用于指定颜色条的颜色列表，可以是CSS样式的颜色字符串或十六进制代码。
- opacity: 用于指定图层的不透明度，介于0（完全透明）和1（完全不透明）之间。

例如，如果你有一个分类图像，其中包含四个类别，分别用0、1、2、3表示，你可以用以下代码来显示它：

```javascript
// 假设你有一个名为classified的分类图像
var classVis = {
  min: 0,
  max: 3,
  palette: ['red', 'green', 'blue', 'yellow'],
  opacity: 0.8
};

// 在地图上添加分类图层
Map.addLayer(classified, classVis, 'Classification');
```

这样就会在地图上显示一个分类图层，其中0类别用红色表示，1类别用绿色表示，2类别用蓝色表示，3类别用黄色表示，整个图层的不透明度为0.8。



## 第 4 课 影像辐射处理

### 1 辐射校正

辐射校正是遥感图像预处理的重要步骤，目的是：消除传感器、大气、地形和太阳高度角等因素对图像辐射值的影响，从而得到地物的真实反射率或辐射率。辐射校正包括：辐射定标和大气校正两部分。

#### 1.1 辐射定标

辐射定标是将记录的原始DN值转换为大气顶层辐射亮度或表观反射率，消除传感器本身的误差。

- 相对定标
- 绝对定标

#### 1.2 大气校正

大气校正是将辐射亮度或表观反射率转换为地表反射率或地表反射的太阳辐射亮度，消除大气散射、吸收、反射引起的误差。消除大气对电磁波的散射作用（波长较短，如可见光波段）

- 精确校正：需要同步测量当地气象数据

#### 1.3 太阳高度角与地形校正

将太阳照射阴影消除

- 简单消除处理：作比值计算

### 2 辐射增强

#### 2.1 光谱运算



#### 2.2 影像融合

1. 融合

- 同一时间不同影像源
- 同一地区不同时间不同影像源：MODIS 与 Landsat 融合

2. 关键步骤

- 配准与重采样
- 成分替换



### 3 影像分类

#### 3.1 基于像元分类

光谱特征空间与地物聚类

光谱特征空间：同类地物具有聚类效应

相似度计算：计算像元间距离

谱距离-欧式距离

非监督分类：后处理，最后需要手动合并分类结果，并且添加标签

先非监督分类，再监督分类

#### 3.2 面向对象分类

先分割（非监督分类）再分类

#### 3.3 精度评价

分类混淆矩阵

分类精度评价指标



## 第 5 课 指数计算



## 第 6 课 地表温度 (LST) 反演

参考：[Gee-tutorials | Human Applications |Heat Islands (google-earth-engine.com)](https://google-earth-engine.com/Human-Applications/Heat-Islands/)

地表温度反演是指利用卫星遥感数据，通过一定的数学模型，计算出地表的温度值。

地表温度反演的方法有很多种，比如单通道法、分裂窗法、多通道温度-比辐射率分离法等。其中，单通道法是一种比较简单和常用的方法，它只需要一个热红外波段的数据，就可以估算出地表温度。

单通道法的基本原理是：卫星传感器观测到的辐射亮度值是由地表辐射、大气向上辐射和大气向下辐射三部分组成的，如果我们知道了大气的透过率和辐射亮度，就可以消除大气的影响，得到地表的辐射亮度，然后通过普朗克函数转换为地表温度。

具体的计算步骤如下：

1. 辐射定标：将遥感影像的灰度值转化为辐射亮度值，这一步可以通过ENVI软件中的Radiometric Calibration工具实现。
2. 计算地表比辐射率：这是一个重要的参数，它反映了地表对热红外辐射的发射能力。有很多方法可以计算地表比辐射率，比如NDVI阈值法、植被指数法、分类法等³。其中，NDVI阈值法是一种常用的方法，它利用归一化植被指数（NDVI）来估算植被覆盖度（PV），然后根据一个经验公式计算地表比辐射率。这一步可以通过ENVI软件中的Band Math工具实现。
3. 计算黑体辐射亮度和地表温度：这是最后一步，也是最关键的一步。黑体辐射亮度是指没有大气影响的地表辐射亮度，它可以通过单通道法的公式计算得到。然后，利用普朗克函数将黑体辐射亮度转换为地表温度。这一步也可以通过ENVI软件中的Band Math工具实现。



## 第 7 课 水生和水文应用——水平衡和干旱

参考：[Gee-tutorials | Aquatic and Hydrological Applications |Water Balance and Drought (google-earth-engine.com)](https://google-earth-engine.com/Aquatic-and-Hydrological-Applications/Water-Balance-and-Drought/)



## 第 8 课 论文研读

### 重庆市植被初级生产力时空变化及其驱动分析

NPP数据来源：MOD17A3HGF数据集，年度数据

量化气候因子对于人类社会的贡献，线性拟合

气象数据来源：中国气象科学数据共享服务网，日度数据

-  *重力卫星*GRACE，研究地下水

### 时间序列平滑

移动平均



## 第 9 课 回归分析

教学参考：GEE教程 | 回归分析

[Gee-tutorials | Advanced Image Processing |Interpreting an Image Regression (google-earth-engine.com)](https://google-earth-engine.com/Advanced-Image-Processing/Interpreting-an-Image-Regression/)

线性拟合：一元一次回归方程

回归的目的：

1. 求得自变量数据的回归方程
2. 以点数据建立回归模型应用于整个场景，以此来推演面数据



## 第 10 课 时间序列拟合

教学参考：GEE教程 | 时间序列拟合

[Gee-tutorials | Interpreting Image Series |Fitting Functions to Time Series (google-earth-engine.com)](https://google-earth-engine.com/Interpreting-Image-Series/Fitting-Functions-to-Time-Series/)



时序分析最好不要按照云量筛选，建议采用掩膜方法去云



将图表封装成函数，利用button获取坐标，传入到函数中，实现图表变化



对数据进行差分处理，将数据变得更平稳后，再进行趋势分析



线性拟合 linearFit：一元一次

线性回归 linearRegression：多元一次



## 第 11 课 分类与精度评价

教学参考：

- GEE教程 | 解释图像：分类

  [Gee-tutorials | Interpreting-Images | Interpreting-an-Image-Classification (google-earth-engine.com)](https://google-earth-engine.com/Interpreting-Images/Interpreting-an-Image-Classification/)

- GEE教程 | 解释图像：精度评估量化分类质量

  [Gee-tutorials | Interpreting Images |Accuracy Assessment Quantifying Classification Quality (google-earth-engine.com)](https://google-earth-engine.com/Interpreting-Images/Accuracy-Assessment-Quantifying-Classification-Quality/)



## 第 12 课 雷达卫星与洪水监测

教学参考：NASA ARSET：使用谷歌地球引擎进行洪水测绘的 SAR 影像

[ARSET - SAR for Disasters and Hydrological Applications | NASA Applied Sciences](https://appliedsciences.nasa.gov/join-mission/training/english/arset-sar-disasters-and-hydrological-applications)

雷达影像很少使用点样本，防止样本点正好处于噪音上，尽量使用面要素样本。


$$
L_1(a_1,\dots,a_k) =\prod_{i=1}^k p(s_i\mid a_i) = {1\over\Gamma(m)^k}\left[\prod_i{a_i\over m}\right]^{-m}\left[\prod_i s_i\right]^{m-1}\exp(-m\sum_i{s_i\over a_i}) \tag{3.3}
$$

$$
L_0(a) = \prod_{i=1}^k p(s_i\mid a) = {1\over\Gamma(m)^k} \left[{a\over m}\right]^{-mk}\left[\prod_i s_i\right]^{m-1}\exp(-{m\over a}\sum_i s_i) \tag{3.4}
$$
