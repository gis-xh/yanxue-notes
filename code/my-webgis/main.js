import "./style.css";
import { Map, View } from "ol";
import ImageLayer from "ol/layer/Image";
import { OSM, ImageWMS } from "ol/source";
// 缩放滑动工具条
import ZoomSlider from "ol/control/ZoomSlider";
// 获取地图中心
import { getCenter } from "ol/extent";
// 绘制矢量
import Draw from "ol/interaction/Draw";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
// 绘制风格
import { Circle, Fill, Stroke, Style } from "ol/style";
// 选择和编辑
import { Select, Modify } from "ol/interaction";
// 地图事件: 单击和悬停
import { click, pointerMove } from "ol/events/condition";
// 气泡覆盖
import Overlay from "ol/Overlay";

//地图范围
const extent = [60, -80, 160, 80];
//获取地图中心点
const center = getCenter(extent);
//投影坐标系
const projection = "EPSG:4326";
//基于 Geoserver 的 WMS 访问基地址
const GeoWMS = "http://localhost:8080/geoserver/ne/wms";
/**
 * 组成弹出框的元素
 */
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");
/**
 * 创建一个覆盖层来锚定弹出窗口到地图上
 */
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

//地图初始化
const map = new Map({
  target: "map",
  overlays: [overlay],
  layers: [
    new ImageLayer({
      //创建 WMS 图层对象
      source: new ImageWMS({
        //WMS服务地址
        url: GeoWMS,
        //图层等参数
        params: {
          LAYERS: "ne:countries",
          TILED: true,
        },
        //服务类型
        serverType: "geoserver",
      }),
    }),
  ],
  view: new View({
    center: center,
    zoom: 2,
    projection: projection,
  }),
});
// 添加滑动条
map.addControl(new ZoomSlider());

// 创建矢量数据源对象
const vecSource = new VectorSource();
// 创建矢量图层对象
const vecLayer = new VectorLayer({
  source: vecSource,
});
map.addLayer(vecLayer);

/**
 * 绘制几何图形
 */
// 选择对象类型
const typeSelect = document.getElementById("drawType");
// 全局定义 draw
let draw;
// 绘制几何图形函数
const addDrawInteraction = () => {
  const value = typeSelect.value;
  draw = new Draw({
    source: vecSource,
    type: value,
  });
  map.addInteraction(draw);
};
// 监听下拉选择框的变化
typeSelect.onchange = () => {
  map.removeInteraction(draw);
  // 将绘制交互对象添加到地图上
  addDrawInteraction();
};

/**
 * 悬停要素高亮
 */
// 高亮要素的样式
const highlight = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0)", // 设置为全透明
  }),
  stroke: new Stroke({
    color: "rgba(255, 0, 0, 0.7)", // 设置为红色
    width: 2,
  }),
  // 添加一个image属性，用于设置点要素的图形和颜色
  image: new Circle({
    radius: 5,
    fill: new Fill({
      color: "rgba(255, 0, 0, 0.7)", // 设置为红色
    }),
    stroke: new Stroke({
      color: "rgba(255, 255, 255, 0.7)", // 设置为白色
      width: 2,
    }),
  }),
});
// 悬停时高亮要素
const highlightPointerMove = new Select({
  condition: pointerMove,
  style: highlight,
});
// 悬停要素高亮函数
const highlightFeature = () => {
  map.addInteraction(highlightPointerMove);
};

/**
 * 单击选中要素
 */
// 选中要素的样式
const selected = new Style({
  fill: new Fill({
    color: "rgba(0, 0, 0, 0.3)", // 设置为伪透明
  }),
  stroke: new Stroke({
    color: "rgba(255, 0, 0, 0.7)", // 设置为红色
    width: 2,
  }),
  // 添加一个image属性，用于设置点要素的图形和颜色
  image: new Circle({
    radius: 5,
    fill: new Fill({
      color: "rgba(255, 0, 0, 0.7)", // 设置为红色
    }),
    stroke: new Stroke({
      color: "rgba(255, 255, 255, 0.7)", // 设置为白色
      width: 2,
    }),
  }),
});
// 单击时选中要素
const selectClick = new Select({
  condition: click,
  style: selected,
});
// 单击选中要素函数
const selectFeature = () => {
  map.addInteraction(selectClick);
  // 在地图上注册一个singleclick事件的监听器
  map.on("singleclick", function (evt) {
    // 获取点击位置上的要素
    const feature = map.getFeaturesAtPixel(evt.pixel)[0];
    // 如果绘制开关打开，就关闭弹出窗口
    if (changeState.checked) {
      // 隐藏弹出窗口
      overlay.setPosition(undefined);
    } else {
      // 如果有要素被点击
      if (feature) {
        // 设置弹出窗口的位置
        overlay.setPosition(evt.coordinate);
        // 获取要素类型
        const featureType = feature.getGeometry().getType();
        // 获取要素名称
        const featureName = feature.getGeometryName();
        // 获取模板元素的内容
        const template = document.getElementById("popup-template").innerHTML;
        // 替换其中的变量
        const contentHtml = template
          .replace("{featureType}", featureType)
          .replace("{featureName}", featureName);
        // 在弹出窗口的内容元素中设置HTML内容
        content.innerHTML = contentHtml;
      } else {
        // 如果没有要素被点击，隐藏弹出窗口
        overlay.setPosition(undefined);
      }
    }
  });
  /**
   * 添加一个点击处理程序来隐藏弹出框
   * @return {boolean}
   */
  closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
  };
};

/**
 * 绘制开关
 */
// 获取开关状态
const changeState = document.getElementById("drawState");
// 绘制开关函数
const handleDraw = () => {
  if (changeState.checked) {
    // 将下拉选择框设置为可用状态
    typeSelect.disabled = false;
    // 移除其他交互，只保留绘制交互
    map.removeInteraction(highlightPointerMove);
    map.removeInteraction(selectClick);
    addDrawInteraction();
    // 隐藏弹出窗口
    overlay.setPosition(undefined);
  } else {
    // 将下拉选择框设置为不可用状态
    typeSelect.disabled = true;
    // 保留已绘图形，停止绘制交互
    map.removeInteraction(draw);
    // 添加两个交互到地图上
    highlightFeature();
    selectFeature();
  }
};
// 监听绘制开关的变化
changeState.onchange = () => {
  handleDraw();
};
