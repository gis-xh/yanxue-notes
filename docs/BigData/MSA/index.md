# 地学数据多元统计分析



## 参考书籍

《地球科学 大数据挖掘与机器学习》



## 课后作业

### 作业要求

1、实验写报告纸上（不要超过一张报告纸），用铅笔与直尺画图、表

2、

### 实验一 绘制箱型图

使用专业数据做箱型图



### 实验二 掷骰子【Python】

参考：[【Python 3.7】同时掷三个骰子：如果你同时掷三个 D6骰子，可能得到的最小点数为 3，而 最大点数为 18。请通过可视化展示同时掷三个 D6骰子的结果。_boyames的博客-CSDN博客](https://blog.csdn.net/boyames/article/details/91491550)

【Python 3.7】同时掷三个骰子：如果同时掷三个 D6 骰子，可能得到的最小点数为 3，而最大点数为 18。请通过可视化展示同时掷三个 D6 骰子的结果。其中 `die.py` 中的程序为：

```python
from random import randint
class Die():
    """表示一个骰子的类"""
    def __init__(self, num_sides=6):
        """骰子默认为6面"""
        self.num_sides = num_sides
    def roll(self):
        """返回一个位于1和骰子面数之间的随机值"""
        return randint(1, self.num_sides)
```

同时掷三个骰子的程序为:

```python
import pygal
from die import Die
# 创建两个D6骰子
die_1 = Die()
die_2 = Die()
die_3 = Die()
# 掷骰子多次，并将结果存储到一个列表中
results = []
for roll_num in range(50000):
    result = die_1.roll() + die_2.roll() + die_3.roll()
    results.append(result)
# 分析结果
frequencies = []
max_result = die_1.num_sides + die_2.num_sides + die_3.num_sides
for value in range(3, max_result+1):
    frequency = results.count(value)
    frequencies.append(frequency)
# 可视化结果
hist = pygal.Bar()
hist.title = "Results of rolling three D6 dice 50,000 times."
hist.x_labels = [ '3', '4', '5', '6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18']
hist.x_title = "Result"
hist.y_title = "Frequency of Result"
hist.add('D6 + D6 + D6', frequencies)
hist.render_to_file('同时掷三个骰子.svg')
```



### 实验三 趋势面分析【书】

书 P49 例题 3-4



### 实验四 因子分析【书】

书 P109 例题 5-1



### 实验五 判别分析【书】

书 P77 例题 4-4，4-6，4-7