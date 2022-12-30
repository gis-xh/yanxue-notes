# 遥感数字图像处理与分析 练习一 

本文在线地址：[https://gis-xh.github.io/yanxue-notes/RS-DIP/practice/practice01/](https://gis-xh.github.io/yanxue-notes/RS-DIP/practice/practice01/)



## 本次任务

1. 图像求反
2. 伽马校正，校正值为 $0.4,1,1.6$
3. 将图像的大小调整 $0.5$ 倍（即，分辨率为 $400 × 400$ 的图像将减少到 $200 × 200$）
4. 将图像的大小调整为 $2$ 倍（例如，分辨率为$400 × 400$ 的图像将增加到 $800 × 800$）
5. 对比度拉伸
6. 灰度分割
7. 显示测试图像的所有比特平面层



## 1 环境配置

&emsp;&emsp;这里我们使用 `conda` 创建一个名为 `rs01` 的 `Python3.9` 的虚拟环境。激活新环境后，在其内配置项目所需的运行环境，最终启动 `jupyter notebook` 在其内进行代码操作。

> 创建虚拟环境

```sh
conda create -n rs01 python=3.9
```

> 激活虚拟环境

```sh
conda activate rs01
```

> 安装 jupyter notebook

```sh
pip install jupyter
```

> 安装 scikit-image 库

```sh
pip install scikit-image
```

> 安装 matplotlib 库

```sh
pip install matplotlib
```

注：在安装时，会自动将依赖的包一并安装完成。

> 启动 jupyter notebook

```sh
jupyter notebook
```



## 2 准备

### 2.1 导入需求包

```python
import numpy as np
import matplotlib.pyplot as plt
from skimage import data, transform
```

### 2.2 导入图片并展示

```python
img = data.camera()
plt.imshow(img,cmap="gray")
```



## 3 算法实现

### 3.1 Image Negatives 图像求反

#### 3.1.1 原理及其公式

&emsp;&emsp;增强嵌入在图像暗区域的白色或灰色细节，特别是当黑色区域在大小上占主导地位时。

$$
s = L - 1 - r
$$

#### 3.1.2 代码实现

> 图像求反函数

```python
def Image_Negatives():
    '''
     图像求反
     :return: 图像求反后的图像
     '''
    out = 255 - img
    outImg = plt.imshow(out, cmap="gray")
    plt.title("Image Negatives")
    return outImg
```

> 调用函数

```python
plt.subplot(121), plt.title("Original Image"), plt.imshow(img, cmap="gray")
plt.subplot(122), Image_Negatives()
```

#### 3.1.3 输入输出图像对比

<img src="../img/image-20221115223101988.png" alt="image-20221115223101988" style="zoom:80%;" />



### 3.2 Gamma correction 伽马校正

#### 3.2.1 原理及其公式

- 伽马校正可以提高暗部亮度的存储精度。

$$
s = cr^γ
$$

#### 3.2.2 代码实现

> 伽马校正函数

```python
def Gamma_Transformations(val):
    '''
     伽马校正
     :param val: 传入的伽马值
     :return: 伽马校正后的图像
     '''
    b = img
    # 初始化 gamma
    gamma = val
    # b 被转换为 float 类型
    b1 = b.astype(float)
    # 确定 b1 中的最大值
    b3 = np.max(b1)
    # b1 是归一化的
    b2 = b1/b3
    # 计算伽马校正指数
    b3 = np.log(b2 + 1) * gamma
    # 进行伽马校正
    c = np.exp(b3) * 255.0
    # c 被转换为 int 类型
    c1 = c.astype(np.uint8)
    plt.title("Gamma value = " + str(value))
    outImg = plt.imshow(c1, cmap="gray")
    return outImg
```

> 调用函数

```python
plt.figure(figsize=(10,8))
plt.subplot(221), plt.title("Original Image"), plt.imshow(img, cmap="gray")
plt.subplot(222), Gamma_Transformations(0.4)
plt.subplot(223), Gamma_Transformations(1)
plt.subplot(224), Gamma_Transformations(1.6)
```

#### 3.2.3 输入输出图像对比

<img src="../img/image-20221115223141738.png" alt="image-20221115223141738" style="zoom:80%;" />



### 3.3 将图像的大小调整 $0.5$ 倍 

#### 3.3.1 原理

&emsp;&emsp;先获取原图像的行列数，再使用 `resize()` 函数对图像进行处理，函数的参数设置为行列的大小调整的比值。

#### 3.3.2 代码实现

> 图像的大小调整函数

```python
def Image_Resized(val):
    '''
     图像大小调整
     :param val: 大小的调整比值
     :return: 大小调整后的图像
     '''
    imgRows,imgCols = img.shape
    out = transform.resize(img, (imgRows * val, imgCols * val))
    plt.title("Resized Image (" + str(val) + " fold)")
    outImg = plt.imshow(out, cmap="gray")
    return outImg
```

> 调用函数

```python
plt.subplot(121), plt.title("Original Image"), plt.imshow(img, cmap="gray")
plt.subplot(122), Image_Resized(0.5)
```

#### 3.3.3 输入输出图像对比

<img src="../img/image-20221115223237201.png" alt="image-20221115223237201" style="zoom:80%;" />

### 3.4 将图像的大小调整为 $2$ 倍

#### 3.4.1 原理

&emsp;&emsp;调用大小调整函数，输入参数即可实现 2 倍效果。

#### 3.4.2 代码实现

> 调用函数

```python
plt.subplot(121), plt.title("Original Image"), plt.imshow(img, cmap="gray")
plt.subplot(122), Image_Resized(2)
```

#### 3.4.3 输入输出图像对比

<img src="../img/image-20221115223315153.png" alt="image-20221115223315153" style="zoom:80%;" />

### 3.5 Contrast Stretching 对比度拉伸

#### 3.5.1 原理

&emsp;&emsp;对比度拉伸能够扩展图像的灰度等级范围，使其跨越记录介质或显示设备的理想全强度范围。

#### 3.5.2 代码实现

> 对比度拉伸函数

```python
def Contrast_Stretching():
    '''
     对比度拉伸
     :return: 对比度拉伸后的图像
     '''
    img_cp = np.copy(img) # 输入图像的副本
    
    pixels_value_mean = np.mean(img_cp) # 输入图像的平均灰度值
    
    # 对比图拉伸（注：该实现顺序不能颠倒）
    img_cp[np.where(img_cp <= pixels_value_mean)] = 0
    img_cp[np.where(img_cp > pixels_value_mean)] = 1
    
    out = img_cp
    plt.title("Contrast Stretching")
    outImg = plt.imshow(out, cmap="gray")
    
    return outImg
```

> 调用函数

```python
plt.subplot(121), plt.title("Original Image"), plt.imshow(img, cmap="gray")
plt.subplot(122), Contrast_Stretching()
```

#### 3.5.3 输入输出图像对比

<img src="../img/image-20221115223355798.png" alt="image-20221115223355798" style="zoom:80%;" />

### 3.6 Gray-Level Slicing 灰度级分层

#### 3.6.1 原理

&emsp;&emsp;灰度级分层通常用于突出感兴趣的特定灰度范围内的亮度。灰度级分层有两大基本方法。

1. 将感兴趣的灰度范围内的值显示为一个值（比如0），而其他范围的值为另外一个值（255）。
2. 将感兴趣的灰度范围内的值显示为一个值（比如0），而其他范围的值不变。

#### 3.6.2 代码实现

> 灰度分割函数

```python
def Gray_Level_Slicing(spotlight_range_min, spotlight_range_max, means):
    '''
     灰度级分层
     :param spotlight_range_min: 所突出的灰度级范围最小值
     :param spotlight_range_max: 所突出的灰度级范围最大值
     :param means: 分层方式（1，2）
     :return: 灰度级分层后的图像
     '''
    img_cp = np.copy(img) # 输入图像的副本
    
    if means == 1: # 方式一（突出指定范围内255，并且变暗非范围内0）
        img_cp = np.where((img_cp >= spotlight_range_min) & (img_cp <= spotlight_range_max), 255, 0)
    elif means == 2: # 方式二（仅突出指定范围内255）
        img_cp[np.where((img_cp >= spotlight_range_min) & (img_cp <= spotlight_range_max))] = 255
    else:
        print("please enter the number of means from 1 to 2")
        return
    
    out = img_cp
    plt.title("Gray-Level Slicing (Method" + str(means) +")")
    outImg = plt.imshow(out, cmap="gray")
    
    return outImg
```

> 导入图像并调用函数

```python
plt.figure(figsize=(16,9))
plt.subplot(131), plt.title("Original Image"), plt.imshow(img, cmap="gray")
plt.subplot(132), Gray_Level_Slicing(155,255,1)
plt.subplot(133), Gray_Level_Slicing(155,255,2)
```

#### 3.6.3 输入输出图像对比

<img src="../img/image-20221115223436552.png" alt="image-20221115223436552" style="zoom:80%;" />

### 3.7 显示测试图像的所有比特平面层

#### 3.7.1 原理

- 突出显示特定位元对整体图像外观的贡献
- 将图像分解为比特面有助于分析图像中每个比特的相对重要性，这一过程有助于确定用于量化图像的比特数的充分性
- 此外，这种类型的分解对于图像压缩也很有用

#### 3.7.2 代码实现

> 比特分层

```python
def Bit_Plane_Slicing(layer_num):
    '''
    提取比特层
    :param layer_num: 提取层
    :return: 提取到的比特层
    '''
    img_cp = np.copy(img)  # 输入图片的副本

    if layer_num == 1:
     img_cp = np.where((img_cp >= 0) & (img_cp < 2), 255, 0)
    elif layer_num == 2:
     img_cp = np.where((img_cp >= 2) & (img_cp < 4), 255, 0)
    elif layer_num == 3:
     img_cp = np.where((img_cp >= 4) & (img_cp < 8), 255, 0)
    elif layer_num == 4:
     img_cp = np.where((img_cp >= 8) & (img_cp < 16), 255, 0)
    elif layer_num == 5:
     img_cp = np.where((img_cp >= 16) & (img_cp < 32), 255, 0)
    elif layer_num == 6:
     img_cp = np.where((img_cp >= 32) & (img_cp < 64), 255, 0)
    elif layer_num == 7:
     img_cp = np.where((img_cp >= 64) & (img_cp < 128), 255, 0)
    elif layer_num == 8:
     img_cp = np.where((img_cp >= 128) & (img_cp < 256), 255, 0)
    else:
     print("please enter the number of bit layers from 1 to 8")

    out = img_cp
    plt.title("Bit-Plane Slicing Plane" + str(layer_num))
    outImg = plt.imshow(out, cmap="gray")

    return outImg
```

> 调用函数

```python
plt.figure(figsize=(16, 16))
plt.subplot(331), plt.title("Original Image"), plt.imshow(img, cmap="gray")
for i in range(1,9):
    plt.subplot(331 + i),Bit_Plane_Slicing(i)
```

#### 3.7.3 输入输出图像对比

<img src="../img/image-20221115223553595.png" alt="image-20221115223553595" style="zoom:80%;" />

